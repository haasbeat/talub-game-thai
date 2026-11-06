// Per-game patch/download counters backed by the free public Abacus service.
// xdelta games increment only after verified patch success. External Switch
// packages increment on an outbound download-link click (not installation).
// (https://abacus.jasoncameron.dev). Counts are public and best-effort:
// anyone can call the hit endpoint, and a key expires after ~168 days with
// no activity. A failed request never blocks patching; it only hides the number.
(() => {
  const API = 'https://abacus.jasoncameron.dev';
  const NAMESPACE = 'talub-game-thai';
  const CACHE_KEY = 'talub-patch-stats-v1';
  const CACHE_TTL = 10 * 60 * 1000;
  const MAX_PARALLEL = 4; // service limit is 30 requests / 10 s per IP

  const readCache = () => {
    try { return JSON.parse(sessionStorage.getItem(CACHE_KEY) || '{}'); } catch { return {}; }
  };
  const writeCache = (key, value) => {
    try {
      const cache = readCache();
      cache[key] = { value, at: Date.now() };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch { /* storage unavailable */ }
  };

  const request = async (action, key) => {
    const response = await fetch(`${API}/${action}/${NAMESPACE}/${encodeURIComponent(key)}`, { cache: 'no-store' });
    if (response.status === 404) return 0; // key is created on the first tracked action
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return Number.isFinite(data.value) ? data.value : 0;
  };

  const pending = new Map();
  const queue = [];
  let active = 0;
  const pump = () => {
    while (active < MAX_PARALLEL && queue.length) {
      const job = queue.shift();
      active += 1;
      job().finally(() => { active -= 1; pump(); });
    }
  };

  const getCounter = (key) => {
    const cached = readCache()[key];
    if (cached && Date.now() - cached.at < CACHE_TTL) return Promise.resolve(cached.value);
    if (pending.has(key)) return pending.get(key);
    const promise = new Promise((resolve) => {
      queue.push(() => request('get', key)
        .then((value) => { writeCache(key, value); resolve(value); })
        .catch(() => resolve(null))
        .finally(() => pending.delete(key)));
      pump();
    });
    pending.set(key, promise);
    return promise;
  };

  const hitCounter = (key) => request('hit', key)
    .then((value) => { writeCache(key, value); return value; })
    .catch(() => null);

  const downloadKey = (slug) => `download--${slug}`;
  const get = (slug) => getCounter(slug);
  const hit = (slug) => hitCounter(slug);
  const getDownload = (slug) => getCounter(downloadKey(slug));
  const hitDownload = (slug) => hitCounter(downloadKey(slug));

  const format = (value) => (value === null || value === undefined ? '—' : Number(value).toLocaleString('th-TH'));

  window.PatchStats = { get, hit, getDownload, hitDownload, format };
})();
