const cursor = document.querySelector('.cursor');
const hoverTargets = document.querySelectorAll('.hover-target, a, button, select');

if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
  }, { passive: true });

  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    target.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal-on-scroll').forEach((element) => observer.observe(element));

const gameRoutes = {
  'The World Ends with You': 'the-world-ends-with-you',
  'Etrian Odyssey Untold': 'etrian-odyssey-untold',
  'Inazuma Eleven 1-2-3': 'inazuma-eleven-123',
  'Bravely Default': 'bravely-default',
  'Final Fantasy Explorers': 'final-fantasy-explorers',
  'Dragon Ball Fusions': 'dragon-ball-fusions',
  'Shin Megami Tensei IV': 'shin-megami-tensei-iv',
  'Yo-kai Watch': 'yo-kai-watch',
  'Inazuma Eleven GO: Wildfire': 'inazuma-go-wildfire',
  'Dragon Quest VII: Isan Edition': 'dragon-quest-vii-isan',
  'SaGa 2: Hihou Densetsu': 'saga2-hihou-densetsu',
  'Tales of Hearts': 'tales-of-hearts',
  'Dragon Quest VI': 'dragon-quest-vi',
  'Suikoden Tierkreis': 'suikoden-tierkreis',
  'Monster Hunter 3': 'monster-hunter-3',
  'Dragon Quest V': 'dragon-quest-v',
  'Time Travelers': 'time-travelers',
};

document.querySelectorAll('.game-card').forEach((card) => {
  const slug = gameRoutes[card.dataset.game];
  if (!slug) return;

  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `ดูรายละเอียดและแพตช์ ${card.dataset.game}`);

  const openGame = () => {
    window.location.href = `./game.html?game=${encodeURIComponent(slug)}`;
  };

  card.addEventListener('click', openGame);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openGame();
    }
  });
});

const platformLabels = {
  all: 'รวมทุกเครื่อง',
  '3ds': 'Nintendo 3DS',
  nds: 'Nintendo DS',
  psp: 'PSP',
  ps2: 'PlayStation 2',
  switch: 'Nintendo Switch',
};

const platformTabs = document.querySelectorAll('.platform-tab');
const gameCards = document.querySelectorAll('.game-card');
const gameGrid = document.querySelector('.game-grid');
const originalGameOrder = new Map([...gameCards].map((card, index) => [card, index]));
const platformLabel = document.querySelector('#platform-label');
const platformCount = document.querySelector('#platform-count');
const platformEmpty = document.querySelector('#platform-empty');
const gameSort = document.querySelector('#game-sort');
const gameMore = document.querySelector('#game-more');
const gameMoreWrap = gameMore.parentElement;
let activePlatform = 'all';
let isGameListExpanded = false;
let resizeFrame;

platformTabs.forEach((tab) => {
  const platform = tab.dataset.platform;
  const count = platform === 'all'
    ? gameCards.length
    : [...gameCards].filter((card) => card.dataset.platform === platform).length;
  tab.querySelector('em').textContent = count;
});

const getVisibleCardLimit = () => {
  const columns = window.getComputedStyle(gameGrid).gridTemplateColumns.split(' ').filter(Boolean).length || 1;
  return columns * 5;
};

const renderGameCards = () => {
  const orderedCards = [...gameGrid.querySelectorAll('.game-card')];
  const filteredCards = orderedCards.filter((card) => activePlatform === 'all' || card.dataset.platform === activePlatform);
  const visibleLimit = getVisibleCardLimit();

  orderedCards.forEach((card) => {
    const filteredIndex = filteredCards.indexOf(card);
    const isWithinLimit = isGameListExpanded || filteredIndex < visibleLimit;
    card.hidden = filteredIndex === -1 || !isWithinLimit;
  });

  const hasOverflow = filteredCards.length > visibleLimit;
  gameMore.hidden = !hasOverflow;
  gameMoreWrap.hidden = !hasOverflow;
  gameMore.setAttribute('aria-expanded', String(hasOverflow && isGameListExpanded));
  gameMore.querySelector('span').textContent = isGameListExpanded ? 'แสดง 5 แถวแรก' : `ดูเกมเพิ่มเติม (${filteredCards.length - visibleLimit})`;
  gameMore.querySelector('small').textContent = isGameListExpanded ? `${filteredCards.length} เกม` : 'แสดงสูงสุด 5 แถว';
};

const applyPlatformFilter = (platform, updateUrl = true) => {
  const selected = platformLabels[platform] ? platform : 'all';
  const visibleCount = [...gameCards].filter((card) => selected === 'all' || card.dataset.platform === selected).length;
  activePlatform = selected;
  isGameListExpanded = false;
  renderGameCards();

  platformTabs.forEach((tab) => {
    const isActive = tab.dataset.platform === selected;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  platformLabel.textContent = platformLabels[selected];
  platformCount.textContent = `${visibleCount} เกม`;
  platformEmpty.hidden = visibleCount !== 0;

  if (updateUrl) {
    const url = new URL(window.location.href);
    if (selected === 'all') url.searchParams.delete('platform');
    else url.searchParams.set('platform', selected);
    url.hash = 'games';
    window.history.replaceState({}, '', url);
  }
};

platformTabs.forEach((tab) => {
  tab.addEventListener('click', () => applyPlatformFilter(tab.dataset.platform));
});

const sortModes = ['default', 'newest', 'name-asc', 'name-desc'];

const applyGameSort = (mode, updateUrl = true) => {
  const selected = sortModes.includes(mode) ? mode : 'default';
  const sortedCards = [...gameCards].sort((left, right) => {
    if (selected === 'newest') return originalGameOrder.get(right) - originalGameOrder.get(left);
    if (selected === 'name-asc') return left.dataset.game.localeCompare(right.dataset.game, 'en');
    if (selected === 'name-desc') return right.dataset.game.localeCompare(left.dataset.game, 'en');
    return originalGameOrder.get(left) - originalGameOrder.get(right);
  });

  sortedCards.forEach((card) => gameGrid.appendChild(card));
  gameSort.value = selected;
  isGameListExpanded = false;
  renderGameCards();

  if (updateUrl) {
    const url = new URL(window.location.href);
    if (selected === 'default') url.searchParams.delete('sort');
    else url.searchParams.set('sort', selected);
    url.hash = 'games';
    window.history.replaceState({}, '', url);
  }
};

gameSort.addEventListener('change', () => applyGameSort(gameSort.value));

gameMore.addEventListener('click', () => {
  isGameListExpanded = !isGameListExpanded;
  renderGameCards();
  if (!isGameListExpanded) gameGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(renderGameCards);
});

const initialParams = new URLSearchParams(window.location.search);
const initialPlatform = initialParams.get('platform') || 'all';
const initialSort = initialParams.get('sort') || 'default';
applyPlatformFilter(initialPlatform, false);
applyGameSort(initialSort, false);
