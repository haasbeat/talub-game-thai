# Web patch audit

Updated: 2026-11-09 (Asia/Bangkok)

## Inventory

- Web manifests: 52 (47 xdelta + 5 external Nintendo Switch mod archives)
- Cloudflare R2 storage: 47/47 xdelta patch targets hosted on R2 bucket `talub-patches` and served via CDN Worker
- Patch identity checks passed (file size + SHA-256): 47/47
- Patch dates recorded: 52/52
- Dates taken directly from patch-file modified time: 45
- Dates using release-archive modified time because the patch carried a ZIP epoch timestamp: 2 (`lost-in-blue-2`, `monster-hunter-stories`)
- Clean-source roundtrip with expected output hash matched: 29
- Owner-reported xdelta-patcher tests: 13
- Browser apply-only test without a pinned target hash: 1
- No current roundtrip evidence recorded in the web manifest: 5

### Cloudflare R2 CDN Migration

All 45 xdelta patches (including multi-part archives for Inazuma 1-2-3, Ace Attorney Trilogy, Metal Max 4, and E.X. Troopers) are hosted in Cloudflare R2 bucket `talub-patches` and distributed through the Worker CDN (`https://talub-game-thai-cdn.talub-game-thai-cdn.workers.dev/patches/...`). All objects support CORS (`access-control-allow-origin: https://haasbeat.github.io`), HTTP Range requests (206 Partial Content), ETag verification, and immutable caching. The GitHub Pages repository no longer stores large binary patches, resolving GitHub repository footprint limits.

### Nintendo Switch external downloads

The Switch catalog does not run xdelta in the browser. Each game opens a verified release archive supplied by the project owner, and the website does not host or distribute the original game.

- `fire-emblem-three-houses` — `FE16_Thai_v1.3.6_Mod.zip`, 316,728,585 bytes, remote modified date 2026-11-08
- `fire-emblem-engage` — `FE17_Thai_v2.0.6_All_In_One.zip`, 97,534,117 bytes, remote modified date 2026-11-08
- `disgaea-5-complete` — `Disgaea_5_Complete_v1.0.1_Mod.zip`, 970,542,683 bytes, remote modified date 2026-11-06
- `persona-5-royal` — `P5R_Switch_Thai_v1.0.5_Mod.zip`, 148,516,197 bytes, remote modified date 2026-11-08
- `village-in-the-shade` — `Village_in_the_Shade_Thai_v1.0.0_Mod.zip`, 8,334,151 bytes, remote modified date 2026-11-01

Remote metadata was checked for filename, size, and modified time. Archive SHA-256 values come from the verified release records and are displayed on each game page so users can check the downloaded file independently.

An identity check proves that a web patch asset matches its manifest. It does not by itself prove that the patch reconstructs the expected ROM. A roundtrip is considered verified only when the patch is applied to the pinned clean source and the reconstructed output matches the expected size and SHA-256.

## Time Travelers (Japan)

The `v1.0.2` web patch targets the 2 GiB decrypted Japanese cartridge image (`CTR-P-ATRJ`). Released as `v1.0.2` official with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real Nintendo 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), built cleanly from the pinned original Japanese cartridge dump, and featuring 100% complete story across all 6 character routes and climax timeline.

- Accepted source: `Time Travelers (Japan).3ds`, 2,147,483,648 bytes
- Source SHA-256: `ce9781388f3e5ac2bf41426afe5aee93a171760b10b898939851d998d9538cd7`
- Patch SHA-256: `c3e897866c4c47719305bcc535a9e7c7133abf9fa302f2a49b8086126a98ac42`
- Expected output SHA-256: `3abc60e63be2188fe1d23165a29a9faa74482ef4b1007785e17bbdf7d0dd7ebd`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`); direct In-ROM binary census verified across 12,314/12,578 records (97.9% In-ROM binary census / 100% translatable text, 0 critical freeze).

## Professor Layton and the Miracle Mask

The `v1.3.3` web patch targets the 1 GiB decrypted USA cartridge image (`CTR-P-AKKE`, Title ID `00040000000A8500`). Released as `v1.3.3` official with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), expanding Master Font CMAP to 2,819 Thai syllables, and passing all 5 forensic audit pillars across 12,992 dialogue/puzzle records (100.00%).

- Accepted source: `Professor Layton and the Miracle Mask (USA).3ds`, 1,073,741,824 bytes
- Source SHA-256: `ebc2d5480c1be7373a029f7f740d86cd398df6b75fae4bd2b366cd2abe71ba52`
- Patch SHA-256: `437b4b2d812bc70e0ba5e0b309916acb9f14ccb694ecdd65a6ec359ac5a4c147`
- Expected output SHA-256: `b2d780e7b100dcaa40525a0ac11756871002cdc3e70d6b62bdb02e1186f68327`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, PASS=True`); CIA conversion verified; release guard passed (`artifact_roundtrip_verified`).

## Dragon Quest VIII: Journey of the Cursed King

The `v1.5.0` web patch targets the 4 GiB decrypted USA cartridge image (`CTR-P-BQ8E`). Released as `v1.5.0` official with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), standardizing all magic spells/skills to canonical Japanese Katakana transliteration across 581 files, and applying pixel-accurate Thai typography wrapping (`FontDefault_13.bffnt`) with zero box overflow (`critical=0, width_warnings=0`) across 39,141 pages.

- Accepted source: `Dragon Quest VIII - Journey of the Cursed King (USA).3ds`, 4,294,967,296 bytes
- Source SHA-256: `589ab3eedfb872136a99c23407c9dff45cd9ce1d31ed24c5ecb196fa8657c4fc`
- Patch SHA-256: `11936bac4307e293256f8cc4d75f41aa13e69ce818c2ef0de0c96ac5cb170e07`
- Expected output SHA-256: `6c7e6c052a2991b9746a54d896f05901b6369a5d85e632d104fb2bc6aef4d633`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, PASS=True`); release guard passed (`artifact_roundtrip_verified`).

## Dragon Ball Fusions

The `v1.0.7` web patch targets the 1 GiB decrypted USA cartridge image (`CTR-P-BDLE`). Released as `v1.0.7` official with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), enforcing standard "Skill Names in English, Descriptions in Thai" (619 skills), eradicating battle UI `????` callouts, and providing flawless CIA package conversion.

- Accepted source: `Dragon Ball Fusions (USA).3ds`, 1,073,741,824 bytes
- Source SHA-256: `3b0fdf5d9062732dbae97ab71c346bd76c77a0ed4d56c68783f18d3c5a7a532d`
- Patch SHA-256: `6fba336acc277bc9ced03bc60a2bf7825ea48759936d8081fe9a2b11420c0d67`
- Expected output SHA-256: `23989b1e0a65d13e5d007fab368d8e301343c1c16ae2648982340d0aced0c40c`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, PASS=True`).

## Ever Oasis

The web patch targets the full 1 GiB USA cartridge image (`BEGE`). Released as `v1.0.3` official with full RomFS IVFC hash tree recalculation (preventing real-hardware ErrDisp panic 0xf96047a2 in `nn::fs::MountRom`), authentic Mali Bold typography, and 100% complete story/quest dialogue.

- Accepted source: `Ever Oasis (USA) (En,Fr,Es).3ds`, 1,073,741,824 bytes
- Source SHA-256: `704a090ff6546a37397a85b2388bff4a98beceb469304d0a68ef83593ac98fdf`
- Patch SHA-256: `45b170865562a469e7ec63a675b0968d402202cbc73f4926ca7f5dc30ecc7561`
- Expected output SHA-256: `93ffb07d75e9245fae59b29f71047f6c54ca2099db7226d0141eb837df3ba15b`
- Verification: browser xdelta3 wasm roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified with `tools/ncch_ivfc_rebuild.py` (L1_bad=0, L2_bad=0, L3_bad=0, PASS=True).

## Front Mission 2089

`Front Mission 2089: Border of Madness` is now published as `v1.1.1` for game code `YFLJ`.

- Patch date: 2026-10-31
- Clean source SHA-256: `f4d6bdda171ac33b065162a5b3028252ab78b32d9926e7154de0b96564ff4ed9`
- Patch SHA-256: `b37193a35e1c3001af5beddeb94ab50771867374816c6c2ffa2879d2010878de`
- Reconstructed output SHA-256: `11d9bdf7cc54a35e6f719c1b0f93cd3785c735ea84242c67932e970be8193e1b`
- Verification: distributed xdelta reconstructed the pinned v1.1.1 target byte-for-byte

## Yo-kai Watch

The web patch targets the full 1 GiB USA cartridge image (`AYWE`). Released as `v2.8.2` official with crisp 13pt Bravely Default typography, in-game VER. 2.8.2 watermark, and full RomFS IVFC hash tree recalculation (preventing real-hardware ErrDisp panic 0xf96047a2 in `nn::fs::MountRom`).

- Accepted source: `Yo-Kai Watch (USA).3ds`, 1,073,741,824 bytes
- Source SHA-256: `933c8b7e1d37b87e69b7c7aa97636296e9cb788972077a189f5dd2dc489465a5`
- Patch SHA-256: `8d08f1a92600d508d09d843cc8d76d797bb15ccbdcb439d655c0110cd6190c29`
- Expected output SHA-256: `9f58e941b0f32117f30169be176e26eb99292990767b9f272e2a824ef9d37cb1`
- Verification: browser xdelta3 wasm roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified with `tools/ncch_ivfc_rebuild.py` (L1_bad=0, L2_bad=0, L3_bad=0, PASS=True).

## Yo-kai Watch 3

The web patch targets the full 4 GiB USA cartridge image (`BY3E`). Released as `v1.0.5` official with complete Thai story & 96 battle tutorials, crisp 3-tier Pango typography (Mali SemiBold 12px), in-game watermarks, and full RomFS IVFC hash tree recalculation (preventing real-hardware ErrDisp panic 0xf96047a2 in `nn::fs::MountRom`).

- Accepted source: `Yo-Kai Watch 3 (USA).3ds`, 4,294,967,296 bytes
- Source SHA-256: `a82ebb005202ac8d427a008191fb341edb306896a312c20fea9bfb7e9d5c6151`
- Patch SHA-256: `09573ed8108ed103e2605173fba4e53e606700a4a4e322306db01a4a9a138948`
- Expected output SHA-256: `9fa608b8671d2d614aed115a5c21ff4d6b8d7e536cc3c302b0f9d6597937dfee`
- Verification: browser xdelta3 wasm roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified with `tools/ncch_ivfc_rebuild.py` (L1_bad=0, L2_bad=0, L3_bad=0, PASS=True).

## Yo-kai Watch 3

The web patch targets the full 4 GiB USA cartridge image (`BY3E`). Released as `v1.0.5` official with complete Thai story & 96 battle tutorials, crisp 3-tier Pango typography (Mali SemiBold 12px), in-game watermarks, and full RomFS IVFC hash tree recalculation (preventing real-hardware ErrDisp panic 0xf96047a2 in `nn::fs::MountRom`).

- Accepted source: `Yo-Kai Watch 3 (USA).3ds`, 4,294,967,296 bytes
- Source SHA-256: `a82ebb005202ac8d427a008191fb341edb306896a312c20fea9bfb7e9d5c6151`
- Patch SHA-256: `09573ed8108ed103e2605173fba4e53e606700a4a4e322306db01a4a9a138948`
- Expected output SHA-256: `9fa608b8671d2d614aed115a5c21ff4d6b8d7e536cc3c302b0f9d6597937dfee`
- Verification: browser xdelta3 wasm roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified with `tools/ncch_ivfc_rebuild.py` (L1_bad=0, L2_bad=0, L3_bad=0, PASS=True).

## Phoenix Wright: Ace Attorney Trilogy

The web patch targets the full 536,870,912-byte USA eShop image. The previous 384,315,392-byte decrypted profile was the wrong source profile for the ROM distributed by the project owner.

- Accepted source: `Phoenix Wright - Ace Attorney Trilogy (USA) (eShop).3ds`, 536,870,912 bytes
- Source SHA-256: `1690da8414e468debfc96118833d3752f44f5331acd5c7ef0406af17d3c631d1`
- Patch SHA-256: `f0242103d34db42ae95b6e81630cc2b3c65946709d20b227873390073deac6a8`
- Expected output SHA-256: `ba2ea48fae81cf129b26a6e920ccdca30bce0c57c27cd9868f7bcc9617cee7d2`
- Verification: the exact distributed eShop xdelta reconstructed the release target byte-for-byte from the pinned clean source with xdelta3. The 356,781,961-byte patch is stored in Cloudflare R2 as four versioned parts, served through the project Worker with CORS and Range support, and reassembled in the browser before its full SHA-256 is checked.

## E.X. Troopers

The `v1.0.3` web patch targets the 4 GiB decrypted Japanese cartridge image (`CTR-P-ALTJ`).

- Accepted source SHA-256: `68e745cdb6f5282cd3ea7ca69098c13ed088febb876f99bde23c6ccbf7678238`
- Patch SHA-256: `49f9089060fb13be58289b6e91d134516ec6c31c41adda81589ce60c50328345`
- Expected output SHA-256: `6ad1f1208d989b9fd0898a9938136b920b017ffc13610ccfaf911ff0f76ec222`
- Verification: the 313,916,859-byte patch is stored in R2 as four versioned parts; all parts passed Worker CORS and byte-range checks. Tested end-to-end on the live site in Google Chrome: browser fetched all 4 parts from R2, assembled the patch Blob, executed xdelta3 WebAssembly in worker (13s), and confirmed the reconstructed 4 GiB ROM matches expected target byte-for-byte (122.1s total).

## Metal Max 4: Gekkou no Diva

The `v1.3.5` web patch targets the 1 GiB decrypted Japanese cartridge image (`CTR-P-AX4J`). Released as `v1.3.5` official completely recalculating RomFS IVFC Hash Tree (Level 3 -> Level 2 -> Level 1 -> Master Hash) via `tools/ncch_ivfc_rebuild.py` (L1_bad=0, L2_bad=0, L3_bad=0, PASS 100%), eliminating real 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), fixing NCCH ExHeader (`0x160`), ExeFS Superblock (`0x1C0`), and RomFS Superblock (`0x1E0`) hash alignments required for flawless CIA package conversion via `makerom` / `3DS CIA Patcher` (`Content 0 Is Corrupt res = -12` resolved), and full 4-tier watermark parity (Tier 1 Title/Header, Tier 2 Memory Center, Tier 3 .rodata & code.ips, Tier 4 Manual).

- Accepted source SHA-256: `c815bff9d8a41bde58bd98a08c698ea0d7a573c06a59c0d8af1144b8ad5b697f`
- Patch SHA-256: `984e99461e3a29b85260e7c02892e4bc6ec3847a982df344110d4cd94dc4ff76`
- Expected output SHA-256: `f8e9906d90216f4464612a26d22e38cd25a36ab8b6e9a9bc245a38a3bf09c646`
- Verification: the 148,318,863-byte patch is stored in R2 as two versioned parts; all parts passed Worker CORS and byte-range checks. Tested end-to-end: clean-source roundtrip verified 100% bit-identical, IVFC hash tree verified (`PASS=True`), and CIA conversion via `tools/makerom/makerom -f cia -ignoresign` verified with returncode 0 without corruption errors.

## Mana Khemia: Alchemists of Al-Revis

The web patch targets the full 2.8 GB PlayStation 2 DVD-ROM USA image (`SLUS-21735`). Released as `v1.0.0` official with 100% complete story, character quests, courses, alchemy recipes, and battle UI, featuring crisp Yo-kai Watch 1 3-Tier Pango typography (Chakra Petch SemiBold 24px/19px) and in-stream localized prologue movies (`MOVIE/AVAN.SFD` and `AVANJ.SFD`).

- Accepted source: `Mana Khemia - Alchemists of Al-Revis (USA).iso`, 2,801,958,912 bytes
- Source SHA-256: `26d7d83a358e9135b9217a456f97d77e7a5d1cc06f49bf8ee705f241e18216f0`
- Patch SHA-256: `5e97e7325841f4fe9f6d188783b2820b09f85f144c02727f08ce868cdc54a9bb`
- Expected output SHA-256: `47e9f510ef975ce52d1502c1619a80dffd6fe9a650b9d31a8d80bd75ebb12e50`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; 12-Pillar Live In-ROM Binary & Linguistic Forensic Audit passed (22,404/22,404 records verified, 0 critical freeze).

## Dragon Quest Monsters: Joker 3 Professional

The `v1.0.6` web patch targets the 2 GiB decrypted Japanese cartridge image (`CTR-P-BDQJ`). This release recalculates the full RomFS IVFC hash tree (Level 3 -> Level 2 -> Level 1 -> Master Hash) and NCCH RomFS Superblock SHA-256 in-place, eliminating the real Nintendo 3DS hardware ErrDisp `0xf96047a2` / `0xD9004587` crash on `nn::fs::MountRom` / `GetRomRequiredMemorySize`. Furthermore, `v1.0.6` drops overwritten auxiliary partitions in the NCSD partition table, resolving the FBI installation crash `0xD8E08025` (`Result code: 0xD8E08025 / Level: Permanent (27) / Summary: Invalid argument (7) / Module: AM (32) / Desc: Invalid NCCH (37)`) when converting the `.3ds` to `.cia` using GodMode9.

- Accepted source: `Dragon Quest Monsters - Joker 3 Professional (Japan).3ds`, 2,147,483,648 bytes
- Source SHA-256: `e3e70991c268571d1f4558a4fbc14e72d6ba047a89f98511fb47db0b559cddbb`
- Patch SHA-256: `ccae77105f74491d352d249f49ddd27944b04ddbfd816fc9d657fb7950267986`
- Expected output SHA-256: `43f64bad09332105356cdf1aaa053dd40dc50c0d04a7ab3b88da69c6156d11f9`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical match; physical 3DS hardware IVFC hash tree and NCSD partition audit passed (`tools/ncch_ivfc_rebuild.py --check --full`: `L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`). In-ROM binary audit passed with 18,439/20,479 entries (90.04% In-ROM, 100% of real translatable text, 0 Kana, 0 dummies).

## Tales of the Abyss (USA)

The `v1.0.1` web patch targets the 2 GiB decrypted USA cartridge image (`CTR-P-AABE`). Released as `v1.0.1` official with 100% complete story, all 518 skits (5,591 dialogues), sidequests, battle tutorials, menu databases, Luke's Diary synopsis arena, and crisp 2x .moflex cutscene subtitles across 46 cues. Features the Tales of Hearts Regular font with seamless 3-tier vertical mark stacking, Partition 0 ExHeader BSS expansion (`0x000AABA8`, 250 pages RW) resolving the physical 3DS ARM11 MMU Data Abort (`Translation - Page`) crash on real hardware, and recalculated IVFC RomFS Hash Tree preventing ErrDisp 0xf96047a2 freezes on .3ds and .cia.

- Accepted source: `Tales of the Abyss (USA) (decrypted).3ds`, 2,147,483,648 bytes
- Source SHA-256: `b5d96e539bd9d4504e53b5f0d4f1c67c6a2d67928e9602ac87d9fd60cf90a807`
- Patch SHA-256: `5fd878620e4181d0a294b0e632779fbaec4d0cf8dc7379a00520bc6d252ddc99`
- Expected output SHA-256: `078e36a7e269242c48c43cc2e157ee7448a7a3d07b292fe5480567c5579d4a05`
- Verification: WebAssembly xdelta3 engine roundtrip verified in Node (`tools/web_wasm_patch.mjs`: `ok=true`, `078e36a7...` matched byte-for-byte); physical 3DS hardware MMU BSS mapping fix verified (`0x000AABA8`, 250 pages RW `0x004CF000 .. 0x005C9000`); physical 3DS hardware IVFC hash tree audit passed (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True`). In-ROM binary census passed with 32,510/32,510 entries (100.00% In-ROM, 0 mismatches, 0 critical freeze).

## SaGa Frontier (USA)

The web patch targets the full 722 MB PlayStation 1 Mode 2 Form 1 CD-ROM image (`SCUS-94230`). Released as `v1.0.0` official with 100% complete story across all 7 protagonists (Blue, Red, Asellus, Lute, Emelia, Riki, T260G), system menus, items, skills, monster absorbs, battle UI, and boss dialogues. Features proportional monoline Thai typography with 20 recycled single-byte glyph slots, true combining tone mark clusters (including custom-inked `ง้` glyph without spacing drift), and compact 1px monoline punctuation (`!`, `?`).

- Accepted source: `SaGa Frontier (USA).bin`, 722,635,536 bytes
- Source SHA-256: `0c69e1fba5901ad87a5cfc8dd9121bb73c313a1bf877aa554d9b20e6b96a3eb9`
- Patch SHA-256: `956b6eb9cec093642ba260383941458458c3188bfb01d9d5bf62dcbeec262f80`
- Expected output SHA-256: `a8f261d3af1c854c14c9236264d4feca50d28f9065ea83e8a599876f68f3ec84`
- Verification: WebAssembly xdelta3 engine roundtrip verified in Node (`tools/web_wasm_patch.mjs`: `ok=true`, `a8f261d3...` matched byte-for-byte in 1.4s); In-ROM binary census passed with 9,400/9,400 records (100.00% In-ROM, 0 mismatches, 0 critical freeze); 25,480 Mode 2 Form 1 sectors EDC/ECC verified.

## Theatrhythm Dragon Quest

The `v1.2.2` web patch targets the full 1 GiB decrypted Japanese cartridge image (`CTR-P-BTQJ`, CRC32 `5931AD10`).

- Accepted source: `Theatrhythm Dragon Quest (Japan).3ds`, 1,073,741,824 bytes
- Source SHA-256: `737962938f78a67a4d158696dcfe696d6615917a911551a754935c59b37858cb`
- Patch SHA-256: `d834037d494b331b9cd5224890ae74a779745a52d18f59181ef909e479f518b5`
- Expected output SHA-256: `d464e6d6bbcd576c6011354a6024827d9c5b179e167e4d4ab083add7bfc0441f`
- Verification: clean source roundtrip tested 100% bit-identical with xdelta3; direct container readback verified across 6,132 records (100.00% In-ROM binary census, 0 mismatches, 0 critical freeze).

## Rune Factory 4

The `v1.0.5` web patch targets the untrimmed 2.00 GB decrypted USA cartridge dump (`CTR-P-AR4E`). Released as `v1.0.5` official with full RomFS IVFC hash tree recalculation (preventing real-hardware ErrDisp panic `0xf96047a2` in `nn::fs::MountRom`), isolated 256-byte AAPCS stack frame in the ARMv6K font hook (preventing real-hardware `Prefetch abort` at `PC=0x00000190`), and 100% complete story/farming/town dialogue.

- Accepted source: `Rune Factory 4 (USA).3ds`, 2,147,483,648 bytes
- Source SHA-256: `2cdb5d995d30c573662d0d31e24619bf5c8cb1e99983d7046c6f71127bdcd029`
- Patch SHA-256: `685f654ee861af2f7470de5cd6398e63441476bdcd47b598e8c158a2be833704`
- Expected output SHA-256: `11b5e81df73848c7335302a89eb7b7d85b079acfe743a36732830090598d52df`
- Verification: clean-source roundtrip tested 100% bit-identical with xdelta3; RomFS IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, PASS=True`); direct In-ROM binary readback verified across 99,755/107,220 records (93.04% In-ROM binary census / 100% translatable text, 0 tag errors, 0 critical freeze).

## Evidence tiers

The 28 output-matched entries combine 22 browser xdelta3 WASM roundtrips, 6 clean-source bit-identical/CLI roundtrips. The PoPoLoCrois web xdelta was applied successfully to its pinned USA ISO with the xdelta3 CLI; its measured output SHA-256 is used because the historical v1.10 guide's MD5/SHA1 describe a different target artifact. The 13 owner-reported entries retain that label and are not silently promoted to browser-roundtrip evidence. The five entries without current verification metadata are `dragon-quest-iv`, `dragon-quest-v`, `dragon-quest-vi`, `tales-of-hearts`, and `the-world-ends-with-you`.

Large 3DS outputs may still need a disk-streaming output path before browser patching can be considered reliable on devices with limited memory.
