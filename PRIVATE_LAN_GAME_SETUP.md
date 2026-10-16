# Blackthorn Academy V18 — Windows LAN setup (no external cloud)

**The real private mystery is NOT the public GitHub Pages preview.**
The original V18 server controls synchronized, role-restricted scenes, and remains confidential in the private repository.

## One-time Windows setup

1. Have a **Windows laptop**, Python **3.10+** installed and an internet connection the first time Python needs to install the original dependencies. Python is local software, not a hosting service.
2. Download the public `FlorineDeSpiegeleer/Blackthorn` repository (GitHub → Code → Download ZIP, then extract), or use a local clone.
3. In the **private** `FlorineDeSpiegeleer/Blackthorn-Server` GitHub repository, download the existing `BLACKTHORN_PRIVATE_GAME_V18_CODES_AND_QR.zip` archive. Do not extract this second ZIP.
4. Place that private archive in the same folder as `START_BLACKTHORN_WINDOWS.bat`. Never commit the private archive to the public repository (the public `.gitignore` ignores ZIP files, but always check before pushing changes).
5. Double-click `START_BLACKTHORN_WINDOWS.bat`. The launcher unpacks the private runtime into `%LOCALAPPDATA%\\BlackthornAcademy\\V18`, installs the original V18 Python requirements and starts `server.py` on port **8765**.
6. Keep the Windows terminal open. Use the confidential Director QR invitation instructions printed by the game server.
7. Connect the three phones and the laptop to the **same Wi-Fi**. If a phone cannot load the URL, check `ipconfig` for the laptop's Wi-Fi IPv4 address and use `http://LAPTOP_IPV4:8765` preserving the rest of the private invitation link.
8. Connect the projector with HDMI, open the projector's role-specific URL on the laptop, and use Windows `Win + P` → Extend (or Duplicate).
9. If Windows Firewall prompts, allow Python on **Private networks only**. Avoid public Wi-Fi, port forwarding, or exposing this un-hardened local server to the internet.

## Saved progress

The launcher preserves the V18 extracted runtime and the game session under `%LOCALAPPDATA%\\BlackthornAcademy\\V18`. It refuses to overwrite an existing installation when the source ZIP changes: back up your game folder before intentionally updating/resetting. Do not distribute saved session files or Director role codes.

## What works and what is still unverified

- V18 already includes a shared server, personal roles, QR and invitation-code login, Director-controlled progression, and private role views.
- The batch/Python starter has been added to public `main`. It has **not yet been end-to-end tested on your actual Windows laptop** with the confidential ZIP and three phones.
- The new attractive public GitHub Pages phone/projector demo is **not yet merged** into the private V18 runtime.
- Original puzzle validators, scene transitions, photo mappings and finale still require complete acceptance testing.

No Firebase, Railway or external notification service is needed for this local game. The laptop acts as the local server while GitHub stores only the code and assets. This is not a GitHub Pages-only runtime.
