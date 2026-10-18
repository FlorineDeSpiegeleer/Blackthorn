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

No Firebase, Railway or hosted game server is needed. Download the existing private V18 game archive separately, place it beside `START_BLACKTHORN_WINDOWS.bat`, and double-click the starter on a Windows laptop with Python 3.10+. The laptop will act as the private game server for three phones plus a projector. [Full Windows setup instructions](PRIVATE_LAN_GAME_SETUP.md). The attractive public Pages previews have **not yet been integrated into the confidential V18 server**; a full five-device playtest is still required.

## New cinematic projector interface (October 2026)

The main projector now has a golden dark-academia **New Game / Continue / Load / Settings / Credits** menu and a cinematic story renderer with dialogue support (two circular portraits and gold dialogue frames when story data supplies two speakers). Back, pause, local save and ntfy synchronization are implemented. The existing `phone/` visual design is **unchanged**.

Important: the public projector still only contains the original **12 spoiler-safe demo scenes** in `projector.js`. The authentic **47 V18 scenes and 55 role-specific flows** reside in the original private package. They have **not yet been fully migrated into GitHub Pages**. The renderer can load `window.BlackthornStory.scenes` from a future `story-data.js`, but that data file is not yet committed. Do not claim the complete murder-mystery, romance, puzzles or finale are playable from Pages today.

## One-night GitHub Pages + ntfy multiplayer rehearsal

The public projector and three phone previews now support synchronized **scene position, pause and phone choice receipts** via the same ntfy.sh method used by DigitalWorkstation. No Python, Firebase or Railway is necessary to run this preview.

Choose a new random session word, at least 16 characters, and use the **identical** code in each URL:

- **Director:** `https://florinedespiegeleer.github.io/Blackthorn/?session=YOUR_RANDOM_SESSION&director=1`
- **Beamer (viewer):** `https://florinedespiegeleer.github.io/Blackthorn/?session=YOUR_RANDOM_SESSION`
- **Florine:** `https://florinedespiegeleer.github.io/Blackthorn/phone/?character=florine&session=YOUR_RANDOM_SESSION`
- **Maxine:** `https://florinedespiegeleer.github.io/Blackthorn/phone/?character=maxine&session=YOUR_RANDOM_SESSION`
- **Sam:** `https://florinedespiegeleer.github.io/Blackthorn/phone/?character=sam&session=YOUR_RANDOM_SESSION`

The Director's page advances/pauses the shared scene. Other devices subscribe to the current state, including reconnects. Character-specific **preview** replies are published as compact `role + choiceId + option` events and appear in the Director's small event panel.

This is a **functional transport integration, not yet the complete V18 game**. The public page still has 12 spoiler-safe projection scenes and sample phone messages. The 47-scene private canon, hidden clues, full answer validation, and finale are **not migrated** from the confidential V18 archive yet. **Do not use this as a complete playtest.**

ntfy channels and the `director=1` flag do not provide real authentication. For this one-off private group the user accepts that trade-off; choose a non-obvious session code and share links only with participants. No secret story content is sent over ntfy events by the current integration.

## Phone preview test

Open Blackthorn on the phone's home-screen app grid, then choose **Simulate next chapter**. This releases another set of sample messages for that phone **only**. It is a local preview, not the real mystery unlock process.

## GitHub Pages hosting

The GitHub Pages site is a **spoiler-safe preview**. Its opt-in live synchronization uses the external ntfy.sh message service; there is no separate server to install. It retains local browser progress and independent character previews. **A bare GitHub Pages site cannot synchronize by itself; the ntfy integration above adds best-effort live event delivery for this one-time game.** The private V18 story code remains private and has not been published to Pages. Shared real-time play requires a trusted running process; the optional Windows local launcher starts the separate private V18 Python server for exactly this purpose.

## Runtime status and safety

GitHub Pages is still a **spoiler-safe front-end preview**, not a synchronized full game. The private V18 prototype separately includes shared state, private role links and server-authoritative pause. The Windows starter can launch that private server locally, but the public GitHub Pages preview is not connected to it. The complete story, puzzles and finale still need validation.

For local server setup, see PRIVATE_LAN_GAME_SETUP.md. Do not publish the private V16 ZIP, _canonical_private.json, access tokens, or GM-only sources here.