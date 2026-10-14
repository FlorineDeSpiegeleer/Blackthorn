# Blackthorn V16 — synchronized private game

**The online GitHub Pages website is a separate visual demo.** It does not synchronize devices and must not be mistaken for the actual full mystery game.

## Play with five screens on one Wi-Fi network

1. Use the separately distributed **BLACKTHORN_PRIVATE_GAME_V16_LAN_SYNC.zip**; do not commit that ZIP or its hidden story data to this public repository.
2. Extract the ZIP on a laptop with Python 3.10+.
3. In the extracted game folder run `python server.py`.
4. The terminal prints **five confidential URLs**, one each for Director, projector, Florine, Maxine, and Sam.
5. Use Director and projector links on the laptop. For the three phones, replace `127.0.0.1` in their URLs with the laptop's LAN IPv4 address (from `ipconfig` on Windows); preserve each `role` and `token` query string. The devices must be on the same Wi-Fi.
6. The director advances the scene. Private role messages unlock automatically. Screens poll state every ~1.5 seconds.
7. The director can **Pause all devices**, and later **Resume the story**. The server blocks game actions while paused and stores the state.

## Important limitations

This is a **locally hosted private prototype**, not a public/cloud hosted multiplayer service. Keep the laptop awake and its terminal running; only allow private-network firewall access. It is not production-hardened or secured for exposure to the public internet.

V16 retains the original V15 story data, images, choices and investigation flows. The public GitHub PNG collection is not yet merged into this private runtime. The four original puzzle validators and the finale still need separate approval and a full end-to-end playtest before treating this as the finished game.

**Do not upload** `_canonical_private.json`, private session/token files, confidential story files or Director links to this public repository.
