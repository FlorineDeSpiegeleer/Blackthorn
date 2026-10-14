# Blackthorn — real multiplayer setup

**Important:** The GitHub Pages projector and phone pages are visual previews only. They do not synchronize across devices. Do not use them for the full mystery.

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