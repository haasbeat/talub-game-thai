// Per-game patch/download counters and site-wide metrics powered by Cloudflare Worker + D1 Database.
// xdelta games increment on verified patch success. External Switch packages increment on download-link click.
(() => {
  const API = 'https://talub-game-thai-cdn.talub-game-thai-cdn.workers.dev';
  const CACHE_KEY = 'talub-patch-stats-d1-v2';
  const VISIT_KEY = 'talub-visit-recorded-session';
  const CACHE_TTL = 3 * 60 * 1000; // 3 minutes cache

  let inMemoryData = null;
  let batchPromise = null;

  const readStorage = () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (Date.now() - (parsed.at || 0) < CACHE_TTL) {
        return parsed.data;
      }
    } catch {}
    return null;
  };

  const writeStorage = (data) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, at: Date.now() }));
    } catch {}
  };

  const fetchBatch = async () => {
    if (inMemoryData) return inMemoryData;
    const cached = readStorage();
    if (cached) {
      inMemoryData = cached;
      return cached;
    }
    if (batchPromise) return batchPromise;

    batchPromise = (async () => {
      try {
        const response = await fetch(`${API}/stats`, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        inMemoryData = {
          counts: json.counts || {},
          summary: json.summary || {
            total_patches: 0,
            total_downloads: 0,
            total_actions: 0,
            total_visits: 0,
            unique_visitors: 0,
          },
        };
        writeStorage(inMemoryData);
        return inMemoryData;
      } catch (err) {
        console.warn('Failed to load stats from Cloudflare D1:', err);
        return {
          counts: {},
          summary: { total_patches: 0, total_downloads: 0, total_actions: 0, total_visits: 0, unique_visitors: 0 },
        };
      } finally {
        batchPromise = null;
      }
    })();

    return batchPromise;
  };

  // Preload batch immediately on script parse
  fetchBatch();

  const getCounter = async (key) => {
    const data = await fetchBatch();
    const val = data.counts[key];
    return Number.isFinite(val) ? val : 0;
  };

  const hitCounter = async (key) => {
    try {
      const response = await fetch(`${API}/stats/${encodeURIComponent(key)}/hit`, { method: 'POST' });
      if (!response.ok) return null;
      const data = await response.json();
      if (inMemoryData && Number.isFinite(data.count)) {
        inMemoryData.counts[key] = data.count;
        if (key.startsWith('download--')) {
          inMemoryData.summary.total_downloads += 1;
        } else {
          inMemoryData.summary.total_patches += 1;
        }
        inMemoryData.summary.total_actions += 1;
        writeStorage(inMemoryData);
      }
      return data.count;
    } catch {
      return null;
    }
  };

  const recordVisit = async () => {
    try {
      if (sessionStorage.getItem(VISIT_KEY)) return; // Only count once per session
      sessionStorage.setItem(VISIT_KEY, '1');
      const response = await fetch(`${API}/stats/visit`, { method: 'POST' });
      if (response.ok) {
        const json = await response.json();
        if (inMemoryData) {
          inMemoryData.summary.total_visits = json.total_visits;
          inMemoryData.summary.unique_visitors = json.unique_visitors;
          writeStorage(inMemoryData);
        }
      }
    } catch {}
  };

  const downloadKey = (slug) => `download--${slug}`;
  const get = (slug) => getCounter(slug);
  const hit = (slug) => hitCounter(slug);
  const getDownload = (slug) => getCounter(downloadKey(slug));
  const hitDownload = (slug) => hitCounter(downloadKey(slug));
  const getSummary = async () => {
    const data = await fetchBatch();
    return data.summary;
  };
  const getAll = () => fetchBatch();

  const format = (value) => (value === null || value === undefined ? '—' : Number(value).toLocaleString('th-TH'));

  // Trigger site visit count
  if (typeof window !== 'undefined') {
    setTimeout(recordVisit, 500);
  }

  window.PatchStats = { get, hit, getDownload, hitDownload, getSummary, getAll, format, recordVisit };
})();
