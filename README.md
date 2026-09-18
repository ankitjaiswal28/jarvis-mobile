# Jarvis Mobile (React Native, JavaScript) — Setup

## Step 1 — Generate the real RN project (must be done on your machine)

React Native's native Android/iOS folders (Gradle, signing, etc.) must be
generated locally by React Native's own CLI — they can't be handed to you
as static files and just work.

Prerequisites: Node.js, Android Studio + Android SDK installed.

```
cd "D:\Projects\Applications"
npx @react-native-community/cli init JarvisMobile
```

This creates a full working JavaScript RN project at:
`D:\Projects\Applications\JarvisMobile`

Rename that folder to `Next App` (or update your own path references) to
match your existing structure, or just use `JarvisMobile` going forward —
your call.

## Step 2 — Overlay these Jarvis-specific files

Copy the contents of this package into your generated project, **overwriting**
`App.js`:

```
JarvisMobile/
├── App.js                         <- overwrite the generated one
└── src/
    ├── screens/
    │   └── HomeScreen.js
    ├── services/
    │   └── api.js
    └── native/
        └── README.md               <- notes only, no code yet
```

## Step 3 — Point it at your backend

Your backend runs on port **11023** (from the FastAPI scaffold).

- **Android Emulator**: `src/services/api.js` is already set to
  `http://10.0.2.2:11023` — this is the emulator's special alias for your
  PC's localhost. Should work out of the box.
- **Physical Android device**: find your PC's local network IP
  (`ipconfig` on Windows, look for IPv4 Address) and change
  `API_BASE_URL` to `http://<your-pc-ip>:11023`. Your phone and PC must be
  on the same Wi-Fi network.

## Step 4 — Run it

```
npx react-native run-android
```

(Make sure your backend from Sprint 1 is already running via
`uvicorn main:app --reload --port 11023` before you launch the app.)

You should see the Jarvis screen with a glowing "JARVIS" title and
"Backend connected ✓" if everything is wired correctly.

## What NOT to build yet
Notification listener, Accessibility Service, foreground mic service, and
TV control all require native Kotlin modules — these belong to later
sprints (Phase 2, 4, 6, 8 per the sprint plan), not Sprint 1. The
`src/native/` folder is left as a placeholder on purpose.
