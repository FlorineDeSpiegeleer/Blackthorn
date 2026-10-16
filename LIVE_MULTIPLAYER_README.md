# Blackthorn — GitHub-only edition

The public [Blackthorn website](https://florinedespiegeleer.github.io/Blackthorn/) is served entirely by GitHub Pages. It does not connect to Firebase, Railway, ntfy or any other service.

## What currently works

- Cinematic projector preview and separate Florine, Maxine and Sam phone previews.
- Local scene navigation and local phone notes/messages.
- Local progress persistence across refreshes in the same browser.
- Spoiler-safe previews; the confidential story stays outside the public repo.

## What GitHub Pages cannot do alone

GitHub Pages provides static HTML, CSS, JavaScript and images, not a running, trusted game server. Browsers on different devices do not share localStorage. A static GitHub-only page therefore cannot securely perform all of these simultaneously: instant authoritative cross-device state, confidential role-only message delivery, protected puzzle checking, and a hidden canonical finale.

GitHub Actions and GitHub repository files can store updates but do not provide a secure, low-latency, private role-authenticated game server for participants who only use ordinary browser links. We will not publish the private V18 story data or disguise untrusted client-side state as secure multiplayer.

## Original private game

The **private** `FlorineDeSpiegeleer/Blackthorn-Server` repository contains the existing V18 private-game package, with the original role-code access and server-based synchronization. It is preserved unchanged and is not connected to this GitHub Pages preview.

For now, GitHub Pages is the only component needed to view the previews. This is not yet the fully synchronized five-device mystery game.

## Future options

- **GitHub only:** Continue improving the playable static preview and conduct the shared experience with one Director manually coordinating the displays. No secure automatic multiplayer is promised.
- **Locally hosted Python server later, if desired:** The existing private V18 code could run on one computer over local Wi-Fi while GitHub is used to store the code. This would not require an external cloud provider but would no longer be GitHub-only at runtime.

No external-service configuration is required or requested.
