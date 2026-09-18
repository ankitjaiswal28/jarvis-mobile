# Jarvis Mobile — Architecture

## Overview
The mobile app is where Jarvis actually "lives" day to day — it owns the microphone, the camera, the notification shade, and the device's native capabilities. Everything that requires being *on the phone itself* (not just calling an API) lives here; everything else is delegated to the backend.

```
┌───────────────────────────────────────────┐
│              Jarvis Mobile (RN)              │
├───────────────────────────────────────────┤
│  JS/React Native layer                       │
│  ├─ src/screens/       (Home, Inbox, Tasks…) │
│  ├─ src/services/api.js (backend calls)      │
│  └─ src/native/         (native module bridges)│
├───────────────────────────────────────────┤
│  Native Android layer (Kotlin)               │
│  ├─ NotificationListenerService              │
│  ├─ AccessibilityService                     │
│  ├─ ForegroundMicService                     │
│  └─ AndroidTVControlModule (Cast + ADB)      │
└───────────────────────────────────────────┘
                    │
                    ▼
            Jarvis Backend (FastAPI)
```

## Why React Native + Native Modules
Most of the UI (screens, navigation, rendering backend data) is plain React Native — fast to build, matches the team's existing JS experience. But four capabilities are impossible in JS/RN alone and require real native Android code exposed back to JS as a "native module":

| Capability | Why it needs native Kotlin | RN build phase |
|---|---|---|
| Notification Listener | Requires `NotificationListenerService`, an Android system service with no JS equivalent | Phase 4 |
| Accessibility Service | Requires `AccessibilityService` + screen-reading permissions | Phase 8 |
| Foreground mic service | Requires a persistent foreground `Service` to survive backgrounding | Phase 2 |
| TV control | Requires ADB-over-network or the Android TV Remote Protocol at the OS level | Phase 6 |

Each is built as a small Kotlin module under `android/app/src/main/java/...`, exposed to JS via `NativeModules`, and stubbed out in `src/native/` until its phase arrives — intentionally not built in Sprint 1.

## Folder Structure
```
JarvisMobile/
├── App.js
├── src/
│   ├── screens/          # HomeScreen, InboxScreen, TasksScreen, etc.
│   ├── services/
│   │   └── api.js         # all backend HTTP calls go through here
│   └── native/            # JS-side wrappers around native modules (added per phase)
└── android/
    └── app/src/main/java/.../ # Kotlin native modules live here (added per phase)
```

## Data & Control Flow

### Voice command (continuous listening, Phase 2+)
1. Foreground mic service captures audio continuously
2. Streamed to local STT (on-device Whisper) or backend, depending on chosen architecture tier
3. Transcribed text sent to `POST /command` on the backend
4. Backend returns a classified action; if it's a **native** action (call, TV control, deep link), the app executes it locally using the relevant native module
5. If it's a **backend-handled** action (task creation, calendar, financial query), the backend just returns the result to speak
6. Result spoken via local TTS (Piper/XTTS)

### Notification monitoring (Phase 4+)
1. `NotificationListenerService` (Kotlin) intercepts new notifications from WhatsApp, LinkedIn, etc.
2. Forwards sender + text to the JS layer via the native module bridge
3. JS layer posts it to the backend (`POST /notifications/ingest`) for logging and the mute/backlog logic
4. If notifications are unmuted, the app speaks the alert immediately via local TTS — no backend round-trip needed for the speaking part itself

## What Lives Where — Mobile vs. Backend
| Concern | Mobile | Backend |
|---|---|---|
| Mic capture, TTS playback | ✅ | — |
| Notification interception | ✅ | Logging/mute-state only |
| Native device actions (calls, TV, deep links) | ✅ execution | Classification only |
| Claude reasoning, MoM generation, financial aggregation | — | ✅ |
| Data persistence (tasks, MoM, financial records) | — | ✅ |
| Sensitive document storage | — | ✅ (S3, never on-device) |

## Security Notes Specific to Mobile
- Passwords used in WebView automation (EPFO, Swishy) are filled via Android's OS-level autofill — never typed by the app itself from voice/STT.
- OTP entry always happens in the visible WebView, typed by the user directly — the app never reads or intercepts that field.
- The Accessibility Service module has a hard-coded deny-list preventing it from acting on any screen identified as a payment-confirmation or credential-entry context.

## Tech Stack
React Native (JavaScript) · Kotlin (native modules) · Android SDK · Google Cast SDK · on-device Whisper/Piper or XTTS-lite for local voice processing
