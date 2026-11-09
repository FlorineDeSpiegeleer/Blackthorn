# Blackthorn — spoiler safety and no-Game-Master review

Player contract: Florine, Maxine and Sam play together. One projector, three role-specific phones; no fourth operator. Do not print story solutions, hidden answers or private outcomes in review reports.

## Implemented UI safeguards
- Old Director page redirects to a shared player lobby.
- Projector displays only screenplay publicBeats from story-beat-policy.js; GM/editor cues are filtered.
- Phone gallery images remain locked until the epilogue pending an approved image-to-event mapping. Direct photo navigation is protected too.
- Home-screen art no longer previews later romantic scenes.
- Phone Ready requires all active private choices to be answered.
- Auto-progress waits for all three only at explicit private windows; incomplete evidence or puzzle checkpoints fail closed.

## CRITICAL: Static hosting cannot provide true secrecy
GitHub Pages serves its JavaScript, images and bundled data publicly. The public repository and history can be inspected. story-data.js, phone-english.js and future-route resources expose authoring data and/or other role flows regardless of UI filtering. Each phone currently downloads all roles' canonical flow data. Hidden buttons, URL roles, localStorage and client-side gating are NOT access control.
True secrecy requires a private authoritative backend that delivers only current authorised role/scene content, validates answer/choice state on the server and keeps the finale and future scenes off public bundles. The static website can continue to host non-secret visuals, but a deliberate backend/hosting decision is necessary.

## Release blockers
1. Original evidence cards and source-grounded automatic P1–P4 checking are incomplete.
2. The finale screenplay and private consequences are incomplete.
3. ntfy is an unauthenticated, best-effort relay; cross-device choice and role integrity is not guaranteed.
4. Four-device rehearsal (projector and three phones) and reconnect/refresh/route tests have not passed.
5. Public asset and Git-history privacy review is outstanding.

## Independent AI review request — NO PLOT SPOILERS IN OUTPUT
Audit another role's content access, public-JS inspection, static URL guessing, projected editor notes, photo gating, automatic progression race conditions, unauthorised ntfy events, Ready bypasses and lost player state after reconnect. Give a severity-ranked bug list with file paths and spoiler-free test steps. Never quote or name the culprit, motive, ending, hidden puzzle answers or private romance outcomes.
