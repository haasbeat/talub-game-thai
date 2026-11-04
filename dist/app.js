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

const dropZone = document.querySelector('#drop-zone');
const romInput = document.querySelector('#rom-input');
const fileName = document.querySelector('#file-name');
const fileSize = document.querySelector('#file-size');
const fileHash = document.querySelector('#file-hash');
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
  fileHash.textContent = 'พร้อมตรวจเมื่อเชื่อม patch engine';
  dropZone.querySelector('h3').textContent = 'เลือกไฟล์แล้ว';
  dropZone.querySelector('p').innerHTML = 'ไฟล์ยังอยู่ในอุปกรณ์ของคุณ<br />ไม่มีการอัปโหลดเกิดขึ้น';
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

document.querySelector('#patch-button').addEventListener('click', () => {
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
});

document.querySelectorAll('.game-card').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelector('#patcher').scrollIntoView({ behavior: 'smooth' });
  });
});
