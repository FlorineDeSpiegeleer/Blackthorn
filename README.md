# Blackthorn Academy

English-language interactive mystery and romance game for three players, with separate private phone views, a shared projector view and a local game-master server.

## Current version

The latest packaged prototype is **V15**. This repository is being initialized; **the game application files have not yet been uploaded**. A README alone is not a working installation.

## Import the complete V15 package

Extract `BLACKTHORN_PRIVATE_GAME_V15.zip` and upload the **contents of the extracted `BLACKTHORN_PRIVATE_GAME_V15` folder** to the repository root (not the outer folder and not just the ZIP). Keep directory structures such as `assets/` intact. The prototype uses `server.py`, `index.html`, `english_presentation.py`, `_canonical_private.json`, and binary audio/image assets.

## Important security note

**This repository is public.** The V15 archive includes `_canonical_private.json` with GM-only story content. Anyone can inspect files committed to a public GitHub repository. Do not upload the canonical private data to a public repo if the mystery must remain secret. For actual play, host the server privately and distribute only limited player-role links.

## Release status

V15 is a prototype, not a verified final game. Four puzzle answers have not been independently validated for automatic scoring; the gameplay currently uses GM review. The finale is a new draft requiring story approval, and a full three-phone/projector playtest is still needed.

See `START_HERE.md` and `REVIEW_THIS_FIRST.md` in the V15 package for local setup and review guidance.
