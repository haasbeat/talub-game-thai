# Web patch audit

Updated: 2026-11-07 (Asia/Bangkok)

## Inventory

- Web manifests: 49 (44 xdelta + 5 external Nintendo Switch mod archives)
- Cloudflare R2 storage: 44/44 xdelta patch targets hosted on R2 bucket `talub-patches` and served via CDN Worker
- Patch identity checks passed (file size + SHA-256): 44/44
- Patch dates recorded: 49/49
- Dates taken directly from patch-file modified time: 42
- Dates using release-archive modified time because the patch carried a ZIP epoch timestamp: 2 (`lost-in-blue-2`, `monster-hunter-stories`)
- Clean-source roundtrip with expected output hash matched: 25
- Owner-reported xdelta-patcher tests: 13
- Browser apply-only test without a pinned target hash: 1
- No current roundtrip evidence recorded in the web manifest: 5

### Cloudflare R2 CDN Migration

All 44 xdelta patches (including multi-part archives for Inazuma 1-2-3, Ace Attorney Trilogy, Metal Max 4, and E.X. Troopers) are hosted in Cloudflare R2 bucket `talub-patches` and distributed through the Worker CDN (`https://talub-game-thai-cdn.talub-game-thai-cdn.workers.dev/patches/...`). All objects support CORS (`access-control-allow-origin: https://haasbeat.github.io`), HTTP Range requests (206 Partial Content), ETag verification, and immutable caching. The GitHub Pages repository no longer stores large binary patches, resolving GitHub repository footprint limits.

### Nintendo Switch external downloads

The Switch catalog does not run xdelta in the browser. Each game opens a verified release archive supplied by the project owner, and the website does not host or distribute the original game.

- `fire-emblem-three-houses` — `FE16_Thai_v1.3.5_Mod.zip`, 316,823,839 bytes, remote modified date 2026-11-07
- `fire-emblem-engage` — `FE17_Thai_v2.0.5_All_In_One.zip`, 97,584,355 bytes, remote modified date 2026-10-24
- `disgaea-5-complete` — `Disgaea_5_Complete_v1.0.1_Mod.zip`, 970,542,683 bytes, remote modified date 2026-11-06
- `persona-5-royal` — `P5R_Switch_Thai_v1.0.4_Mod.zip`, 148,425,863 bytes, remote modified date 2026-11-06
- `village-in-the-shade` — `Village_in_the_Shade_Thai_v1.0.0_Mod.zip`, 8,334,151 bytes, remote modified date 2026-11-01

Remote metadata was checked for filename, size, and modified time. Archive SHA-256 values come from the verified release records and are displayed on each game page so users can check the downloaded file independently.

An identity check proves that a web patch asset matches its manifest. It does not by itself prove that the patch reconstructs the expected ROM. A roundtrip is considered verified only when the patch is applied to the pinned clean source and the reconstructed output matches the expected size and SHA-256.

## Front Mission 2089

`Front Mission 2089: Border of Madness` is now published as `v1.1.1` for game code `YFLJ`.

- Patch date: 2026-10-31
- Clean source SHA-256: `f4d6bdda171ac33b065162a5b3028252ab78b32d9926e7154de0b96564ff4ed9`
- Patch SHA-256: `b37193a35e1c3001af5beddeb94ab50771867374816c6c2ffa2879d2010878de`
- Reconstructed output SHA-256: `11d9bdf7cc54a35e6f719c1b0f93cd3785c735ea84242c67932e970be8193e1b`
- Verification: distributed xdelta reconstructed the pinned v1.1.1 target byte-for-byte

## Yo-kai Watch

The web patch targets the full 1 GiB USA cartridge image (`AYWE`). Released as `v2.8.1` official with crisp 13pt Bravely Default typography, in-game VER. 2.8.1 watermark, and full RomFS IVFC hash tree recalculation (preventing real-hardware ErrDisp panic 0xf96047a2 in `nn::fs::MountRom`).

- Accepted source: `Yo-Kai Watch (USA).3ds`, 1,073,741,824 bytes
- Source SHA-256: `933c8b7e1d37b87e69b7c7aa97636296e9cb788972077a189f5dd2dc489465a5`
- Patch SHA-256: `2bfb6c9efebac7b8d53981b0e7895c961b9946535ba0bf58dcd93bb43dccc1f5`
- Expected output SHA-256: `055f038a4d6245208480f72da20c5e12f06e872dd676ebf30885a290a765b94a`
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

The `v1.3.3` web patch targets the 1 GiB decrypted Japanese cartridge image (`CTR-P-AX4J`).

- Accepted source SHA-256: `c815bff9d8a41bde58bd98a08c698ea0d7a573c06a59c0d8af1144b8ad5b697f`
- Patch SHA-256: `b77ef5b03ba91eea6f5206d7456cce73828a87078faba4a9745cd50b08b650a0`
- Expected output SHA-256: `fb3716a8d6549f0acba7ddc77d0523ab78ea28cbe87ee788d2e3e5c81095d81e`
- Verification: the 142,484,554-byte patch is stored in R2 as two versioned parts; all parts passed Worker CORS and byte-range checks. Tested end-to-end on the live site in Google Chrome: browser fetched both parts from R2, assembled the patch Blob, executed xdelta3 WebAssembly in worker (6s), and confirmed the reconstructed 1 GiB ROM matches expected target byte-for-byte (39.5s total).

## Evidence tiers

The 25 output-matched entries combine 20 browser xdelta3 WASM roundtrips, 5 clean-source bit-identical/CLI roundtrips. The PoPoLoCrois web xdelta was applied successfully to its pinned USA ISO with the xdelta3 CLI; its measured output SHA-256 is used because the historical v1.10 guide's MD5/SHA1 describe a different target artifact. The 13 owner-reported entries retain that label and are not silently promoted to browser-roundtrip evidence. The apply-only entry is `dqm-joker-3-professional`; it has no pinned release-target hash to compare. The five entries without current verification metadata are `dragon-quest-iv`, `dragon-quest-v`, `dragon-quest-vi`, `tales-of-hearts`, and `the-world-ends-with-you`.

Large 3DS outputs may still need a disk-streaming output path before browser patching can be considered reliable on devices with limited memory.
