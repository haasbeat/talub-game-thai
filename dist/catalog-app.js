const catalog = Array.isArray(window.GAME_CATALOG) ? window.GAME_CATALOG : [];
const cursor = document.querySelector('.cursor');

const bindHoverTargets = (root = document) => {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  root.querySelectorAll('.hover-target, a, button, select').forEach((target) => {
    if (target.dataset.cursorBound) return;
    target.dataset.cursorBound = 'true';
    target.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    target.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });
};

if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
  }, { passive: true });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal-on-scroll').forEach((element) => observer.observe(element));

const platformDefinitions = [
  { key: 'all', eyebrow: 'ALL', label: 'รวมทั้งหมด' },
  { key: '3ds', eyebrow: 'NINTENDO', label: '3DS' },
  { key: 'nds', eyebrow: 'NINTENDO', label: 'DS' },
  { key: 'ps2', eyebrow: 'SONY', label: 'PS2' },
  { key: 'snes', eyebrow: 'NINTENDO', label: 'SNES' },
  { key: 'psp', eyebrow: 'SONY', label: 'PSP' },
  { key: 'switch', eyebrow: 'NINTENDO', label: 'SWITCH' },
];

const platformLabels = {
  all: 'รวมทุกเครื่อง',
  '3ds': 'Nintendo 3DS',
  nds: 'Nintendo DS',
  ps2: 'PlayStation 2',
  snes: 'Super Nintendo',
  psp: 'PSP',
  switch: 'Nintendo Switch',
};

const platformFilter = document.querySelector('.platform-filter');
const gameGrid = document.querySelector('.game-grid');
const platformLabel = document.querySelector('#platform-label');
const platformCount = document.querySelector('#platform-count');
const platformEmpty = document.querySelector('#platform-empty');
const gameSort = document.querySelector('#game-sort');
const posterShapes = ['poster-a', 'poster-b', 'poster-c', 'poster-d', 'poster-e'];

const formatPatchDate = (isoDate) => {
  if (!isoDate) return 'ไม่ระบุวันที่';
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Bangkok',
  }).format(new Date(`${isoDate}T00:00:00+07:00`));
};

const params = new URLSearchParams(window.location.search);
const requestedPlatform = params.get('platform');
const requestedSort = params.get('sort');
const state = {
  platform: platformLabels[requestedPlatform] ? requestedPlatform : 'all',
  sort: ['default', 'newest', 'name-asc', 'name-desc'].includes(requestedSort) ? requestedSort : 'default',
  page: Math.max(1, Number.parseInt(params.get('page') || '1', 10) || 1),
  query: (params.get('q') || '').trim(),
};

// Search across English title, Thai title, original title, slug and platform.
const normalize = (text) => String(text || '').toLowerCase().normalize('NFKC').replace(/[\s:!?'’.,&\-–—()]+/g, '');
const searchIndex = new Map(catalog.map((game) => [game.slug, normalize([
  game.title, game.slug, game.platformLabel, game.details?.thaiTitle, game.details?.originalTitle, game.details?.japaneseTitle,
].join('|'))]));
const matchesQuery = (game) => !state.query || searchIndex.get(game.slug).includes(normalize(state.query));

const countForPlatform = (platform) => platform === 'all'
  ? catalog.length
  : catalog.filter((game) => game.platform === platform).length;

const createPlatformTabs = () => {
  platformFilter.replaceChildren(...platformDefinitions.map((definition) => {
    const button = document.createElement('button');
    button.className = `platform-tab hover-target${definition.key === state.platform ? ' is-active' : ''}`;
    button.type = 'button';
    button.dataset.platform = definition.key;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(definition.key === state.platform));
    button.innerHTML = '<span class="mono"></span><strong></strong><em></em>';
    button.querySelector('span').textContent = definition.eyebrow;
    button.querySelector('strong').textContent = definition.label;
    button.querySelector('em').textContent = countForPlatform(definition.key);
    button.addEventListener('click', () => {
      state.platform = definition.key;
      state.page = 1;
      renderCatalog(true);
    });
    return button;
  }));
};

const columnsForViewport = () => {
  if (window.innerWidth <= 1366) return 3;
  return 5;
};

const pageSize = () => columnsForViewport() * 5;

const sortedGames = () => {
  const filtered = (state.platform === 'all'
    ? [...catalog]
    : catalog.filter((game) => game.platform === state.platform)).filter(matchesQuery);

  return filtered.sort((left, right) => {
    if (state.sort === 'newest') return right.order - left.order;
    if (state.sort === 'name-asc') return left.title.localeCompare(right.title, 'en');
    if (state.sort === 'name-desc') return right.title.localeCompare(left.title, 'en');
    return left.order - right.order;
  });
};

const createGameCard = (game, index) => {
  const card = document.createElement('article');
  card.className = 'game-card hover-target';
  card.dataset.game = game.title;
  card.dataset.slug = game.slug;
  card.dataset.platform = game.platform;
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `ดูรายละเอียดและแพตช์ ${game.title}`);

  const poster = document.createElement('div');
  poster.className = `poster cover-poster ${posterShapes[index % posterShapes.length]}`;

  const cover = document.createElement('img');
  cover.src = game.cover;
  cover.alt = `ปกเกม ${game.title} ฉบับภาษาไทย`;
  cover.loading = 'lazy';
  cover.decoding = 'async';

  const gameIndex = document.createElement('span');
  gameIndex.className = 'poster-index mono';
  gameIndex.textContent = game.index;

  const arrow = document.createElement('span');
  arrow.className = 'poster-arrow';
  arrow.textContent = '↗';
  arrow.setAttribute('aria-hidden', 'true');

  poster.append(cover, gameIndex, arrow);

  const meta = document.createElement('div');
  meta.className = 'game-meta';
  meta.innerHTML = '<h3></h3><span class="mono"></span><span class="mono"></span>';
  meta.querySelector('h3').textContent = game.title;
  meta.querySelectorAll('span')[0].textContent = game.version;
  meta.querySelectorAll('span')[1].textContent = game.platformLabel;

  const patchDate = document.createElement('time');
  patchDate.className = 'game-patch-date mono';
  patchDate.dateTime = game.patchDate || '';
  patchDate.textContent = `อัปเดตแพตช์ ${formatPatchDate(game.patchDate)}`;
  meta.append(patchDate);

  if (window.PatchStats) {
    const isExternalDownload = game.distributionType === 'external-download';
    const stat = document.createElement('p');
    stat.className = 'game-patch-count mono';
    stat.textContent = isExternalDownload ? 'DOWNLOADS —' : 'PATCHED —';
    meta.append(stat);
    const getStat = isExternalDownload ? window.PatchStats.getDownload : window.PatchStats.get;
    getStat(game.slug).then((value) => {
      if (value === null) { stat.remove(); return; }
      stat.textContent = isExternalDownload
        ? `ดาวน์โหลด ${window.PatchStats.format(value)} ครั้ง`
        : `แพตช์แล้ว ${window.PatchStats.format(value)} ครั้ง`;
    });
  }

  const openGame = () => {
    window.location.href = `./game.html?game=${encodeURIComponent(game.slug)}`;
  };
  card.addEventListener('click', openGame);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openGame();
    }
  });

  card.append(poster, meta);
  return card;
};

const gameHref = (game) => `./game.html?game=${encodeURIComponent(game.slug)}`;
const displayTitle = (game) => game.details?.thaiTitle || game.title;
const secondaryTitle = (game) => displayTitle(game) === game.title
  ? (game.details?.originalTitle || game.details?.japaneseTitle || game.title)
  : game.title;
const metricText = (game, value) => {
  if (value === undefined) return 'กำลังโหลดสถิติ';
  if (value === null) return game.distributionType === 'external-download' ? 'ดาวน์โหลดโดยตรง' : 'แพตช์ผ่านเว็บ';
  return game.distributionType === 'external-download'
    ? `ดาวน์โหลด ${window.PatchStats.format(value)} ครั้ง`
    : `แพตช์แล้ว ${window.PatchStats.format(value)} ครั้ง`;
};

const createPopularCard = (game, rank, value, featured = false) => {
  const card = document.createElement('a');
  card.className = `${featured ? 'popular-feature-card' : 'popular-small-card'} hover-target`;
  card.href = gameHref(game);
  card.setAttribute('aria-label', `อันดับ ${rank} ${displayTitle(game)} — ดูรายละเอียดเกม`);

  const media = document.createElement('div');
  media.className = 'popular-card-media';
  const image = document.createElement('img');
  image.src = game.cover;
  image.alt = `ปกเกม ${displayTitle(game)} ฉบับภาษาไทย`;
  image.loading = 'lazy';
  image.decoding = 'async';
  const badge = document.createElement('span');
  badge.className = 'popular-rank mono';
  badge.textContent = `TOP ${String(rank).padStart(2, '0')}`;
  media.append(image, badge);

  const copy = document.createElement('div');
  copy.className = 'popular-card-copy';
  const meta = document.createElement('p');
  meta.className = 'popular-card-meta mono';
  meta.textContent = `${game.platformLabel} / ${game.version}`;
  const title = document.createElement('h3');
  title.textContent = displayTitle(game);
  const detail = document.createElement('p');
  detail.className = 'popular-card-detail';
  detail.textContent = secondaryTitle(game);
  const stat = document.createElement('span');
  stat.className = 'popular-card-stat mono';
  stat.textContent = metricText(game, value);
  copy.append(meta, title, detail, stat);

  card.append(media, copy);
  return card;
};

const popularFallbackSlugs = [
  'dragon-quest-viii',
  'dragon-quest-vii',
  'saga2-hihou-densetsu',
  'fire-emblem-three-houses',
];
const popularFallback = popularFallbackSlugs
  .map((slug) => catalog.find((game) => game.slug === slug))
  .filter(Boolean);
const popularGames = document.querySelector('#popular-games');

const renderPopularGames = (games, metrics = new Map()) => {
  if (!popularGames || !games.length) return;
  const feature = createPopularCard(games[0], 1, metrics.get(games[0].slug), true);
  const side = document.createElement('div');
  side.className = 'popular-side-list';
  games.slice(1, 4).forEach((game, index) => {
    side.append(createPopularCard(game, index + 2, metrics.get(game.slug)));
  });
  popularGames.replaceChildren(feature, side);
  bindHoverTargets(popularGames);
};

const loadPopularRanking = async () => {
  if (!popularGames || !window.PatchStats) return;
  const metrics = new Map();
  await Promise.all(catalog.map(async (game) => {
    const getStat = game.distributionType === 'external-download'
      ? window.PatchStats.getDownload
      : window.PatchStats.get;
    metrics.set(game.slug, await getStat(game.slug));
  }));

  const fallbackRank = new Map(popularFallbackSlugs.map((slug, index) => [slug, index]));
  const ranked = [...catalog].sort((left, right) => {
    const leftValue = metrics.get(left.slug);
    const rightValue = metrics.get(right.slug);
    const leftScore = Number.isFinite(leftValue) ? leftValue : -1;
    const rightScore = Number.isFinite(rightValue) ? rightValue : -1;
    if (rightScore !== leftScore) return rightScore - leftScore;
    const leftFallback = fallbackRank.has(left.slug) ? fallbackRank.get(left.slug) : Number.MAX_SAFE_INTEGER;
    const rightFallback = fallbackRank.has(right.slug) ? fallbackRank.get(right.slug) : Number.MAX_SAFE_INTEGER;
    if (leftFallback !== rightFallback) return leftFallback - rightFallback;
    return right.order - left.order;
  }).slice(0, 4);
  renderPopularGames(ranked, metrics);
};

const latestGames = document.querySelector('#latest-games');
const createLatestCard = (game) => {
  const card = document.createElement('a');
  card.className = 'latest-game-card hover-target';
  card.href = gameHref(game);
  card.setAttribute('aria-label', `ดูรายละเอียด ${displayTitle(game)}`);

  const imageWrap = document.createElement('div');
  imageWrap.className = 'latest-game-cover';
  const image = document.createElement('img');
  image.src = game.cover;
  image.alt = `ปกเกม ${displayTitle(game)} ฉบับภาษาไทย`;
  image.loading = 'lazy';
  image.decoding = 'async';
  imageWrap.append(image);

  const meta = document.createElement('div');
  meta.className = 'latest-game-copy';
  const platform = document.createElement('span');
  platform.className = 'mono';
  platform.textContent = `${game.platformLabel} / ${game.version}`;
  const title = document.createElement('h3');
  title.textContent = displayTitle(game);
  const date = document.createElement('time');
  date.className = 'mono';
  date.dateTime = game.patchDate || '';
  date.textContent = `อัปเดตแพตช์ ${formatPatchDate(game.patchDate)}`;
  meta.append(platform, title, date);
  card.append(imageWrap, meta);
  return card;
};

const renderLatestGames = () => {
  if (!latestGames) return;
  const latest = [...catalog].sort((left, right) => right.order - left.order).slice(0, 4);
  latestGames.replaceChildren(...latest.map(createLatestCard));
  bindHoverTargets(latestGames);
};

const pagination = document.createElement('nav');
pagination.className = 'game-pagination';
pagination.setAttribute('aria-label', 'หน้ารายการเกม');
gameGrid.insertAdjacentElement('afterend', pagination);

const updateUrl = () => {
  const url = new URL(window.location.href);
  state.platform === 'all' ? url.searchParams.delete('platform') : url.searchParams.set('platform', state.platform);
  state.sort === 'default' ? url.searchParams.delete('sort') : url.searchParams.set('sort', state.sort);
  state.page === 1 ? url.searchParams.delete('page') : url.searchParams.set('page', String(state.page));
  state.query ? url.searchParams.set('q', state.query) : url.searchParams.delete('q');
  url.hash = 'games';
  window.history.replaceState({}, '', url);
};

const renderPagination = (totalPages) => {
  pagination.hidden = totalPages <= 1;
  if (pagination.hidden) {
    pagination.replaceChildren();
    return;
  }

  const previous = document.createElement('button');
  previous.type = 'button';
  previous.className = 'pagination-arrow hover-target';
  previous.textContent = '← ก่อนหน้า';
  previous.disabled = state.page === 1;
  previous.addEventListener('click', () => {
    state.page -= 1;
    renderCatalog(true, true);
  });

  const pages = document.createElement('div');
  pages.className = 'pagination-pages';
  for (let page = 1; page <= totalPages; page += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `pagination-page hover-target${page === state.page ? ' is-active' : ''}`;
    button.textContent = String(page).padStart(2, '0');
    button.setAttribute('aria-label', `ไปหน้าที่ ${page}`);
    button.setAttribute('aria-current', page === state.page ? 'page' : 'false');
    button.addEventListener('click', () => {
      state.page = page;
      renderCatalog(true, true);
    });
    pages.append(button);
  }

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'pagination-arrow hover-target';
  next.textContent = 'ถัดไป →';
  next.disabled = state.page === totalPages;
  next.addEventListener('click', () => {
    state.page += 1;
    renderCatalog(true, true);
  });

  pagination.replaceChildren(previous, pages, next);
};

function renderCatalog(shouldUpdateUrl = false, shouldScroll = false) {
  const games = sortedGames();
  const totalPages = Math.max(1, Math.ceil(games.length / pageSize()));
  state.page = Math.min(state.page, totalPages);
  const start = (state.page - 1) * pageSize();
  const visible = games.slice(start, start + pageSize());

  gameGrid.replaceChildren(...visible.map(createGameCard));
  platformEmpty.hidden = games.length !== 0;
  if (games.length === 0) {
    platformEmpty.querySelector('h3').innerHTML = state.query ? 'ไม่พบเกม<br />ที่ตรงกับคำค้นหา' : 'กำลังเตรียมเกม<br />สำหรับเครื่องนี้';
    platformEmpty.querySelector('p').textContent = state.query
      ? `ไม่พบ "${state.query}" ${state.platform === 'all' ? '' : `ในหมวด ${platformLabels[state.platform]} `}ลองค้นด้วยชื่ออังกฤษ ชื่อไทย หรือเลือก "รวมทั้งหมด"`
      : 'เมื่อมีผลงานพร้อม รายการเกมและหน้าสำหรับแพตช์จะปรากฏในหมวดนี้';
  }
  platformLabel.textContent = platformLabels[state.platform];
  platformCount.textContent = games.length
    ? `${games.length} เกม · หน้า ${state.page}/${totalPages}`
    : '0 เกม';
  gameSort.value = state.sort;

  platformFilter.querySelectorAll('.platform-tab').forEach((tab) => {
    const active = tab.dataset.platform === state.platform;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    if (active) tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });

  renderPagination(totalPages);
  bindHoverTargets(document);
  if (shouldUpdateUrl) updateUrl();
  if (shouldScroll) document.querySelector('.platform-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

gameSort.addEventListener('change', () => {
  state.sort = gameSort.value;
  state.page = 1;
  renderCatalog(true);
});

const gameSearch = document.querySelector('#game-search');
if (gameSearch) {
  gameSearch.value = state.query;
  let searchTimer = 0;
  gameSearch.addEventListener('input', () => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      state.query = gameSearch.value.trim();
      state.page = 1;
      renderCatalog(true);
    }, 150);
  });
}

let resizeTimer = 0;
let previousPageSize = pageSize();
window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    const currentPageSize = pageSize();
    if (currentPageSize === previousPageSize) return;
    previousPageSize = currentPageSize;
    state.page = 1;
    renderCatalog(true);
  }, 160);
});

createPlatformTabs();
renderCatalog(false);
renderPopularGames(popularFallback);
renderLatestGames();
loadPopularRanking();
bindHoverTargets(document);

if (requestedPlatform || window.location.hash === '#games') {
  setTimeout(() => {
    const gamesSection = document.querySelector('#games');
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}
