# Blackthorn — one-night multiplayer, only GitHub Pages + ntfy.sh

This is the chosen setup for **three players in the same room with one Windows laptop and a projector**. No Firebase, Railway, or Python server needs to be configured. The website and code live on GitHub; ntfy.sh relays the cross-device events, exactly as in DigitalWorkstation.

## Start the game

1. Open **https://florinedespiegeleer.github.io/Blackthorn/director.html** on the Windows laptop. A new random game session is generated automatically.
2. The Director Desk displays five links: Director, Beamer, Florine, Maxine, Sam.
3. Plug in the projector and use **Win + P → Extend**. Open the **Beamer** link on the extended/projected display and press F11.
4. Let each player open her own Florine/Maxine/Sam link on the phone. The original Blackthorn Phones visual interface remains unchanged.
5. In the Director Desk choose **New Game**. The beamer and phones follow.
6. The Director controls scene changes, previous, pause and resume. Phone choices go to the Director event list; a **Ready** button inside each character's Blackthorn app confirms readiness.
7. At the four investigation checkpoints, the phones can send their response to the Director, who can **approve** the checkpoint before advancing.
8. In case of reconnection, phones and the beamer request the current scene again. Character choices and notes are saved locally under the active session code.

## Images

The current public GitHub tree has 56 pictures under `nieuwe fotos_SFM/`. The additional **147 original/earlier pictures** still have to be uploaded from the separate extracted picture pack into `original-photos/` and `extra-original-photos/`, **directly on main**. Keep the SFM folder. See `IMAGE_IMPORT.md`. The script uses fallback art until then.

## Limitations and release status

- GitHub Pages itself is static; **ntfy.sh is an external public relay** used for this one-off play session. It requires internet and uses no login or private authenticated channel.
- This is best-effort synchronization. A random session code prevents casual overlap, but a person who knows it could inspect the event stream. This is an accepted decision for this private group.
- The **47 original scenes, 55 personal flows, 4 Director-gated puzzle checkpoints** and basic original route scoring are in the new browser implementation, but the full original V18 Python engine's interaction details have not all been ported.
- GitHub Actions static checks are passing. A complete manual five-device trial and finale/branch approval remain outstanding. Do not claim the definitive experience has been validated before that playtest.
- No actual plot spoilers are included in this guide.

Use [QA_STATUS.md](QA_STATUS.md) to track what has been verified.
