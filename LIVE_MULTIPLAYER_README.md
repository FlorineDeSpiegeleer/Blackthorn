# Blackthorn — real multiplayer setup

**Important:** The GitHub Pages projector and phone pages are visual previews only. They do not synchronize across devices. Do not use them for the full mystery.


## Spoiler-free cross-device preview (October 2026)

The public projector and phone previews can now share **scene position and pause state** across different devices using the opt-in `preview-sync.js` transport. This is only a rehearsal for the screens, **NOT the V18 confidential multiplayer engine**.

1. Pick a **new, hard-to-guess session code** of 20+ letters and digits (e.g. generate one with a password generator; do not reuse a role invitation code).
2. Open the Director projector URL: `https://florinedespiegeleer.github.io/Blackthorn/?session=YOUR_RANDOM_CODE&director=1`.
3. Open a watching projector using `https://florinedespiegeleer.github.io/Blackthorn/?session=YOUR_RANDOM_CODE` if a separate Director control display is desired.
4. Open each phone with exactly the **same** session code:
   - Florine: `https://florinedespiegeleer.github.io/Blackthorn/phone/?character=florine&session=YOUR_RANDOM_CODE`
   - Maxine: `https://florinedespiegeleer.github.io/Blackthorn/phone/?character=maxine&session=YOUR_RANDOM_CODE`
   - Sam: `https://florinedespiegeleer.github.io/Blackthorn/phone/?character=sam&session=YOUR_RANDOM_CODE`
5. Move forward or pause on the Director projector. Other connected preview devices should follow. Devices reconnect automatically after temporary network loss, and ntfy's recent-message replay lets newly opened previews catch up.

**Security limitations:** This preview uses the public ntfy.sh service. A person who knows the topic/session code may read or forge the status messages. The `director=1` parameter is **not authentication**. Only nonsecret scene indexes and a pause flag are sent, never puzzle solutions, romance decisions, role access codes, passwords, story text, or hidden evidence. Do **not** use this mode for the confidential game or consider its state authoritative.

Without a valid `session` parameter (12–64 letters/digits/underscore/hyphen), the existing projector and phone previews continue to work locally without network sync. The private V18 server remains the proper solution for a real game with role access, server-authoritative choices and protected secrets.

### Current deployment blocker

The existing Railway `blackthorn-game` service is configured to use the private server repo's Dockerfile, but Railway's GitHub installation currently reports **no access to** `FlorineDeSpiegeleer/Blackthorn-Server`. The repository needs to be granted to Railway's GitHub integration before the first deploy can start. Keep the confidential ZIP and game contents in that private repo; do not copy them here.

## V18 private server: passcodes and QR invitations

The V18 private ZIP includes the complete existing V17 server plus a common role-join page, private invitation codes per role, and Director-generated QR invitations. This is the actual server-hosted game, not a Pages demo.

1. Start the confidential V18 server using Python 3 on a computer or an appropriate cloud host.
2. Open the Director QR setup URL printed in the server console.
3. Give each participant their **own** role code or QR invitation (Florine, Maxine, Sam, projector, Director).
4. Every participant opens the **same server address** and enters the code, or scans their QR.
5. Director controls scenes and a central Pause/Resume. Phones receive role-specific updates from the same server.

The V18 ZIP must stay PRIVATE: it contains canonical mystery data. Do not upload the ZIP, private story JSON, or role tokens to this public repository.

## Web hosting requirement

GitHub Pages serves static files and **cannot run the Python multiplayer server**. To have a single internet URL on every phone, a Python-capable live host (e.g. Railway) is required. The private story must be configured on the server side, not in the public repository. Persistent session storage and server security must also be configured.

## Current confidence

V18 role-code join, wrong-code rejection, and Director QR display passed local HTTP tests. Full story, puzzle, finale and cloud-hosted multi-device acceptance testing is incomplete. Do not describe the current GitHub Pages site as a fully playable synchronized game.