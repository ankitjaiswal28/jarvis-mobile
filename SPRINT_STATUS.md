# Jarvis — Sprint Status (single source of truth)

> Update this file's checkboxes and "Current Sprint" line after every coding
> session, in every repo. Claude Code reads this at the start of a session
> via CLAUDE.md, so this file is how it knows what's already built and what
> to do next — no need to re-explain verbally each time.

## Current Sprint
**Sprint 1 — R0: Foundation** (Backend, Web, Mobile scaffolds)

## Repo ↔ Sprint Map
Not every sprint touches every repo. Check which repos are "active" for the
current sprint before starting work in any one of them.

| Sprint | Release | Backend | Web | Mobile |
|---|---|---|---|---|
| 1 | R0 Foundation | ✅ active | ✅ active | ✅ active |
| 2 | R1 Core Voice Loop | ✅ active | — | ✅ active |
| 3–4 | R2 Continuous Listening + Routing | ✅ active | — | ✅ active |
| 5–6 | R3 Personal Data Layer | ✅ active | ✅ active | ✅ active |
| 7–8 | R4 Communications | ✅ active | ✅ active | ✅ active |
| 9–10 | R5 Recording, Vision, Search | ✅ active | ✅ active | ✅ active |
| 11–12 | R6 Device & App Control | ✅ active | — | ✅ active |
| 13 | R7 Identity & Personalization | ✅ active | — | ✅ active |
| 14–16 | R8 Sensitive Integrations | ✅ active | ✅ active | ✅ active |
| 17 | R9 Polish & Parity | ✅ active | ✅ active | ✅ active |

If a repo shows "—" for the current sprint, there is nothing to build there
right now — don't start unrelated work in it just because a session is open.

## Sprint 1 Checklist (current)

**Backend**
- [x] FastAPI scaffold + /health endpoint
- [x] requirements.txt, .env.example
- [ ] Database schema (users, tasks, task_history, reminders, mom_records, command_log)
- [ ] Local STT (Whisper) working standalone
- [ ] Local TTS (Piper) working standalone

**Web**
- [x] Next.js shell created (JavaScript)
- [x] Backend health-check wired on homepage

**Mobile**
- [x] React Native overlay files created (App.js, HomeScreen.js, api.js)
- [ ] Real RN project generated locally (`npx @react-native-community/cli init`)
- [ ] Overlay applied, confirmed running on emulator/device, backend health check passes

## Next Sprint (do not start early)
**Sprint 2 — R1: Core Voice Loop** — push-to-talk mic input, STT→Claude→TTS
loop, basic chat screen, system prompt. Backend + Mobile only.

---
Full detail (formal requirements, cost estimates, complete 17-sprint plan)
lives in `C:\Users\ankit.jaiswal\OneDrive - Hridayam Soft Solutions Private Limited\Personal\Documentation\JARVIS\`
— for human reference, not required reading for a coding session:
`jarvis_brd_development_plan.docx`, `jarvis_sprint_release_plan.docx`,
`jarvis_build_checklist.docx`. This file (SPRINT_STATUS.md) is the
condensed version Claude Code actually needs.
