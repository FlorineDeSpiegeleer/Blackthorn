# Blackthorn original photographs — import instructions

The existing public repository contains **56 images**, all under `nieuwe fotos_SFM/`. Those 56 were kept, unchanged.

The collected **BLACKTHORN_ORIGINAL_FOTOS_GITHUB.zip** package contains:
- **24** original V18 image assets: `original-photos/*.webp`
- **123** earlier, user-supplied photos and portraits: `extra-original-photos/*.webp`
- one instruction text file.

These were optimized for a 16:9 beamer view when necessary. The V18 assets remain in their original WebP files; the older PNG images were converted to WebP for smaller GitHub Pages downloads. The import package is not yet included in GitHub itself.

## How to place them on GitHub main

1. Download `BLACKTHORN_ORIGINAL_FOTOS_GITHUB.zip` from the ChatGPT artifact link supplied with this development update.
2. Extract it on Windows (right-click → Extract All).
3. Open [Blackthorn GitHub main](https://github.com/FlorineDeSpiegeleer/Blackthorn), choose **Add file → Upload files**.
4. Drag the complete `original-photos` and `extra-original-photos` folders into GitHub, retaining the folder structure (GitHub Desktop may be easier for large folder uploads).
5. Choose **Commit directly to main**. Do not replace or delete `nieuwe fotos_SFM/`.
6. Once GitHub Pages publishes the new commit, the projector automatically uses original V18 backgrounds based on `image-manifest.js`. Existing SFM pictures remain a fallback.

**Do not upload only the ZIP expecting the website to read images from inside it.** The folders must be unpacked into the repository.

## Verification

After the upload, expect at least **203 images** in the repository (56 SFM + 24 V18 + 123 extra), excluding any duplicates or later additions. Exact paths under `original-photos/` must match `image-manifest.js`.

**Phones:** leave `phone/phone.css` and the Blackthorn Phones visual identity unchanged. Only source data and communication logic are integrated.

**Story:** `story-data.js` is now in the repository, containing the 47 original V18 scenes and 55 private flows. Some conditional flows and puzzle handling still require additional integration and testing.
