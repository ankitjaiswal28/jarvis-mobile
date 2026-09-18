# CLAUDE.md — jarvis-mobile

## What this repo is
The React Native mobile app for Jarvis — owns the microphone, camera,
notification shade, and native device control. See `ARCHITECTURE.md` in
this folder for the JS/native-module split and which capabilities require
Kotlin native modules.

## Before doing anything else
1. Read `ARCHITECTURE.md` in this repo.
2. Read `SPRINT_STATUS.md` (same folder) for the current sprint and this
   repo's open checklist items.
3. Check the native-module table in `ARCHITECTURE.md` before building any
   feature — Notification Listener, Accessibility Service, foreground mic
   service, and TV control are each tied to a specific later sprint. Do
   not build their native Kotlin modules early just because the JS-side
   placeholder exists in `src/native/`.

## Rules for this repo specifically
- Passwords used in any WebView automation (EPFO, Swishy, etc.) must be
  filled via Android's OS-level autofill — never typed by the app from
  voice/STT output.
- OTP entry always happens in a visible WebView, typed by the user
  directly. The app must never read, intercept, or auto-submit that field.
- The Accessibility Service module (once built, Phase 8) must hard-block
  any action on a screen identified as payment-confirmation or
  credential-entry — this is a code-level check, not a convention to
  remember.
- All backend calls go through `src/services/api.js` — don't scatter raw
  `fetch` calls elsewhere in the codebase.

## After finishing a task
Update the checkbox for it in `SPRINT_STATUS.md` before ending the session.

## Companion repos
`jarvis-backend` (FastAPI — all Claude calls, data persistence, and
integrations live there) and `jarvis-web` (Next.js dashboard, no device
control). This app should call the backend for anything beyond pure
device/UI concerns — don't duplicate backend logic here.
