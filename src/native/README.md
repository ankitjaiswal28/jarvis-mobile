/**
 * Placeholder for native module bridges.
 *
 * Features that need real Android native code (written in Kotlin under
 * android/app/src/main/java/...) and exposed here as JS-callable modules:
 *
 *   - NotificationListenerModule   (Phase 4 — WhatsApp/LinkedIn/social alerts)
 *   - AccessibilityServiceModule   (Phase 8 — EPFO, Swishy page automation)
 *   - ForegroundMicServiceModule   (Phase 2 — continuous listening)
 *   - AndroidTVControlModule       (Phase 6 — Cast + ADB/remote protocol)
 *
 * Each will be added here as `NativeModules.<ModuleName>` once its native
 * Kotlin counterpart is written. Left empty intentionally for Sprint 1 —
 * do not build these yet; they belong to later phases per the sprint plan.
 */
export {};
