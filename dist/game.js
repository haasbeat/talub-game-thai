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
  'saga2-hihou-densetsu': {
    index: '011', title: 'SaGa 2: Hihou Densetsu - Goddess of Destiny', platform: 'Nintendo DS', cover: './assets/covers/saga2-thai-v1.0.1.jpg',
    version: 'v1.0.1', format: 'xdelta3', status: 'พร้อมติดตั้งบนเว็บ', accept: '.nds', fileTypes: 'CLEAN JAPAN NDS · 128 MB',
    description: 'ฉบับแปลภาษาไทยเต็มรูปแบบของเกม RPG คลาสสิกฉบับรีเมกบน Nintendo DS พร้อมระบบตรวจไฟล์ต้นฉบับและสร้าง ROM ภาษาไทยภายในเบราว์เซอร์',
    details: {
      thaiTitle: 'ซากะ 2 ตำนานสมบัติแห่งโชคชะตา',
      japaneseTitle: 'サガ2 秘宝伝説 GODDESS OF DESTINY',
      originalTitle: 'サガ2 秘宝伝説 GODDESS OF DESTINY',
      studio: 'Square Enix',
      release: '17 กันยายน 2009',
      gameCode: 'Japan · CSGJ',
      genre: 'Role-playing game',
      edition: 'ตลับเกมภาษาไทย v1.0.1',
      overview: 'เกมรีเมกสามมิติของ SaGa 2 บน Game Boy ที่ขยายระบบการต่อสู้ เนื้อเรื่อง และโลกแห่งโชคชะตาสำหรับ Nintendo DS โดยฉบับนี้แปลเนื้อหาในเกมเป็นภาษาไทยทั้งระบบ',
      story: 'ออกเดินทางตามหาพ่อที่หายตัวไป ผ่านโลกต่าง ๆ ซึ่งเชื่อมถึงกันด้วยเสาค้ำฟ้า พร้อมรวบรวมมหาสมบัติ 77 ชิ้นที่เหล่าเทพยุคใหม่ต่างแย่งชิง อำนาจของสมบัติเหล่านี้จะนำคณะเดินทางไปพบเทพีแห่งโชคชะตาและความจริงที่อาจทำให้ทุกโลกพังทลาย',
      localization: 'แปลเนื้อเรื่อง เหตุการณ์ย่อย NPC เมนู ระบบต่อสู้ ไอเทม สกิล มอนสเตอร์ และฐานข้อมูลทั้งหมด พร้อมฟอนต์ไทยหลายขนาด ระบบจัดสระวรรณยุกต์ และลายน้ำยืนยันเวอร์ชันภายในเกม',
      coverage: '19,225 / 19,225',
      coverageNote: 'เนื้อเรื่องหลัก 15 โลก โลกมิวส์ เหตุการณ์ย่อย ระบบ UI และฐานข้อมูลทั้งหมด 100.00% · ผ่านการอ่านกลับจาก ROM ครบทุกระเบียน',
      features: [
        'บทสนทนาและเนื้อเรื่อง 10,670 ระเบียน',
        'ฐานข้อมูลไอเทม สกิล มอนสเตอร์ และระบบช่วยเหลือ 6,908 ระเบียน',
        'ข้อความภาคสนาม ระบบต่อสู้ เมนู และเหตุการณ์ย่อยครบทุกโมดูล',
        'ฟอนต์ไทยและลายน้ำ ตลับเกมภาษาไทย v1.0.1 ภายในเกม',
      ],
      sourceName: 'SaGa 2 - Hihou Densetsu - Goddess of Destiny (Japan).nds · 134,217,728 bytes',
      sourceHash: 'a896e7596b0b5cc4eb3740dd566d32b75c0ff943129f55b67885dd95b9f703c3',
      outputHash: '04445c1c8ee0c95c55a5105db8597216de1ec55808c91e1586edbd96f9fe5fc1',
    },
    manifest: './assets/patches/saga2/v1.0.1/manifest.json',
  },
};

const params = new URLSearchParams(window.location.search);
const requestedSlug = params.get('game');
const slug = games[requestedSlug] ? requestedSlug : 'the-world-ends-with-you';
const game = games[slug];
const details = {
  thaiTitle: `${game.title} ฉบับภาษาไทย`,
  japaneseTitle: game.title,
  originalTitle: game.title,
  studio: 'กำลังรวบรวมข้อมูล',
  release: 'กำลังรวบรวมข้อมูล',
  gameCode: `${game.platform} · รอยืนยันรุ่นเกม`,
  genre: 'Video game',
  edition: game.version,
  overview: game.description,
  story: 'หน้ารายละเอียดเชิงลึกของเกมนี้กำลังอยู่ระหว่างการจัดเตรียม',
  localization: 'ข้อมูลขอบเขตงานแปลและรุ่นไฟล์ที่รองรับจะประกาศหลังผ่านการตรวจสอบรีลีส',
  coverage: 'รายละเอียดกำลังจัดเตรียม',
  coverageNote: 'ยังไม่ประกาศตัวเลขความครอบคลุมจนกว่าจะตรวจจากไฟล์เกมฉบับสุดท้าย',
  features: ['รายละเอียดงานแปลกำลังจัดเตรียม', 'ข้อมูลไฟล์ต้นฉบับจะประกาศหลังตรวจสอบ', 'ไม่เผยแพร่ ROM ต้นฉบับหรือ ROM ที่แก้ไขแล้ว'],
  sourceName: 'ยังไม่เปิดให้ติดตั้งผ่านเว็บ',
  sourceHash: '—',
  outputHash: '—',
  ...(game.details || {}),
};

document.title = `${game.title} — ตลับเกมภาษาไทย`;
document.querySelector('#detail-title').textContent = game.title;
document.querySelector('#detail-japanese-title').textContent = details.japaneseTitle;
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
document.querySelector('#detail-thai-title').textContent = details.thaiTitle;
document.querySelector('#detail-overview').textContent = details.overview;
document.querySelector('#detail-original-title').textContent = details.originalTitle;
document.querySelector('#detail-studio').textContent = details.studio;
document.querySelector('#detail-release').textContent = details.release;
document.querySelector('#detail-game-code').textContent = details.gameCode;
document.querySelector('#detail-genre').textContent = details.genre;
document.querySelector('#detail-edition').textContent = details.edition;
document.querySelector('#detail-story').textContent = details.story;
document.querySelector('#detail-localization').textContent = details.localization;
document.querySelector('#detail-coverage').textContent = details.coverage;
document.querySelector('#detail-coverage-note').textContent = details.coverageNote;
document.querySelector('#detail-source-name').textContent = details.sourceName;
document.querySelector('#detail-source-hash').textContent = details.sourceHash;
document.querySelector('#detail-output-hash').textContent = details.outputHash;
document.querySelector('#detail-features').replaceChildren(...details.features.map((feature, index) => {
  const item = document.createElement('li');
  item.innerHTML = `<span class="mono">${String(index + 1).padStart(2, '0')}</span><strong></strong>`;
  item.querySelector('strong').textContent = feature;
  return item;
}));

const cursor = document.querySelector('.cursor');
const hoverTargets = document.querySelectorAll('.hover-target, a, button');

if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
  }, { passive: true });

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
const downloadButton = document.querySelector('#download-button');
const workspaceStatus = document.querySelector('#workspace-status');
const workspaceNote = document.querySelector('#workspace-note');
const patchProgress = document.querySelector('#patch-progress');
const patchProgressLabel = document.querySelector('#patch-progress-label');
const patchProgressPercent = document.querySelector('#patch-progress-percent');
const patchProgressBar = document.querySelector('#patch-progress-bar');
const toast = document.querySelector('#toast');
let selectedSourceFile = null;
let outputUrl = null;

const manifestPromise = game.manifest
  ? fetch(game.manifest, { cache: 'no-store' }).then((response) => {
      if (!response.ok) throw new Error(`โหลด manifest ไม่สำเร็จ (${response.status})`);
      return response.json();
    })
  : Promise.resolve(null);

if (game.manifest) {
  workspaceStatus.textContent = 'XDELTA3 READY';
  workspaceNote.innerHTML = '<span>แพตช์จริง</span> ระบบจะตรวจขนาดและ SHA-256 ของ ROM ต้นฉบับ จากนั้นรัน xdelta3 ภายในเบราว์เซอร์ ไฟล์ ROM จะไม่ถูกอัปโหลดออกจากเครื่อง แนะนำให้ทดสอบบนคอมพิวเตอร์ก่อน';
}

const formatBytes = (bytes) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / (1024 ** index)).toFixed(index > 1 ? 2 : 0)} ${units[index]}`;
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3200);
};

const setProgress = (label, percent) => {
  const safePercent = Math.max(0, Math.min(100, Math.round(percent)));
  patchProgress.hidden = false;
  patchProgressLabel.textContent = label;
  patchProgressPercent.textContent = `${safePercent}%`;
  patchProgressBar.style.width = `${safePercent}%`;
};

const sha256Blob = async (blob) => {
  const buffer = await blob.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-256', buffer);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

const resetOutput = () => {
  if (outputUrl) URL.revokeObjectURL(outputUrl);
  outputUrl = null;
  downloadButton.hidden = true;
  downloadButton.removeAttribute('href');
};

const handleFile = async (file) => {
  if (!file) return;
  resetOutput();
  selectedSourceFile = null;
  patchButton.disabled = true;
  dropZone.classList.remove('is-valid', 'is-invalid');
  fileName.textContent = file.name;
  fileSize.textContent = formatBytes(file.size);
  dropZone.querySelector('h3').textContent = 'เลือกไฟล์ของเกมนี้แล้ว';
  dropZone.querySelector('p').innerHTML = 'ไฟล์ยังอยู่ในอุปกรณ์ของคุณ<br />ไม่มีการอัปโหลดเกิดขึ้น';

  if (!game.manifest) {
    fileHash.textContent = 'พร้อมตรวจเมื่อเชื่อมรายการ source hash';
    patchButton.disabled = false;
    patchButton.querySelector('span').textContent = 'ตรวจไฟล์และเริ่มแพตช์';
    return;
  }

  try {
    const manifest = await manifestPromise;
    const source = manifest.accepted_sources[0];
    if (file.size !== source.size) {
      fileHash.textContent = `ขนาดไม่ตรง — ต้องเป็น ${formatBytes(source.size)}`;
      dropZone.classList.add('is-invalid');
      patchButton.querySelector('span').textContent = 'ROM ไม่ตรงรุ่น';
      showToast('ROM มีขนาดไม่ตรงกับ Clean Japan ที่รองรับ');
      return;
    }

    setProgress('กำลังตรวจ SHA-256 ของ ROM ต้นฉบับ', 2);
    fileHash.textContent = 'กำลังคำนวณ SHA-256…';
    const sourceHash = await sha256Blob(file);
    if (sourceHash !== source.sha256) {
      fileHash.textContent = `${sourceHash.slice(0, 16)}… — ไม่ตรงรุ่น`;
      dropZone.classList.add('is-invalid');
      patchButton.querySelector('span').textContent = 'SHA-256 ไม่ตรง';
      setProgress('ROM ต้นฉบับไม่ตรงกับรุ่นที่รองรับ', 0);
      showToast('SHA-256 ไม่ตรง — ระบบจะไม่แพตช์ไฟล์นี้');
      return;
    }

    selectedSourceFile = file;
    fileHash.textContent = `${sourceHash.slice(0, 16)}… — ถูกต้อง`;
    dropZone.classList.add('is-valid');
    patchButton.disabled = false;
    patchButton.querySelector('span').textContent = `เริ่มแพตช์ ${manifest.patch_version}`;
    setProgress('ROM ต้นฉบับผ่านการตรวจสอบ', 5);
  } catch (error) {
    fileHash.textContent = 'ตรวจไฟล์ไม่สำเร็จ';
    dropZone.classList.add('is-invalid');
    showToast(error.message || 'เกิดข้อผิดพลาดขณะตรวจ ROM');
  }
};

dropZone.addEventListener('click', () => romInput.click());
dropZone.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    romInput.click();
  }
});
romInput.addEventListener('change', () => void handleFile(romInput.files[0]));

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
dropZone.addEventListener('drop', (event) => void handleFile(event.dataTransfer.files[0]));

const applyVerifiedPatch = async () => {
  if (!selectedSourceFile) return;
  const manifest = await manifestPromise;
  patchButton.disabled = true;
  resetOutput();

  try {
    setProgress('กำลังดาวน์โหลดและตรวจไฟล์ patch', 7);
    const response = await fetch(manifest.patch.url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`ดาวน์โหลด patch ไม่สำเร็จ (${response.status})`);
    const patchBlob = await response.blob();
    if (patchBlob.size !== manifest.patch.size) throw new Error('ขนาดไฟล์ patch ไม่ตรงกับ manifest');
    const patchHash = await sha256Blob(patchBlob);
    if (patchHash !== manifest.patch.sha256) throw new Error('SHA-256 ของไฟล์ patch ไม่ถูกต้อง');

    setProgress('กำลังสร้าง ROM ภาษาไทยด้วย xdelta3', 10);
    const chunks = [];
    let outputSize = 0;
    const worker = new Worker('./assets/engine/xdelta/xdelta3.worker.js', { type: 'module' });

    await new Promise((resolve, reject) => {
      worker.onerror = (event) => reject(new Error(event.message || 'xdelta worker ทำงานไม่สำเร็จ'));
      worker.onmessage = (event) => {
        const message = event.data || {};
        if (!message.final && message.bytes) {
          const bytes = message.bytes instanceof Uint8Array ? message.bytes : new Uint8Array(message.bytes);
          chunks.push(bytes);
          outputSize += bytes.byteLength;
          const percent = 10 + (outputSize / manifest.output.size) * 78;
          setProgress('กำลังสร้าง ROM ภาษาไทยด้วย xdelta3', percent);
          return;
        }
        if (message.final && message.error) {
          reject(new Error(message.errorMessage || `xdelta error ${message.errorCode || ''}`));
          return;
        }
        if (message.final) resolve();
      };
      worker.postMessage({
        command: 'start',
        sourceFile: selectedSourceFile,
        patchFile: patchBlob,
        disableChecksum: false,
      });
    }).finally(() => worker.terminate());

    const outputBlob = new Blob(chunks, { type: 'application/octet-stream' });
    if (outputBlob.size !== manifest.output.size) throw new Error('ขนาด ROM ผลลัพธ์ไม่ตรงกับ manifest');

    setProgress('กำลังตรวจ SHA-256 ของ ROM ผลลัพธ์', 92);
    const outputHash = await sha256Blob(outputBlob);
    if (outputHash !== manifest.output.sha256) throw new Error('SHA-256 ของ ROM ผลลัพธ์ไม่ถูกต้อง');

    outputUrl = URL.createObjectURL(outputBlob);
    downloadButton.href = outputUrl;
    downloadButton.download = manifest.output.filename;
    downloadButton.hidden = false;
    patchButton.querySelector('span').textContent = 'แพตช์สำเร็จ';
    fileHash.textContent = `${outputHash.slice(0, 16)}… — ผลลัพธ์ถูกต้อง`;
    setProgress('แพตช์และตรวจผลลัพธ์สำเร็จ', 100);
    showToast('แพตช์สำเร็จและ SHA-256 ตรงกับ release v1.0.1');
  } catch (error) {
    patchButton.disabled = false;
    patchButton.querySelector('span').textContent = 'ลองแพตช์อีกครั้ง';
    setProgress(error.message || 'แพตช์ไม่สำเร็จ', 0);
    showToast(error.message || 'เกิดข้อผิดพลาดขณะแพตช์');
  }
};

patchButton.addEventListener('click', () => {
  if (!game.manifest) {
    showToast(`ระบบแพตช์ของ ${game.title} จะเชื่อมในเฟสหลังบ้าน`);
    return;
  }
  void applyVerifiedPatch();
});
