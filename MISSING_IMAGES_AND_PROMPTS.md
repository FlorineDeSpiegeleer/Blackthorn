# Blackthorn Academy — image audit and ready-to-generate prompts

Checked: 18 October 2026. **Spoiler-free:** no culprit, murder mechanism, evidence logic, or finale details are included here.

## Current verified coverage

- GitHub `main`: **56 PNGs**, all inside `nieuwe fotos_SFM/`. The existing SFM directory is kept unchanged.
- Original V18 archive: **24 WebP images** in the separately prepared `original-photos/` folder.
- Earlier picture collection: **123 WebP images** in the separately prepared `extra-original-photos/` folder.
- These two additional folders (**147 files in total**) are collected in `BLACKTHORN_ORIGINAL_FOTOS_GITHUB.zip`, but **are NOT YET committed to GitHub**. The archive is delivered as a separate user download. See `IMAGE_IMPORT.md`. Do not upload the ZIP itself instead of the unpacked folders.
- Once the 147 files have been uploaded, the project has **203 total images**, with some alternate images of the same setting/person.
- The canonical 47 scenes reference academy rooms and 7 core portrait identities. Most locations have a direct original photo or visually suitable alternative in the import package. The manifest `image-manifest.js` prefers originals and has existing SFM fallback art, so loading a missing photo does not leave a blank background.

## Three specifically missing dedicated backdrops

The following are **genuine optional image gaps**: there is *no explicitly named dedicated full-room environment image* for these in the collected original V18 + older photographs. The application uses existing alternatives in the meantime. None of these prompts reveals story secrets.

### BG_North_Lecture_Hall.png
**Context:** Early-academy lecture setting, used in a multi-location opening scene. The V18 story already exists; this is only a missing visual.

**Prompt (16:9):**
> Interior of the North Lecture Hall of Blackthorn Academy, a prestigious fantasy boarding academy at evening. Elevated wooden lecture desks in graceful curved tiers, an elegant professor's lectern, slate panels with decorative but fully illegible chalk marks, pointed Gothic arches, tall lancet windows showing a cloudy moonlit sky, tasteful brass celestial ornaments, dark carved oak, old vellum-bound books, forest-green upholstery, a few antique lanterns. Luxurious cozy dark-academia fantasy, premium illustrated visual-novel environment background, cinematic 16:9 wide-angle perspective from the central aisle, rich midnight navy, burnished warm gold and soft ivory highlights, luminous midtones and clear stonework detail to remain readable on a projector, inviting mystery atmosphere, consistent Edwardian-inspired Blackthorn Academy architecture. Empty room, no people, no readable writing or symbols forming words, no text, no interface, no watermark, no collage, no modern objects.

### BG_Academy_Clinic.png
**Context:** Clinic/interior. An older photograph of an academy doctor exists, but a wide environmental shot is missing.

**Prompt (16:9):**
> Quiet private infirmary inside Blackthorn Academy on a rainy evening, atmospheric dark-academia fantasy setting. Two immaculate old-fashioned brass-frame examination beds with ivory linen behind a modest folding screen, softly lit apothecary cupboards and glass medicine bottles, clean folded bandages, dark oak writing desk, warm lamps, tall pointed Gothic windows with silver-blue rain streaks beyond, subtle botanical details, refined Edwardian-era interior rather than a modern hospital. Cozy, safe, discreetly dramatic mood, no patient or clinician in frame, no injuries, no threatening imagery. Premium illustrated visual-novel background, wide cinematic 16:9 composition, elegant midnight navy, deep pine green, warm amber gold, bright readable facespace and generous luminous midtones suitable for a projector, richly detailed, realistic architectural perspective, no text, no readable labels, no UI, no watermark, no collage, no modern equipment.

### BG_Restricted_Academy_Room.png
**Context:** An unspecified restricted academy room appears in the canonical scene list. This prompt deliberately contains **no clue or solution details**.

**Prompt (16:9):**
> A long-closed restricted chamber deep within the old wing of Blackthorn Academy, original cozy dark-academia fantasy visual-novel environment, imposing Gothic stone ribs and dark carved wooden cabinets, dust motes glimmering in moonbeams, an elegant locked-looking antique oak side door, modest brass mechanical ornaments, rolled-up blank parchment and a few faded tapestries with abstract patterns, soft pools of candlelight along a stone passage, discreet feeling of mystery without any revealed evidence. Rich midnight-blue and antique warm-gold palette, atmospheric but not too dark, abundant visible midtones and soft highlights for a beamer, carefully balanced wide 16:9 cinematic composition, refined Edwardian academy architecture, no people, no recognizable clues, no legible documents, no text, no UI, no watermark, no collage, no modern gadgets.

## Image generation guidelines

- Export exactly as named above, PNG, **16:9** (1920×1080 or equivalent).
- Keep the same rich navy/gold/ivory academy look as the user-provided reference images.
- Make all images **slightly brighter than a typical night scene** so the projector can show details.
- Upload generated images to `nieuwe fotos_SFM/` or a dedicated `generated-backgrounds/` directory and then add their paths in `image-manifest.js`.
- **Do not edit or replace** the 56 existing SFM photos or the original portrait identities.

## Still required before final approval

1. Upload all 147 collected source photos to the public GitHub repo in their extracted folder structure.
2. Optionally generate the three dedicated backdrops above.
3. Playtest the exact 47-scene projector sequence and 55 flow releases on three independent phones plus the Director and projector. Not all story branching, flags, complex conditions and puzzle checks have been fully validated.
