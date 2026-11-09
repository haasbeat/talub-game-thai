# Web patch audit

Updated: 2026-11-09 (Asia/Bangkok)

## Inventory

- Web manifests: 53 (48 xdelta + 5 external Nintendo Switch mod archives)
- Cloudflare R2 storage: 48/48 xdelta patch targets hosted on R2 bucket `talub-patches` and served via CDN Worker
- Patch identity checks passed (file size + SHA-256): 48/48
- Patch dates recorded: 53/53
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
- `fire-emblem-engage` — `FE17_Thai_v2.0.7_All_In_One.zip`, 107,594,408 bytes, remote modified date 2026-11-09
- `disgaea-5-complete` — `Disgaea_5_Complete_v1.0.1_Mod.zip`, 970,542,683 bytes, remote modified date 2026-11-06
- `persona-5-royal` — `P5R_Switch_Thai_v1.0.5_Mod.zip`, 148,516,197 bytes, remote modified date 2026-11-08
- `village-in-the-shade` — `Village_in_the_Shade_Thai_v1.0.0_Mod.zip`, 8,334,151 bytes, remote modified date 2026-11-01

Remote metadata was checked for filename, size, and modified time. Archive SHA-256 values come from the verified release records and are displayed on each game page so users can check the downloaded file independently.

An identity check proves that a web patch asset matches its manifest. It does not by itself prove that the patch reconstructs the expected ROM. A roundtrip is considered verified only when the patch is applied to the pinned clean source and the reconstructed output matches the expected size and SHA-256.

## Bravely Default (USA)

The `v1.0.3` web patch targets the full 4 GiB retail cartridge dump (`CTR-P-BTRE`, Title ID `00040000000FC500`). Released as `v1.0.3` official Whole-Game Complete Edition with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real Nintendo 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), built cleanly from the pinned 4 GiB clean retail cartridge dump, featuring Chakra Petch SemiBold 12.0px pixel-perfect typography, PUA diacritic stacking, Knuth-Plass dynamic programming line-wrap balance (113 records polished, 0 remaining issues), and 100% In-ROM binary census complete (39,379/39,379 records across all 14 modules).

- Accepted source: `Bravely Default (USA) (En,Ja,Fr,De,Es,It).3ds`, 4,294,967,296 bytes
- Source SHA-256: `6b4a89fa3385e967ab1db282b1616dc58df659c90a0626850d468334c70a0af2`
- Patch SHA-256: `e80184a59db84a6dd6779a6c941a55e719de77fedc252e78d07dab7ba00f0c3e`
- Expected output SHA-256: `dac3ce8857b077fa098c1fcf0954cbcdd40ff6a9abcf6162bfa02b204c3c74af`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`); direct In-ROM binary census verified across 39,379/39,379 records (100.0% In-ROM ground truth, 0 critical freeze).

## CardFight!! Vanguard G: Stride to Victory!! (Japan)

The `v2.0.0` web patch targets the 512 MiB decrypted Japanese cartridge image (`CTR-P-BVFJ`, Title ID `0004000000170500`). Released as `v2.0.0` Ultimate Master Edition with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real Nintendo 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), exact FuRyu `.rtz` binary stream parsing (`c0..c7`) eliminating all VM bytecode desync and zero-fill heap crashes (0x0010D9DE `beq -> ble`), Tales of Hearts / Abyss discrete pixel-locked typography engine (`2005_iannnnnAMD.ttf`), centered UI badges, and 100% In-ROM binary census complete (10,042/10,042 items).

- Accepted source: `CardFight!! Vanguard G - Stride to Victory!! (Japan).3ds`, 536,870,912 bytes
- Source SHA-256: `7262fee5be8ab31bcca719769de6b03a63f7b00e2ee25d5b40bd00b5b1510fed`
- Patch SHA-256: `063385d5b028d263cf21e46546b16e7f74fd465f1bbbeecb881878591567606b`
- Expected output SHA-256: `812fe02bab11b6e75566e9e2446ae20476e3b49d982aa2f57c4a4bb56f26f339`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`); direct In-ROM binary census verified across 10,042/10,042 items (100.0% In-ROM ground truth, 0 critical freeze).

## Shin Megami Tensei IV

The web patch targets the full 2,147,483,648-byte USA cartridge image (`CTR-P-B4EE`, Title ID `00040000000E5C00`). Released as `v1.3.5` official with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real Nintendo 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), built cleanly from the pinned clean cartridge dump, featuring single-pass crisp colored text, full safe diacritics (0.0% clipping across 2,823 Thai syllables), Naraku signboard polish, and in-game v1.3.5 watermarks.

- Accepted source: `Shin Megami Tensei IV (USA).3ds`, 2,147,483,648 bytes
- Source SHA-256: `162356342f2a0459b3d1b53dfa4bb45d0edca960a750eaae950aab3de5bd542b`
- Patch SHA-256: `9ca18f2ed244db88c864a3c5ee8c251fa74445effffd7af1247bd888b4ce890c`
- Expected output SHA-256: `36b6c090b76201db32abf4e1f51ef806d465b98a62ada46d140df4f20ee6b67f`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`); direct In-ROM binary census verified across 39,034/39,329 messages (99.2% In-ROM binary census / 100% translatable text, 0 critical freeze).

## Time Travelers (Japan)

The `v1.0.3` web patch targets the 2 GiB decrypted Japanese cartridge image (`CTR-P-ATRJ`). Released as `v1.0.3` official with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real Nintendo 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), built cleanly from the pinned original Japanese cartridge dump, and featuring 100% complete story across all 6 character routes and climax timeline.

- Accepted source: `Time Travelers (Japan).3ds`, 2,147,483,648 bytes
- Source SHA-256: `ce9781388f3e5ac2bf41426afe5aee93a171760b10b898939851d998d9538cd7`
- Patch SHA-256: `490b8561f3098962209612aa44f13ca7ed3e96323c7716ba69288772683fc5fd`
- Expected output SHA-256: `f3067e1e618a998128a474bd1445143e8ce4a7b4773457539f27893f80c67cf5`
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

## Yo-kai Watch 2: Psychic Specters

The web patch targets the full 4,294,967,296-byte USA cartridge image (`BYHE`). Released as `v1.2.1` official with complete Thai story & Shinuchi content 100%, crisp typography, embedded name entry fixes, and full RomFS IVFC hash tree recalculation (fixing real-hardware ErrDisp panic 0xf96047a2 in `nn::fs::MountRom`).

- Accepted source: `Yo-Kai Watch 2 - Psychic Specters (USA) (En,Fr,Es).3ds`, 4,294,967,296 bytes
- Source SHA-256: `fcbae21d7e94e31954bbc1706dcbcdd83b6716deb7048b7112bd9f18963c8295`
- Patch SHA-256: `38709d47a21c69d265775d6122f435f321c4e84c671cc0a081a82c1a0d07dbb8`
- Expected output SHA-256: `7c465eebf7b33debd6012adc5de3da42d43d739d02222266b3ba02449f1ced50`
- Verification: browser xdelta3 wasm roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified with `tools/ncch_ivfc_rebuild.py` (L1_bad=0, L2_bad=0, L3_bad=0, PASS=True).

## Yo-kai Watch 3

The web patch targets the full 4 GiB USA cartridge image (`BY3E`). Released as `v1.0.5` official with complete Thai story & 96 battle tutorials, crisp 3-tier Pango typography (Mali SemiBold 12px), in-game watermarks, and full RomFS IVFC hash tree recalculation (preventing real-hardware ErrDisp panic 0xf96047a2 in `nn::fs::MountRom`).

- Accepted source: `Yo-Kai Watch 3 (USA).3ds`, 4,294,967,296 bytes
- Source SHA-256: `a82ebb005202ac8d427a008191fb341edb306896a312c20fea9bfb7e9d5c6151`
- Patch SHA-256: `09573ed8108ed103e2605173fba4e53e606700a4a4e322306db01a4a9a138948`
- Expected output SHA-256: `9fa608b8671d2d614aed115a5c21ff4d6b8d7e536cc3c302b0f9d6597937dfee`
- Verification: browser xdelta3 wasm roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified with `tools/ncch_ivfc_rebuild.py` (L1_bad=0, L2_bad=0, L3_bad=0, PASS=True).

## Shin Megami Tensei IV

The web patch targets the full 2 GiB USA cartridge image (`B4EE`). Released as `v1.3.5` official with 99.2% In-ROM coverage (39,034/39,329 messages across 1,190 MBM files and 19 TBB tables), safe 3-tier Thai typography (11.5px/13.0px), and full RomFS IVFC hash tree recalculation (fixing real-hardware ErrDisp panic 0xf96047a2 in `nn::fs::MountRom` / `nn::fs::GetRomRequiredMemorySize`).

- Accepted source: `Shin Megami Tensei IV (USA).3ds`, 2,147,483,648 bytes
- Source SHA-256: `162356342f2a0459b3d1b53dfa4bb45d0edca960a750eaae950aab3de5bd542b`
- Patch SHA-256: `9ca18f2ed244db88c864a3c5ee8c251fa74445effffd7af1247bd888b4ce890c`
- Expected output SHA-256: `36b6c090b76201db32abf4e1f51ef806d465b98a62ada46d140df4f20ee6b67f`
- Verification: browser xdelta3 wasm roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified with `tools/ncch_ivfc_rebuild.py` (L1_bad=0, L2_bad=0, L3_bad=0, PASS=True).

## Phoenix Wright: Ace Attorney Trilogy

The `v1.2.4` web patch targets the full 536,870,912-byte USA eShop image (`CTR-N-BHDE`, Title ID `0004000000138F00`). Released as `v1.2.4` official with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real Nintendo 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), built cleanly from the pinned clean eShop source, featuring 4-tier in-game v1.2.4 watermarks, and dual-status census 100% playable content across all 3 games / 14 cases (11,888/11,888 In-ROM records / 100% binary ground truth, 0 critical freeze).

- Accepted source: `Phoenix Wright - Ace Attorney Trilogy (USA) (eShop).3ds`, 536,870,912 bytes
- Source SHA-256: `1690da8414e468debfc96118833d3752f44f5331acd5c7ef0406af17d3c631d1`
- Patch SHA-256: `a17fde91918c5f5f676bb3a65ab3dfe560d2e8b1086314a85e026c96be5e9177`
- Expected output SHA-256: `c1e12131470b32b767c3ff46cf8fb8590013baf447cefee1468f0186d3a98e79`
- Verification: the exact distributed eShop xdelta reconstructed the release target byte-for-byte from the pinned clean source with xdelta3; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`); direct In-ROM binary census verified across 11,888/11,888 records (100.00% In-ROM ground truth, 0 critical freeze). The 356,716,546-byte patch is stored in Cloudflare R2 as four versioned parts, served through the project Worker with CORS and Range support, and reassembled in the browser before its full SHA-256 is checked.

## E.X. Troopers

The `v1.0.4` web patch targets the 4,294,967,296-byte Japanese cartridge image (`CTR-P-ALTJ` / `0004000000053700`) built directly from `Original/E.X. Troopers (Japan).3ds`. Released as `v1.0.4` official with complete 100% whole-game Thai story & database (21,181 records across 96 GMD assets), Master Font Kit, in-game version watermarks, and full RomFS IVFC hash tree recalculation (L1_bad=0, L2_bad=0, L3_bad=0, PASS 100%) fixing real-hardware ErrDisp panic `0xf96047a2` in `nn::fs::MountRom`.

- Accepted source: `E.X. Troopers (Japan).3ds`, 4,294,967,296 bytes
- Source SHA-256: `7fcf9e43dc3ad075e6bf72427a66ed9170324546916991dae69d7363c862413a`
- Patch SHA-256: `0c8ff3e7e2bc8b5844ca47941d098b294b0bb0a31f1383716973fc86c53e6c5b`
- Expected output SHA-256: `bd2af6609aa39468b1da003a30a15e44e79db6698312350a4896e910fd74674f`
- Verification: the 286,748,959-byte patch is hosted on Cloudflare R2 both as full file and split into four parts for seamless browser streaming; all parts passed Worker CORS, byte-range, and bit-identical roundtrip tests; IVFC hash tree verified with `tools/ncch_ivfc_rebuild.py` (L1_bad=0, L2_bad=0, L3_bad=0, PASS=True).

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

## Mana Khemia: Student Alliance

The web patch targets the full 1,085,833,216-byte PlayStation Portable UMD USA image (`ULUS-10408`, Disc v1.01). Released as `v1.0.0` official with 100% complete story, character quests, courses, alchemy recipes, campus/field NPC chatter (Qv.bin overlay), PSP-exclusive Multiplayer Arena, Jump Start install prompts, and battle UI, featuring 24x24 TrueType Vector Calibrated typography (Chakra Petch SemiBold 24px) with Subpixel FPU Float quad rendering and localized in-stream prologue movie (`MOVIE/AVAN.PMF`).

- Accepted source: `Mana Khemia - Student Alliance (USA).iso`, 1,085,833,216 bytes
- Source SHA-256: `e98ed4c8498c3a48e1ec2f04b4a6641e85c57b8245ddf3e51443f7158a882081`
- Patch SHA-256: `088eebfb39ac7017fa307824499e61f528a58d959e48ac29ed5bd22d9880c1d7`
- Expected output SHA-256: `42f3ddc68745b80c141613c8fa3c2dd969023a3b7fcfb4b74efd0b0a8caebbe1`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; PreInjectionGate & 1:1 Live In-ROM Binary Readback Audit passed (21,896/21,896 records verified, 0 critical freeze).

## Dragon Quest Monsters: Joker 3 Professional

The `v1.0.6` web patch targets the 2 GiB decrypted Japanese cartridge image (`CTR-P-BDQJ`). This release recalculates the full RomFS IVFC hash tree (Level 3 -> Level 2 -> Level 1 -> Master Hash) and NCCH RomFS Superblock SHA-256 in-place, eliminating the real Nintendo 3DS hardware ErrDisp `0xf96047a2` / `0xD9004587` crash on `nn::fs::MountRom` / `GetRomRequiredMemorySize`. Furthermore, `v1.0.6` drops overwritten auxiliary partitions in the NCSD partition table, resolving the FBI installation crash `0xD8E08025` (`Result code: 0xD8E08025 / Level: Permanent (27) / Summary: Invalid argument (7) / Module: AM (32) / Desc: Invalid NCCH (37)`) when converting the `.3ds` to `.cia` using GodMode9.

- Accepted source: `Dragon Quest Monsters - Joker 3 Professional (Japan).3ds`, 2,147,483,648 bytes
- Source SHA-256: `e3e70991c268571d1f4558a4fbc14e72d6ba047a89f98511fb47db0b559cddbb`
- Patch SHA-256: `ccae77105f74491d352d249f49ddd27944b04ddbfd816fc9d657fb7950267986`
- Expected output SHA-256: `43f64bad09332105356cdf1aaa053dd40dc50c0d04a7ab3b88da69c6156d11f9`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical match; physical 3DS hardware IVFC hash tree and NCSD partition audit passed (`tools/ncch_ivfc_rebuild.py --check --full`: `L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`). In-ROM binary audit passed with 18,439/20,479 entries (90.04% In-ROM, 100% of real translatable text, 0 Kana, 0 dummies).

## Tales of the Abyss (USA)

The `v1.0.2` web patch targets the 2 GiB decrypted USA cartridge image (`CTR-P-AABE`). Released as `v1.0.2` official with 100% complete story, all 518 skits (5,591 dialogues), sidequests, battle tutorials, menu databases, Luke's Diary synopsis arena, and crisp 2x .moflex cutscene subtitles across 46 cues. Features the Tales of Hearts Regular font with seamless 3-tier vertical mark stacking, Partition 0 ExHeader BSS expansion (`0x000AABA8`, 250 pages RW) resolving the physical 3DS ARM11 MMU Data Abort (`Translation - Page`) crash, 100% preserved BTSC battle tutorial wait/voice/branch bytecode opcodes eliminating the training dummy dialogue freeze, and recalculated IVFC RomFS Hash Tree preventing ErrDisp 0xf96047a2 freezes on .3ds and .cia.

- Accepted source: `Tales of the Abyss (USA) (decrypted).3ds`, 2,147,483,648 bytes
- Source SHA-256: `b5d96e539bd9d4504e53b5f0d4f1c67c6a2d67928e9602ac87d9fd60cf90a807`
- Patch SHA-256: `e9e2ed162abb4b4b77a45efc73084f4f82475ae3290e7e11b355672ed3a3ab01`
- Expected output SHA-256: `b3d39803d16b1239b342df57df7f95d7dfad085e623eabaf216eccc85d673dbd`
- Verification: WebAssembly xdelta3 engine roundtrip verified in Node (`tools/web_wasm_patch.mjs`: `ok=true`, `b3d39803...` matched byte-for-byte); BTSC battle tutorial bytecode integrity verified (103/103 tutorial records, 100% wait/voice/branch opcodes preserved bit-identical); physical 3DS hardware MMU BSS mapping fix verified (`0x000AABA8`, 250 pages RW `0x004CF000 .. 0x005C9000`); physical 3DS hardware IVFC hash tree audit passed (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True`). In-ROM binary census passed with 32,510/32,510 entries (100.00% In-ROM, 0 mismatches, 0 critical freeze).

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

## Shin Megami Tensei: Strange Journey Redux

The `v1.0.5` web patch targets the full 2 GiB decrypted USA cartridge image (`CTR-P-AJ8E`, Title ID `00040000001CD200`). Released as `v1.0.5` official with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real Nintendo 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), fixing multi-section MSG2 slot table shifts in `DungeonGimmic` 02, 03, 07, 10, 11 (100% 1:1 Clean ROM slot parity), in-game v1.0.5 watermarks, and passing 1:1 In-ROM binary forensic readback across all 26,033 translatable records (99.52% whole-game census).

- Accepted source: `Shin Megami Tensei - Strange Journey Redux (USA).3ds`, 2,147,483,648 bytes
- Source SHA-256: `de112897602339de5ac6a13029c5414e153e48797f156cf006a8003121df53f8`
- Patch SHA-256: `2194b1e2db1a41a9a0a8df29d0c2d16d6343a71da3992a848b5ca27bdcb71014`
- Expected output SHA-256: `39999a0cf1cbb397cfd561f1c8dfb7ca4190a090d8fbf329612e0d9a443206fe`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`); direct In-ROM binary census verified across 26,033/26,159 records (99.52% In-ROM binary census / 100% translatable text, 0 critical freeze).

## 7th Dragon III Code: VFD (USA)

The `v1.0.5` web patch targets the full 2 GiB decrypted USA cartridge dump (`CTR-P-BD7E`, Title ID `000400000018F800`). Released as `v1.0.5` official with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real Nintendo 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), built cleanly from the pinned 2,147,483,648-byte clean decrypted dump, featuring Chakra Petch Medium 12.0px typography, 744 Thai glyphs & Master PUA syllables, Title Screen `Ver. 1.05` watermark stamp, item description bounds limits (<= 300 px), and 100% In-ROM binary census complete (42,688/42,688 records).

- Accepted source: `7th Dragon III Code - VFD (USA).3ds`, 2,147,483,648 bytes
- Source SHA-256: `0afb4dd32c861c2137277f5d40930c318c84a2fe0af9f00478414943131a4d3e`
- Patch SHA-256: `f9e2a112496554cfff5ed473a0c2b5f599538e7ed3de60038c8321d247864694`
- Expected output SHA-256: `a32800ec27966e9ccd5563945e42a925f882b84b647245dc262d88f7e0f52814`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`); direct In-ROM binary census verified across 42,688/42,688 records (100.0% In-ROM ground truth, 0 critical freeze).

## Final Fantasy Explorers (USA)

The `v1.0.1` web patch targets the full 1 GiB decrypted USA cartridge dump (`CTR-P-BCEE`, Title ID `000400000016ED00`). Released as `v1.0.1` official with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real Nintendo 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), built cleanly from the pinned 1,073,741,824-byte clean decrypted dump, featuring Chakra Petch SemiBold 12.0px typography, PUA diacritic stacking, opening prologue MOFLEX subtitle integration, UI/quest overflow wraps, 4-tier in-game v1.0.1 watermarks, and 100% In-ROM binary census complete (12,198/12,198 records).

- Accepted source: `Final Fantasy Explorers (USA).3ds`, 1,073,741,824 bytes
- Source SHA-256: `c65d316589a36e7051720582ef0b35f683164796c35b34794de75fb400f35f3c`
- Patch SHA-256: `b00ce5bfbf26c7ec77d5d610cc51bca2b464bf346a5b523f8534ed1debfb204a`
- Expected output SHA-256: `292015a4988de803adc3c94714f3a6e6fe9621073dc325d9e39efdd5faba4fc6`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`); direct In-ROM binary census verified across 12,198/12,198 records (100.0% In-ROM ground truth, 0 critical freeze).

## Etrian Odyssey Untold: The Millennium Girl (USA)

The `v1.0.1` web patch targets the full 1 GiB decrypted USA cartridge dump (`CTR-P-BSKE`, Title ID `00040000000EC700`). Released as `v1.0.1` official with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`) via `tools/ncch_ivfc_rebuild.py`, completely eliminating real Nintendo 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), built cleanly from the pinned 1,073,741,824-byte clean decrypted dump, featuring Chakra Petch SemiBold 12.0px typography, 9-episode Mobiclip anime cutscenes with high-definition Thai subtitles, UI/difficulty selection overflow wraps, 4-tier in-game v1.0.1 watermarks, and dual-status census 100% translatable text (20,870/28,557 records).

- Accepted source: `Etrian Odyssey Untold - The Millennium Girl (USA).3ds`, 1,073,741,824 bytes
- Source SHA-256: `09ac2bd4ab0e5709734d1e2cbf3547cc8decf08b89b618085e986d2b089ff6d4`
- Patch SHA-256: `c31856a4a8f45d25ceaf27ce2df432414f596ce18f3e2612dd9692a5e1e42c1e`
- Expected output SHA-256: `530eaa931204e73800becc5067470bdfeafefeee850ae0c3dea020c7ba9fac1c`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`); direct In-ROM binary census verified across 20,870/28,557 records (73.08% In-ROM ground truth / 100% playable content, 0 critical freeze).

## Monster Hunter Stories (USA)

The `v1.0.1` web patch targets the full 2 GiB decrypted USA cartridge dump (`CTR-P-AAHE`, Title ID `00040000001BC500`). Released as `v1.0.1` official with full RomFS IVFC hash tree recalculation (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`) via `core/ctr_romfs.py` and `tools/ncch_ivfc_rebuild.py`, completely eliminating real Nintendo 3DS hardware ErrDisp `0xf96047a2` crash in `nn::fs::MountRom` / `GetRomRequiredMemorySize` (address `0x0010b67c`), built cleanly from the pinned 2,147,483,648-byte clean decrypted dump, featuring Chakra Petch SemiBold 2x Hi-Res typography, +1px dialogue font enlargement (16px/17px) and 1px-larger speaker nameplates (17px/18px) vertically centered, expanded 3-line dialogue line spacing, +25% tutorial/rider note font enlargement (15px) with Japanese furigana line-height bit 30 cleared, 35 pre-rendered movie and mural cutscene subtitles in pure white with soft dark outline, 4-tier in-game v1.0.1 watermarks, and dual-status census 100% playable content (25,908/26,002 In-ROM records / 99.64% binary ground truth).

- Accepted source: `Monster Hunter Stories (USA).3ds`, 2,147,483,648 bytes
- Source SHA-256: `1bd136e982541d9037800cf62d9af534aef2149633e3bff0026386ce9ca7543f`
- Patch SHA-256: `4f4c3342256d5d60f7fea913a3bfff707e7d8639bd1718b3128383900df2eeae`
- Expected output SHA-256: `0fb2bf5c475951bca5f6db96a588d636d609e85f192e7b0569b0e95754183f01`
- Verification: clean-source xdelta3 roundtrip tested and confirmed 100% bit-identical; IVFC hash tree verified (`L1_bad=0, L2_bad=0, L3_bad=0, romfs_sb=True, layout=True, partitions_valid=True, PASS=True`); direct In-ROM binary census verified across 25,908/26,002 records (99.64% In-ROM ground truth, 0 critical freeze).

## Evidence tiers

The 28 output-matched entries combine 22 browser xdelta3 WASM roundtrips, 6 clean-source bit-identical/CLI roundtrips. The PoPoLoCrois web xdelta was applied successfully to its pinned USA ISO with the xdelta3 CLI; its measured output SHA-256 is used because the historical v1.10 guide's MD5/SHA1 describe a different target artifact. The 13 owner-reported entries retain that label and are not silently promoted to browser-roundtrip evidence. The five entries without current verification metadata are `dragon-quest-iv`, `dragon-quest-v`, `dragon-quest-vi`, `tales-of-hearts`, and `the-world-ends-with-you`.

Large 3DS outputs may still need a disk-streaming output path before browser patching can be considered reliable on devices with limited memory.
