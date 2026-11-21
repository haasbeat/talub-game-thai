*** แจกฟรี ที่เพจ ตลับเกมภาษาไทย ห้ามจำหน่ายโดยเด็ดขาด ***
========================================================================
ข้อมูลโครงการแปลไทย Yu-Gi-Oh! - World Championship 2007 (USA) (v1.0.0)
========================================================================

เกม: Yu-Gi-Oh! - World Championship 2007 (Nintendo DS / Game Code: AY7E / USA)
เวอร์ชัน: ตลับเกมภาษาไทย v1.0.0

[จุดเด่นเชิงวิศวกรรมและงานแปล]
- ฟอนต์ไทย 3 ระดับมาตรฐาน Cid to Chocobo 14 แถว (fw_r1212a 14x14 + ARM9 height helper + fw_r1414a + lc16)
  ลายเส้น Regular 1px คมชัด 0 SemiBold nibbles ครบสระบน-ล่าง-วรรณยุกต์ 3 ชั้น (DIACRITIC_STACK_COLLISION = 0)
- ระบบ Word-Wrap 2 ชั้น: ตัดคำคำอธิบายการ์ด (<= 146px/บรรทัด), Duel Words (<= 206px), ซองการ์ด (<= 178px)
  และฝัง 0x1F Runtime Word-Break Hook ใน ARM9 Cave (0x02004540..0x0200469C) โดยคง FormatAndDrawText_EN (0x02003718) ไว้ตามต้นฉบับ
- ตาราง Pointer แบบ Monotonic Bounds-Safe (<0x400) รองรับบัฟเฟอร์สตรีมมิงและไม่ทับแรม Deck Construction / Card Detail
- ผ่าน Gate ข้ามบท 0 Duplicate Conflicts / 0 Pronoun Drift / 0 Term Drift และ PreInjectionGate 0 CRITICAL_FREEZE / 0 ERROR / 0 WARNING พร้อม Readback 1:1

[สัดส่วนความคืบหน้า & ขอบเขตที่ยังเป็นภาษาต้นฉบับ (Dual-Status Binary Census)]
- ตัวชี้วัดหลัก: ข้อความบทสนทนา-คำอธิบายการ์ด-เมนูทุกหมวด 100% (ภาพรวมไบนารีทั้งเกม 78.55% — แปลไทย 6,488/8,260 รายการ, คงรูปชื่อการ์ด/สัญลักษณ์อย่างตั้งใจ 1,772 รายการ)
- บทสอนเล่นบทที่ 1–15 (`dlg:00_tuto` + `dlg:02_tuto`): 615 / 615 (100.0%)
- ข้อความระหว่างดูเอล & เมนูหลัก (`dlg:03_duel` + `dlg:01_main_menu`): 555 / 558 (แปลไทยครบ, คงรูป 3 รายการ)
- บทพากย์ดูเอลลิสต์และวิญญาณ 80 ตัว (`dlg:04_talk`): 1,540 / 1,560 (แปลไทยครบ, คงรูป 20 รายการ Shift-JIS Row 0x81)
- เอฟเฟกต์การ์ดทุกใบในเกม (`item:06_card_desc`): 1,662 / 1,662 (100.0%)
- พจนานุกรม Duel Words (`item:03_dw_name` + `item:04_dw_text`): คำอธิบาย 231/231 (100.0%) + หัวข้อแปลไทย 160 / คงชื่อการ์ดอังกฤษ 71
- ซองการ์ดและคำอธิบายร้านค้า (`item:01_pack_name` + `item:02_pack_desc`): 134 / 134 (100.0%)
- เมนูระบบ จัดเด็ค ชาเลนจ์ Wi-Fi และรายชื่อดูเอลลิสต์ (`menu:game` + `name:game`): 1,591 / 1,607 (แปลไทยครบ, คงรูป 16 รายการ)
- ส่วนที่ยังคงเป็นภาษาอังกฤษในแพตช์ v1.0.0 (เปิดเผยเพื่อความโปร่งใส):
  * ชื่อการ์ด Yu-Gi-Oh! ทั้ง 1,662 ใบ (`item:05_card_name`) และหัวข้อพจนานุกรมที่เป็นชื่อการ์ด 71 คำ: คงชื่ออังกฤษมาตรฐาน TCG อย่างตั้งใจ เพื่อให้ผู้เล่นค้นหาและเทียบกับกติกาจริงได้ง่าย
  * กราฟิกข้อความ 2D ในไฟล์ .pac (เช่น Title Banner, Menu Graphics, Icon/Banner ภาพเฉพาะ): ยังเป็นกราฟิกต้นฉบับภาษาอังกฤษ
  * ข้อความระบบคงรูป (`menu:game` 16, `dlg:03_duel` 3, `dlg:04_talk` 20 Row 0x81): รวมคงรูปทั้งเกม 1,772 รายการ
- สถานะ QA: readback-verified (8,260/8,260); xdelta-roundtrip-verified; v1.0.0 emu-unverified / hardware-unverified (สืบยอดแก้บั๊ก Deck Edit Top-Screen Freeze จาก v0.3.3->v0.3.4 แล้ว)

[ค่าตรวจสอบความถูกต้องของไฟล์ / Verification SHA-256 Checksums]
- Clean Source ROM (Yu-Gi-Oh! - World Championship 2007 (USA) (En,Ja).nds): 1e961465aac4255b0406364ec4c3c619b6f7cf137bca244d5e5af555bfdeadce
- Patched Target ROM (YuGiOh_WC2007_TH_v1.0.0.nds): f64439b66b3f5e7c57dfc2bd5bdc56024db296fde28215753cb908c020050db5
- Distribution Patch (YuGiOh_WC2007_TH_v1.0.0.xdelta, 1,977,971 bytes): dcea223e599122629aab197a3f33ad8b0576a0f087466cb5159ad8258ee964fc

[คำชี้แจงลิขสิทธิ์และการใช้งานที่เหมาะสม / Fair Use & Zero-ROM Notice]
1. แพตช์นี้ (YuGiOh_WC2007_TH_v1.0.0.xdelta) บรรจุเฉพาะไฟล์ข้อความภาษาไทย ฟอนต์ไทย 4 ระดับ (Cid to Chocobo 14-Row Regular 1px)
   และแพตช์ Word-Wrap/Dispatcher บน ARM9 เท่านั้น ไม่มีไฟล์ตัวเกม (ROM) ของ Konami แนบมาด้วย
   (This patch contains localization text, Thai fonts, and ARM9 hook data only; NO copyrighted ROM data is distributed.)
2. จัดทำขึ้นเพื่อการศึกษาภาษาและความบันเทิงสำหรับผู้ถือครองตลับ/รอมแท้เท่านั้น
3. แจกฟรี 100% ห้ามจำหน่าย แนบขายพร้อมไฟล์รอม หรือใส่ตลับ Flashcart ขายโดยเด็ดขาด
