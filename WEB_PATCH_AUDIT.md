# Web patch audit

Updated: 2026-11-06 (Asia/Bangkok)

## Inventory

- Web manifests: 47 (42 xdelta + 5 external Nintendo Switch mod archives)
- Patch identity checks passed (file size + SHA-256): 42/42
- Patch dates recorded: 47/47
- Dates taken directly from patch-file modified time: 40
- Dates using release-archive modified time because the patch carried a ZIP epoch timestamp: 2 (`lost-in-blue-2`, `monster-hunter-stories`)
- Clean-source roundtrip with expected output hash matched: 23
- Owner-reported xdelta-patcher tests: 13
- Browser apply-only test without a pinned target hash: 1
- No current roundtrip evidence recorded in the web manifest: 5

### Nintendo Switch external downloads

The Switch catalog does not run xdelta in the browser. Each game opens a verified release archive supplied by the project owner, and the website does not host or distribute the original game.

- `fire-emblem-three-houses` — `FE16_Thai_v1.3.4_Mod.zip`, 284,870,821 bytes, remote modified date 2026-11-06
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

The web patch now targets the full 1 GiB USA cartridge image instead of the previous 869,330,944-byte trimmed/decrypted source.

- Accepted source: `Yo-Kai Watch (USA).3ds`, 1,073,741,824 bytes
- Source SHA-256: `933c8b7e1d37b87e69b7c7aa97636296e9cb788972077a189f5dd2dc489465a5`
- Patch SHA-256: `566f6d65a79aa18ab9706f32f95ad9409736e3fce04fea31276a18373789d2dd`
- Expected output SHA-256: `e13972ce3b541035ccbae98eba9d0135e97193310b6a9300a904a1b04ebac20a`
- Verification: the exact distributed xdelta reconstructed the 1 GiB target from the clean project source with xdelta3; source, patch, and output were hashed directly.

## Phoenix Wright: Ace Attorney Trilogy

The web patch targets the full 536,870,912-byte USA eShop image. The previous 384,315,392-byte decrypted profile was the wrong source profile for the ROM distributed by the project owner.

- Accepted source: `Phoenix Wright - Ace Attorney Trilogy (USA) (eShop).3ds`, 536,870,912 bytes
- Source SHA-256: `1690da8414e468debfc96118833d3752f44f5331acd5c7ef0406af17d3c631d1`
- Patch SHA-256: `f0242103d34db42ae95b6e81630cc2b3c65946709d20b227873390073deac6a8`
- Expected output SHA-256: `ba2ea48fae81cf129b26a6e920ccdca30bce0c57c27cd9868f7bcc9617cee7d2`
- Verification: the exact distributed eShop xdelta reconstructed the release target byte-for-byte from the pinned clean source with xdelta3. The 356,781,961-byte patch is stored in Cloudflare R2 as four versioned parts, served through the project Worker with CORS and Range support, and reassembled in the browser before its full SHA-256 is checked.

## Evidence tiers

The 23 output-matched entries combine 18 browser xdelta3 WASM roundtrips and 5 clean-source bit-identical/CLI roundtrips. The PoPoLoCrois web xdelta was applied successfully to its pinned USA ISO with the xdelta3 CLI; its measured output SHA-256 is used because the historical v1.10 guide's MD5/SHA1 describe a different target artifact. The 13 owner-reported entries retain that label and are not silently promoted to browser-roundtrip evidence. The apply-only entry is `dqm-joker-3-professional`; it has no pinned release-target hash to compare. The five entries without current verification metadata are `dragon-quest-iv`, `dragon-quest-v`, `dragon-quest-vi`, `tales-of-hearts`, and `the-world-ends-with-you`.

Large 3DS outputs may still need a disk-streaming output path before browser patching can be considered reliable on devices with limited memory.
