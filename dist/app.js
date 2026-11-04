const cursor = document.querySelector('.cursor');
const hoverTargets = document.querySelectorAll('.hover-target, a, button, select');

if (window.matchMedia('(pointer: fine)').matches) {
  let targetX = -100;
  let targetY = -100;
  let currentX = -100;
  let currentY = -100;

  window.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  const renderCursor = () => {
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;
    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(renderCursor);
  };
  requestAnimationFrame(renderCursor);

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

const applyPlatformFilter = (platform, updateUrl = true) => {
  const selected = platformLabels[platform] ? platform : 'all';
  let visibleCount = 0;

  gameCards.forEach((card) => {
    const isVisible = selected === 'all' || card.dataset.platform === selected;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

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

  if (updateUrl) {
    const url = new URL(window.location.href);
    if (selected === 'default') url.searchParams.delete('sort');
    else url.searchParams.set('sort', selected);
    url.hash = 'games';
    window.history.replaceState({}, '', url);
  }
};

gameSort.addEventListener('change', () => applyGameSort(gameSort.value));

const initialParams = new URLSearchParams(window.location.search);
const initialPlatform = initialParams.get('platform') || 'all';
const initialSort = initialParams.get('sort') || 'default';
applyPlatformFilter(initialPlatform, false);
applyGameSort(initialSort, false);
