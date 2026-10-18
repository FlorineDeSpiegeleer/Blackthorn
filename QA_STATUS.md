# Important correction: English narrative and story completeness

**18 October 2026:** The first public 47-scene import incorrectly displayed Dutch production notes and fragmentary scene summaries as if they were final game dialogue. That release was NOT a complete English story.

The separate English localizations `story-english.js` (47 scenes) and `phone-english.js` (55 flows) are now loaded by the projector, phones and Director Desk. All original Dutch canonical fields are preserved as internal source data; the English copy contains connective narrative, not invented evidence or hidden solution facts. GitHub QA now requires a translation record for every scene and phone flow.

**Still NOT fully playable as a finished narrative:** the V18 source is an outline/script, with missing fully written conversations and evidence interaction and a GM finale placeholder in scene S27. The new English text is a bridge for readability and follows the known events, not a complete replacement for final canonical mystery content. This needs authoring and a full 3-player playtest before claiming an end-to-end polished game. Private final consequence placeholders remain unexpanded.

---
# Blackthorn Academy — development QA status (18 October 2026)

**Spoiler-free report.** The original V18 mystery content is intentionally not recited here.

## Implemented on public GitHub `main`

- Original **47 scene records** and **55 personal phone-flow records** loaded by `story-data.js`.
- Cinematic beamer interface: ornate main menu, backgrounds with fallbacks, original-script NPC quotations in portrait dialogue scenes, pause, previous, next, local checkpoint.
- Existing Blackthorn Phones visual appearance retained, with scene-dependent personal phone messages, original V18 engagement-counter rules, key conditional gates, player readiness button, and investigation response form.
- **One-night GitHub Pages + ntfy.sh** synchronization: shared scene state, pause, phone choice receipts, ready signals, investigation submissions, Director approvals, reconnection request.
- A **separate Director Desk** at `director.html` generates one shared session and links to the beamer and all three phones, tracks readiness, displays private responses, and enforces four Director-approved investigation checkpoints.
- All 47 scenes have an image route with fallback into existing `nieuwe fotos_SFM/`.
- GitHub Actions runs the spoiler-free `qa/validate-game.mjs` integrity suite on every main commit.

## Verified

- GitHub Actions **passed** on commit `384356ecc2b8620e1aac8c05c8fb6ca5f221acb5` after the latest condition/test updates.
- 47 original scenes, 55 original flows, **0 missing flow references**, image manifest mapping for every scene.
- JavaScript syntax for key scripts plus the Director Desk; checks exercise role conditions and the literal NPC quote parser.

## Not yet verified / not fully finished

- The separate 147-image original/older photograph package is **not yet uploaded to GitHub**; only the 56 SFM PNGs are live in the repo. Import `original-photos/` and `extra-original-photos/` from the provided ZIP. See `IMAGE_IMPORT.md`.
- Three optional dedicated location images lack an exact standalone backdrop; see `MISSING_IMAGES_AND_PROMPTS.md`. Alternative images are used.
- The original Python V18 engine contains additional interaction details beyond the browser migration. The new client uses Director approvals for four investigation checkpoints, **not automated confidential puzzle-answer validation**.
- A complete end-to-end human 5-screen test (Windows laptop, projector, three phones) has **not** been performed here.
- Branching and finale still need a genuine playthrough with all three roles; a passing static test is not equivalent to a fully accepted game.
- Using ntfy.sh requires internet access and is a best-effort third-party public message relay, explicitly accepted for this private one-night group.

## How to test

1. Open `https://florinedespiegeleer.github.io/Blackthorn/director.html` on the Windows laptop.
2. Open the automatically provided Beamer URL in a separate fullscreen browser window connected to the projector.
3. Open each player's unique role link on her phone.
4. Start, advance, pause and resume through Director Desk; test role replies, all-ready notifications and puzzle checkpoint approvals.
5. Reload a phone; check that its current scene is restored by the Director's response.
6. Test complete finale and personal routes without viewing the story source during play.

**Deployment caveat:** GitHub Actions source QA success is confirmed; this is not proof of a flawless live projector/browser rendering.
