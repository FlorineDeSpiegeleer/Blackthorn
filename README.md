> **CURRENT GAME DESIGN (26 October 2026): THREE PLAYERS, NO GAME MASTER.**
> Florine, Maxine and Sam all play equally. Start at [Play Together](https://florinedespiegeleer.github.io/Blackthorn/play.html), which generates a shared session and four links (beamer plus one phone per player). The old Director Desk URL redirects to the same player lobby; nobody should have to read hidden notes, approve puzzles, or steer the story during gameplay.
> **DEVELOPMENT ONLY:** Automatic beamer progression and all-three-ready gating are now a rehearsal feature. P1–P4 lack source-grounded automatic puzzle checking and stop the rehearsal rather than pretending success. S27 requires the approved finale screenplay; route outcomes and full cross-device playtesting remain outstanding. Older Director instructions in this README are legacy and must not be used for the next playtest.

# Blackthorn Academy — The Veiled Moon

## The correct experience

**Projector:** cinematic story only, full-screen and borderless. The default website no longer has player-app tabs or admin sidebars.

**Personal phones:** an in-world smartphone interface inspired by the original blackthorn-phones project. Separate Florine, Maxine and Sam screens with Messages, Photos, Camera, Blackthorn, Map, Notes, Calendar and Calls.

## Pages links

- Projector: https://florinedespiegeleer.github.io/Blackthorn/
- Florine: https://florinedespiegeleer.github.io/Blackthorn/phone/?character=florine
- Maxine: https://florinedespiegeleer.github.io/Blackthorn/phone/?character=maxine
- Sam: https://florinedespiegeleer.github.io/Blackthorn/phone/?character=sam

These URLs require GitHub Pages to be enabled and the new deployment to finish.

## Play original V18 together on Windows (same Wi-Fi)

This is an **optional legacy alternative**, not the selected final architecture. For the one-night experience, use GitHub Pages + ntfy.sh without running Python. The existing private V18 game archive can still be started locally with `START_BLACKTHORN_WINDOWS.bat` if desired. [Full Windows setup instructions](PRIVATE_LAN_GAME_SETUP.md). The attractive public Pages previews have **not yet been integrated into the confidential V18 server**; a full five-device playtest is still required.

## Canonical V18 story and original art (October 2026)

**Canonical text is now integrated:** `story-data.js` contains all 47 original story scenes and 55 private role flows. These are loaded by the cinematic projector and the existing Blackthorn Phones UI, without rewriting the original script. The projector supports the Aetherium-style menu, dark-gold narration screens and round-portrait dialogue when the content has structured dialogue.

**Original artwork is still awaiting file upload:** GitHub currently has 56 pictures in `nieuwe fotos_SFM/`. The additional 24 original V18 pictures and 123 earlier photographs have been collected into a separate import package. It must be extracted and the `original-photos/` and `extra-original-photos/` folders uploaded to GitHub `main`. The page looks for originals via `image-manifest.js` and falls back to existing SFM artwork when an original is absent. See [IMAGE_IMPORT.md](IMAGE_IMPORT.md).

**Not yet fully finished:** 14 conditional role flows require event/choice prerequisites, including one complex formula; those are intentionally not automatically displayed until conditions can be evaluated. Puzzles, branching consequences, role flow gating and full 5-screen runtime have not yet had end-to-end tests. This is a real canonical-data integration, **not yet a validated final playthrough**.

## Start your one-night Blackthorn session — Windows + beamer

**Recommended start:** open the [Director Desk](https://florinedespiegeleer.github.io/Blackthorn/director.html) on your Windows laptop. It creates a random session code automatically and displays five separate links: Director, Beamer, Florine, Maxine and Sam.

1. Open the Director Desk on your laptop; the session code is created for you.
2. Copy the links from the page (or open the Beamer link there).
3. Connect the beamer to the Windows laptop using HDMI. Set Windows **Win+P → Extend**, then move the **Beamer** tab to the projected screen and press F11 for fullscreen.
4. Send each player only her own link and keep the Director Desk privately on the laptop screen.
5. Press **New Game** on the Director Desk. All devices join the same session through **ntfy.sh**; advance/pause from the Director Desk.
6. Each player can tap **I am ready for the next scene** in her unchanged Blackthorn Phone → Blackthorn app. The Director Desk shows individual ready confirmations and receives private choice receipts.
7. On reconnection, a phone or the beamer asks the Director for the current scene; progress and local choices are cached in the browser for that session.

**No Railway, Firebase, or separately installed Python server is required.** The ntfy.sh message relay is an external service that requires working internet access, even when all participants are in the same room. If Wi-Fi internet fails, automatic synchronization pauses. Session codes are not secure authentication; this is an accepted trade-off for a private, one-time friends game.

**Photo reminder:** GitHub still has the 56 `nieuwe fotos_SFM/` images; the 147 original/earlier images in `BLACKTHORN_ORIGINAL_FOTOS_GITHUB.zip` still need uploading as unpacked `original-photos/` and `extra-original-photos/` folders. The UI falls back to existing photos in the meantime.

**Current QA status:** The 47 original scenes and 55 phone flows are integrated; automated script/flow/condition tests run with GitHub Actions. Full puzzle rules, complex romance branches and a five-device visual playthrough remain unverified. See [QA_STATUS.md](QA_STATUS.md).

## One-night GitHub Pages + ntfy multiplayer rehearsal

The public projector and three phone previews now support synchronized **scene position, pause and phone choice receipts** via the same ntfy.sh method used by DigitalWorkstation. No Python, Firebase or Railway is necessary to run this preview.

Choose a new random session word, at least 16 characters, and use the **identical** code in each URL:

- **Director:** `https://florinedespiegeleer.github.io/Blackthorn/?session=YOUR_RANDOM_SESSION&director=1`
- **Beamer (viewer):** `https://florinedespiegeleer.github.io/Blackthorn/?session=YOUR_RANDOM_SESSION`
- **Florine:** `https://florinedespiegeleer.github.io/Blackthorn/phone/?character=florine&session=YOUR_RANDOM_SESSION`
- **Maxine:** `https://florinedespiegeleer.github.io/Blackthorn/phone/?character=maxine&session=YOUR_RANDOM_SESSION`
- **Sam:** `https://florinedespiegeleer.github.io/Blackthorn/phone/?character=sam&session=YOUR_RANDOM_SESSION`

The Director's page advances/pauses the shared scene. Other devices subscribe to the current state, including reconnects. Character-specific **preview** replies are published as compact `role + choiceId + option` events and appear in the Director's small event panel.

The public GitHub Pages experience now loads the 47-scene V18 narrative and 55 phone flows. Conditional branching and complete puzzle validation still need work, and a full multi-device playtest is pending. Do not treat it as fully validated yet.

ntfy channels and the `director=1` flag do not provide real authentication. For this one-off private group the user accepts that trade-off; choose a non-obvious session code and share links only with participants. No secret story content is sent over ntfy events by the current integration.

## Phone preview test

Open Blackthorn on the phone's home-screen app grid, then choose **Simulate next chapter**. This releases another set of sample messages for that phone **only**. It is a local preview, not the real mystery unlock process.

## GitHub Pages hosting

The GitHub Pages site is a **spoiler-safe preview**. Its opt-in live synchronization uses the external ntfy.sh message service; there is no separate server to install. It retains local browser progress and independent character previews. **A bare GitHub Pages site cannot synchronize by itself; the ntfy integration above adds best-effort live event delivery for this one-time game.** The private V18 story code remains private and has not been published to Pages. Best-effort rehearsal synchronization is now provided by ntfy.sh. The optional local Windows launcher remains available only for the older confidential V18 server implementation.

## Runtime status and safety

GitHub Pages now contains the original V18 storyline; its ntfy communication provides shared scene positions and reply receipts, but some conditional branches and puzzles are not yet complete. The private V18 prototype separately includes shared state, private role links and server-authoritative pause. The Windows starter can still launch that older private server locally, but the chosen Pages-based version uses ntfy.sh instead. The complete story, puzzles and finale still need validation.

For the selected GitHub Pages + ntfy one-night setup, use the five links in this README. Optional legacy Windows server instructions are in PRIVATE_LAN_GAME_SETUP.md. Do not publish the private V16 ZIP, _canonical_private.json, access tokens, or GM-only sources here.