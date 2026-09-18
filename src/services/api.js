/**
 * Central place for all backend calls.
 * Change API_BASE_URL when moving from local dev to your deployed VPS.
 *
 * NOTE: On a physical Android device or emulator, "localhost" refers to the
 * device itself, not your PC. Use your PC's local network IP instead, e.g.
 * "http://192.168.1.x:11023". Android emulator specifically can use
 * "http://10.0.2.2:11023" to reach your PC's localhost.
 */

export const API_BASE_URL = 'http://10.0.2.2:11023';

export async function checkBackendHealth() {
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) {
    throw new Error(`Backend health check failed: ${res.status}`);
  }
  return res.json();
}
