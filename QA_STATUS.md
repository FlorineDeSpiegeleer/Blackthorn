# Blackthorn — integration QA snapshot (18 October 2026)

This is a spoiler-free **development** report, not a completed five-device playtest.

## Passed code/static checks

- Canonical `story-data.js`: **47** original scene records and **55** original role-flow records.
- Cross-reference integrity: **0** scene-to-flow references missing.
- Art routing: **0** scenes without an image route in `image-manifest.js`; all have a fallback path into the existing SFM collection.
- Source JavaScript syntax: `story-data.js`, `image-manifest.js`, `projector.js`, `phone/phone.js` and `blackthorn-sync.js` passed JavaScript parsing.
- Three critical phone-flow safeguards: empty reply choice lists do not create unusable buttons; known route/hazard/prerequisite conditions are checked against local choice flags; unrecognized expressions are not automatically unlocked.
- The Blackthorn Phones visual layout and its CSS are unchanged.

## Outstanding before the game is ready for the one-night event

- **Image import not finished:** GitHub still contains 56 SFM PNGs, while 24 original V18 + 123 earlier WebP images remain in the separate import package awaiting direct upload to `main`.
- **Three dedicated location backgrounds missing:** see `MISSING_IMAGES_AND_PROMPTS.md`. Current substitutes let the projector show a background anyway.
- **V18 has no structured `dialogue` arrays** in its 47 scene records. The new cinematic dialogue component exists but is not activated automatically by canonical narrative paragraphs; those dialogues need faithful segmentation from original source material rather than invented lines.
- **Choice branches and puzzles:** static flow checks are not end-to-end game logic approval. Conditional flags and branching outcomes beyond the implemented basic rules need full scenario testing.
- **Multiplayer:** ntfy.sh messages require real device/network testing for stale replay, refreshed devices, scene changes, replies, and recovery from a connection loss. The user's one-night group explicitly accepts public ntfy topic privacy limitations.
- **Full run:** the entire three-player Director + projector experience has not been approved as complete and spoiler-free by a human playtest.

## Next development checkpoint

1. Upload both extracted image folders to GitHub `main`.
2. Open several scenes with and without the original-image folders and verify every image fallback in a browser.
3. Test key conditional role paths without exposing their content in chat.
4. Test all five separate screens on the same session.
5. Only then mark the original game ready.
