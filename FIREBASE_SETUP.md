# Blackthorn — Firebase setup (no Railway)

**Current scope:** synchronized, spoiler-free projector + three phone PREVIEWS. The private V18 canonical mystery, secret branches, puzzle checks, GM-only evidence and secure per-role story access are **NOT** part of this public website and cannot be made secure simply by storing a client-side JSON file.

## Create and configure a Firebase project

1. Create a project at https://console.firebase.google.com/ and register a **Web app**.
2. Under **Build → Realtime Database**, create a database and copy its `databaseURL` from the SDK configuration. Select a suitable region. The database must be created with locked-down permissions; never use open test-mode rules for Blackthorn.
3. Under **Authentication → Sign-in method**, enable **Anonymous** (preview spectators) and **Email/Password** (Director).
4. Under **Authentication → Users**, create **one Director email/password user**. Copy its **UID** from the Firebase Authentication Users screen.
5. Open `database.rules.json` in this repository, replace `REPLACE_WITH_FIREBASE_DIRECTOR_UID` with that UID and **publish these rules** in Realtime Database → Rules. The rules are not automatically deployed by GitHub Pages.
6. Open `firebase-config.js` on GitHub `main` and paste the Web app's `apiKey`, `authDomain`, `databaseURL`, `projectId`, and `appId`. The Firebase web app config is public; never place service-account keys or admin SDK secrets into GitHub Pages.
7. Wait for GitHub Pages to update. Choose a random session identifier of at least 16 characters, e.g. a cryptographically generated random string. Use the **same identifier** for all devices.

## Links (replace LONG_RANDOM_SESSION)

**Director login — sign in FIRST on the Director device**

`https://florinedespiegeleer.github.io/Blackthorn/firebase-director.html?session=LONG_RANDOM_SESSION`

After successful login, it redirects to the Director projector. Only the UID identified in the database rules can publish.

**Watching projector (optional, if Director operates from another display)**

`https://florinedespiegeleer.github.io/Blackthorn/?backend=firebase&session=LONG_RANDOM_SESSION`

**Personal phone previews**

- Florine: `https://florinedespiegeleer.github.io/Blackthorn/phone/?character=florine&backend=firebase&session=LONG_RANDOM_SESSION`
- Maxine: `https://florinedespiegeleer.github.io/Blackthorn/phone/?character=maxine&backend=firebase&session=LONG_RANDOM_SESSION`
- Sam: `https://florinedespiegeleer.github.io/Blackthorn/phone/?character=sam&backend=firebase&session=LONG_RANDOM_SESSION`

Advance the **Director** projector by clicking Continue. All preview phones follow the scene stage, and a pause reaches all devices. Database state is reloaded on reconnect; updates use an increasing version number and Director-only transaction writes.

## Security

- Only authenticated viewers can READ a session's `public` preview state.
- Only the Firebase user whose UID is explicitly written into the Realtime Database rules can WRITE it.
- The only public fields are `scene`, `paused`, `version`, `updatedAt`; these contain **no plot secrets**.
- Browser URL `director=1` is **not authorization**; database rules enforce authority.
- Anonymous sign-in is not an identity proof for a named player. It is fine for these spoiler-free preview stages only.
- **No** actual role-specific secret, scene payload, confidential puzzle logic, personal message, role code or game solution may be published in this repository or the preview database tree.
- If database config or auth is absent, Firebase sync reports an error; it **does not** silently fall back to an insecure public channel.
- Existing `ntfy.sh` demo mode remains optional when `backend=firebase` is absent, and needs only a session code. It is not secure for a real game.

## Future: the actual confidential V18 game

The complete server-hosted V18 game currently resides in the private `Blackthorn-Server` repository. A real Firebase-only migration would require:
1. Move canonical story and role-specific flow data into protected storage inaccessible to unauthorised users.
2. Design authenticated role assignment by a trusted server function, not by `?character=florine`.
3. Port V18 Director advancement, puzzle validation, gated clues, choice processing, and finale transitions to callable/HTTP Cloud Functions (or another trusted execution environment).
4. Write per-role data-access rules, maintain snapshots and migration tests, and validate the full 47-scene flow on five independent devices.

That migration is **not yet done**. Secure server-side Firebase Cloud Functions may require a billing-enabled Firebase plan, even for a small game. Free-tier availability depends on chosen Firebase features and limits. Firebase replaces Railway; it does not remove the need for trusted execution when secrets are involved.
