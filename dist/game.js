const games = {
  'the-world-ends-with-you': {
    index: '001', title: 'The World Ends with You', platform: 'NDS', cover: './assets/covers/the-world-ends-with-you.jpg',
    version: 'Preview', format: 'xdelta', status: 'Frontend Preview', accept: '.nds', fileTypes: 'NDS ROM',
    description: 'รายละเอียดม็อดภาษาไทยและพื้นที่เตรียมแพตช์สำหรับ The World Ends with You โดยเฉพาะ',
  },
  'etrian-odyssey-untold': {
    index: '002', title: 'Etrian Odyssey Untold', platform: '3DS', cover: './assets/covers/etrian-odyssey-untold.jpg',
    version: 'Preview', format: 'xdelta', status: 'Frontend Preview', accept: '.3ds,.cia', fileTypes: '3DS / CIA',
    description: 'หน้ารวมข้อมูลเวอร์ชันภาษาไทยและพื้นที่แพตช์ของ The Millennium Girl โดยไม่ปะปนกับเกมอื่น',
  },
  'inazuma-eleven-123': {
    index: '003', title: 'Inazuma Eleven 1-2-3', platform: '3DS', cover: './assets/covers/inazuma-eleven-123.jpg',
    version: 'Preview', format: 'xdelta', status: 'Frontend Preview', accept: '.3ds,.cia', fileTypes: '3DS / CIA',
    description: 'รายละเอียดชุดรวมสามภาคและพื้นที่แพตช์ภาษาไทยประจำเกม Inazuma Eleven 1-2-3',
  },
  'bravely-default': {
    index: '004', title: 'Bravely Default', platform: '3DS', cover: './assets/covers/bravely-default.jpg',
    version: 'Preview', format: 'xdelta', status: 'Frontend Preview', accept: '.3ds,.cia', fileTypes: '3DS / CIA',
    description: 'หน้ารายละเอียดม็อดไทยของ Bravely Default พร้อมพื้นที่ตรวจและเลือกไฟล์ต้นฉบับเฉพาะเกม',
  },
  'final-fantasy-explorers': {
    index: '005', title: 'Final Fantasy Explorers', platform: '3DS', cover: './assets/covers/final-fantasy-explorers.jpg',
    version: 'Preview', format: 'xdelta', status: 'Frontend Preview', accept: '.3ds,.cia', fileTypes: '3DS / CIA',
    description: 'ข้อมูลแพตช์ภาษาไทยและพื้นที่ทำงานของ Final Fantasy Explorers ที่แยกจากเกมอื่นอย่างชัดเจน',
  },
  'dragon-ball-fusions': {
    index: '006', title: 'Dragon Ball Fusions', platform: '3DS', cover: './assets/covers/dragon-ball-fusions.jpg',
    version: 'Preview', format: 'xdelta', status: 'Frontend Preview', accept: '.3ds,.cia', fileTypes: '3DS / CIA',
    description: 'รายละเอียดฉบับภาษาไทยและพื้นที่แพตช์เฉพาะ Dragon Ball Fusions พร้อมสถานะไฟล์ที่อ่านง่าย',
  },
  'shin-megami-tensei-iv': {
    index: '007', title: 'Shin Megami Tensei IV', platform: '3DS', cover: './assets/covers/shin-megami-tensei-iv.jpg',
    version: 'Preview', format: 'xdelta', status: 'Frontend Preview', accept: '.3ds,.cia', fileTypes: '3DS / CIA',
    description: 'หน้าข้อมูลและพื้นที่แพตช์ภาษาไทยของ Shin Megami Tensei IV โดยไม่ต้องเลือกชื่อเกมซ้ำ',
  },
  'yo-kai-watch': {
    index: '008', title: 'Yo-kai Watch', platform: '3DS', cover: './assets/covers/yo-kai-watch.jpg',
    version: 'Preview', format: 'xdelta', status: 'Frontend Preview', accept: '.3ds,.cia', fileTypes: '3DS / CIA',
    description: 'รายละเอียดม็อดไทยของ Yo-kai Watch และพื้นที่เลือก ROM ที่ผูกกับเกมนี้โดยตรง',
  },
  'inazuma-go-wildfire': {
    index: '009', title: 'Inazuma Eleven GO: Wildfire', platform: '3DS', cover: './assets/covers/inazuma-go-wildfire.jpg',
    version: 'Preview', format: 'xdelta', status: 'Frontend Preview', accept: '.3ds,.cia', fileTypes: '3DS / CIA',
    description: 'ข้อมูลเวอร์ชัน Wildfire และพื้นที่แพตช์ภาษาไทยเฉพาะเกม พร้อมขั้นตอนเตรียมไฟล์ต้นฉบับ',
  },
  'dragon-quest-vii-isan': {
    index: '010', title: 'Dragon Quest VII: Isan Edition', platform: '3DS', cover: './assets/covers/dragon-quest-vii-isan.jpg',
    version: 'Preview', format: 'xdelta', status: 'Frontend Preview', accept: '.3ds,.cia', fileTypes: '3DS / CIA',
    description: 'หน้ารายละเอียดฉบับภาษาอีสานของ Dragon Quest VII และพื้นที่แพตช์ที่แยกเฉพาะเวอร์ชันนี้',
  },
};

const params = new URLSearchParams(window.location.search);
const requestedSlug = params.get('game');
const slug = games[requestedSlug] ? requestedSlug : 'the-world-ends-with-you';
const game = games[slug];

document.title = `${game.title} — ตลับเกมภาษาไทย`;
document.querySelector('#detail-title').textContent = game.title;
document.querySelector('#detail-description').textContent = game.description;
document.querySelector('#detail-cover').src = game.cover;
document.querySelector('#detail-cover').alt = `ปกเกม ${game.title} ฉบับภาษาไทย`;
document.querySelector('#detail-index').textContent = `${game.index} / ${game.platform}`;
document.querySelector('#detail-platform').textContent = game.platform;
document.querySelector('#detail-version').textContent = game.version;
document.querySelector('#detail-format').textContent = game.format;
document.querySelector('#detail-status').textContent = game.status;
document.querySelector('#workspace-game').textContent = game.title;
document.querySelector('#workspace-platform').textContent = game.platform;
document.querySelector('#file-types').textContent = game.fileTypes;
document.querySelector('#rom-input').accept = game.accept;

const cursor = document.querySelector('.cursor');
const hoverTargets = document.querySelectorAll('.hover-target, a, button');

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

const dropZone = document.querySelector('#drop-zone');
const romInput = document.querySelector('#rom-input');
const fileName = document.querySelector('#file-name');
const fileSize = document.querySelector('#file-size');
const fileHash = document.querySelector('#file-hash');
const patchButton = document.querySelector('#patch-button');
const toast = document.querySelector('#toast');

const formatBytes = (bytes) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / (1024 ** index)).toFixed(index > 1 ? 2 : 0)} ${units[index]}`;
};

const handleFile = (file) => {
  if (!file) return;
  fileName.textContent = file.name;
  fileSize.textContent = formatBytes(file.size);
  fileHash.textContent = 'พร้อมตรวจเมื่อเชื่อมรายการ source hash';
  dropZone.querySelector('h3').textContent = 'เลือกไฟล์ของเกมนี้แล้ว';
  dropZone.querySelector('p').innerHTML = 'ไฟล์ยังอยู่ในอุปกรณ์ของคุณ<br />ไม่มีการอัปโหลดเกิดขึ้น';
  patchButton.disabled = false;
  patchButton.querySelector('span').textContent = 'ตรวจไฟล์และเริ่มแพตช์';
};

dropZone.addEventListener('click', () => romInput.click());
dropZone.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    romInput.click();
  }
});
romInput.addEventListener('change', () => handleFile(romInput.files[0]));

['dragenter', 'dragover'].forEach((type) => {
  dropZone.addEventListener(type, (event) => {
    event.preventDefault();
    dropZone.classList.add('is-dragging');
  });
});
['dragleave', 'drop'].forEach((type) => {
  dropZone.addEventListener(type, (event) => {
    event.preventDefault();
    dropZone.classList.remove('is-dragging');
  });
});
dropZone.addEventListener('drop', (event) => handleFile(event.dataTransfer.files[0]));

patchButton.addEventListener('click', () => {
  toast.textContent = `ระบบแพตช์ของ ${game.title} จะเชื่อมในเฟสหลังบ้าน`;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3000);
});
