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

## Phone preview test

Open Blackthorn on the phone's home-screen app grid, then choose **Simulate next chapter**. This releases another set of sample messages for that phone **only**. It is a local preview, not the real mystery unlock process.

## GitHub-only scope

The GitHub Pages site is a **standalone, spoiler-safe preview**. It requires no Firebase, Railway, ntfy or other third-party service. It retains local browser progress and independent character previews. **GitHub Pages alone cannot securely synchronize confidential, role-restricted story decisions in real time across unrelated devices.** The private V18 story code remains private and has not been published to Pages. Shared real-time play requires a trusted running process; the optional Windows local launcher starts the separate private V18 Python server for exactly this purpose.

## Runtime status and safety

GitHub Pages is still a **spoiler-safe front-end preview**, not a synchronized full game. The private V18 prototype separately includes shared state, private role links and server-authoritative pause. The Windows starter can launch that private server locally, but the public GitHub Pages preview is not connected to it. The complete story, puzzles and finale still need validation.

For local server setup, see PRIVATE_LAN_GAME_SETUP.md. Do not publish the private V16 ZIP, _canonical_private.json, access tokens, or GM-only sources here.