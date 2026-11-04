# Web patch audit

Updated: 2026-11-04 (Asia/Bangkok)

## Inventory

- Web manifests: 39
- Patch identity checks passed (file size + SHA-256): 39/39
- Clean-source filename/size candidates found locally: 27 games
- Existing target filename/size candidates found locally: 12 games
- Browser roundtrip verified: 1 game

An identity check proves that the web asset matches its manifest. It does not prove that a patch reconstructs the expected ROM. A game is browser-roundtrip verified only after the site has accepted the pinned clean source, run the vendored xdelta3 WASM engine, and matched the output size and SHA-256.

## Browser-roundtrip verified

| Game | Version | Source SHA-256 | Patch SHA-256 | Output SHA-256 | Result |
|---|---|---|---|---|---|
| SaGa 2: Hihou Densetsu - Goddess of Destiny | v1.0.1 | `a896e7596b0b5cc4eb3740dd566d32b75c0ff943129f55b67885dd95b9f703c3` | `17e67de66190705b1f1fe6e5fa79988225c20f8c2701fcb728050dd3b4ea3adc` | `04445c1c8ee0c95c55a5105db8597216de1ec55808c91e1586edbd96f9fe5fc1` | PASS |

SaGa 2 was also decoded with the native `xdelta3` CLI from the exact web patch. The reconstructed ROM matched the pinned release target byte-for-byte by SHA-256.

## Pending

The other 38 manifests remain pending browser roundtrip verification. Do not treat their presence in `assets/patches/` as fresh release proof. Large 3DS outputs also need a disk-streaming output path before they should be advertised as reliably patchable in a browser with limited memory.
