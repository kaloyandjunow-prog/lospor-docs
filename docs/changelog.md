---
sidebar_position: 6
title: Changelog
---

# Changelog

All notable changes to LOSPOR are documented here.

---

## [0.4.2] — 2026-05-24

### Features
- **Full Bulgarian UI translation** — every user-visible string in the interface now adapts to the selected language. All previously hardcoded English labels, section headers, button text, error messages, and status indicators across the admin panel, case entry wizard, register page, settings, guided tour, and preoperative form have been converted to translatable keys. Switching to Bulgarian in Settings → Language now translates the entire app.
- **Vercel Analytics** — anonymous page-view tracking added. No personal data is collected.

---

## [0.4.1] — 2026-05-24

### Fixes
- **Terms and Privacy links not opening when logged in** — clicking Terms or Privacy in the app footer redirected back to the dashboard. Fixed.

---

## [0.4.0] — 2026-05-24

### Features
- **30-minute review window** — submitting the postoperative form now opens a 30-minute review period instead of immediately locking the case. A countdown banner is visible at every step. Navigate back to preop, intraop, or postop to correct any data. The case auto-closes when the timer expires or you click **Close Now**. The timer persists if you leave and return to the page.
- **Expanded lab catalogue** — the preoperative Labs section now includes 100+ perioperative-relevant tests across nine categories: Haematology, Coagulation, Electrolytes, Biochemistry, Liver, Cardiac, Blood Gas, Thyroid, and Inflammatory/Other. Tests are shown in collapsible category rows.
- **Lab reference ranges** — each entered result is compared to a reference interval and flagged as normal (green) or out of range (amber). No clinical action is implied; the flag is informational only.
- **Lab search** — type in the search box above the catalogue to filter tests instantly.
- **AI lab scan** — click **Scan lab report** to upload a photo of a printed lab result. Mistral AI reads the image and extracts test names, values, and units. A preview panel shows the extracted results; select which ones to add. A GDPR notice is shown above the upload button at all times.
- **HOD access restricted to own institution** — Heads of department can view and edit only cases belonging to members of their own institution. Case transfers are also restricted to within-institution recipients. Admin access remains global.

### Fixes
- **Autosave error on case reopen** — returning to the intraop form after navigating away caused a validation error and autosave failure. Fixed.
- **Postop data blank on reopen** — reopening a case that had already been submitted through postop showed empty postop fields. All data is now restored.
- **Review window resets on navigation** — leaving and returning to the summary page restarted the 30-minute timer from scratch. The timer now resumes from the correct remaining time.
- **Parallel fluid lane disappears** — inline-discontinuing one of two same-category parallel fluids caused the discontinued lane to vanish from the timetable. Fixed.
- **Lab results cut off in print** — entering more than 12 or so lab results caused them to overflow and be clipped in the printed protocol. The summary now uses a multi-column layout with a compact font so up to ~40 results fit on the page.
- **Summary cards too narrow on first open** — the printable summary was narrower than expected on the first open during case entry. Fixed.

---

## [0.3.0] — 2026-05-21

### GDPR — Data minimisation
- **Removed staff names** — surgeon, anaesthesiologist, and nurse name fields removed from the preoperative form. Replaced by a free-text **Team notes** field with a privacy warning.
- **Removed exact surgery date** — the date field is replaced by a month/year selector. No calendar date is stored.
- **Anonymous case codes** — format changed from `DDMMYYYY-NN` to `YYYY-NNNN` (e.g. `2026-0001`).
- **Patient identity never stored** — the printable protocol leaves identity fields blank for hand-writing after printing. The print-time name/ID dialog has been removed.
- **Institution decoupled from Case** — institution is now stored on the user account only.

### GDPR — Consent and transparency
- **Consent screen** — shown on first login; must be accepted before using the app.
- **Terms checkbox on registration** — new accounts must accept the Terms of Use and Medical Disclaimer.
- **Privacy Policy page** (`/privacy`) and **Terms of Service page** (`/terms`) — accessible without login.
- **Footer links** — Terms · Privacy · Open source · AGPL-3.0 added throughout the app.

### GDPR — Rights (Articles 15 & 17)
- **Data export** — Settings → Privacy & Data → Download my data (JSON, Article 15).
- **Account deletion** — Settings → Privacy & Data → Delete my account (soft-delete + 30-day hard-delete, Article 17).

### Security
- **DB-backed JWT revocation** — revoked tokens survive server restarts.
- **Constant-time login check** — prevents email enumeration via response timing.
- **Last login tracking** — displayed in Settings → Privacy & Data.
- **Soft-delete** — deleted accounts cannot log in.
- **Server-side PII detection** — free-text fields are checked for EGN, long digit sequences, date patterns, email addresses, and name patterns. Returns a clear 400 error and logs to the audit trail.

### AI advisor
- **Migrated to Mistral La Plateforme (EU)** — EU-hosted inference with GDPR DPA. Groq removed.
- **Free-text fields stripped** — only structured clinical fields are sent; notes and free-text are never forwarded.
- **Opt-in per case** — disabled by default; enabled via a toggle in the preop form.

### Features
- **Settings → Privacy & Data** — last login, data export, account deletion.
- **GuardedTextarea** — live character counter and blur warning for EGN/MRN patterns on free-text inputs.
- **Admin / HOD case access** — admins and heads of department can view and edit cases owned by any member.

### Fixes
- **Timetable timezone** — times were shifting by the UTC offset on every reload; fixed by using UTC methods when reading stored times.
- **Autosave schema coercion** — HTML inputs return strings; API schemas now coerce string values, preventing Zod 400 errors mid-typing.
- **Autosave no longer locks cases** — postop autosave no longer promotes the case to COMPLETE; only the final submit button does.
- **PDF empty 3rd page** — footer text overflow fixed.

---

## [0.2.0] — 2026-05-20

### Security
- Admin approval for new registrations
- Completed cases locked (403 on edit)
- Rate limiting on registration, login, AI advice, ICD search, custom terms
- AI endpoint hardening (16 KB cap, Zod validation, no PHI forwarded)
- Security headers (X-Frame-Options, CSP, etc.)
- Session invalidation on logout (in-memory JWT blocklist)
- Supabase PostgREST API disabled

### Features
- Audit log for case events and AI advice
- Institution-scoped custom terms

### Validation
- Full Zod schemas for preop / intraop / postop API routes

### Fixes
- Broken UTF-8 characters across the app
- Register page institution picker on LAN access
- `public/logo.png` (1.5 MB) removed in favour of `logo.webp` (26 KB)

---

## [0.1.0] — 2026-04-01

Initial release. Preoperative, intraoperative, and postoperative data entry. PDF export. ICD-11 diagnosis search with Bulgarian translation. AI pre-operative advisor. Guided tour. Dark mode. Bilingual (English / Bulgarian).
