---
sidebar_position: 6
title: Changelog
---

# Changelog

All notable changes to LOSPOR are documented here.

---

## [2.0.0] — 2026-06-19

### Changed — Database Optimization

- **ICD-10 diagnosis and comorbidity search.** The previous ICD-11 search required a live connection to the WHO API and used AI-translated Bulgarian labels. Diagnosis and comorbidity search now queries a local ICD-10 database seeded from the WHO international classification with official Bulgarian Ministry of Health labels — faster, offline-capable, and aligned with Bulgarian NHIF clinical coding.
- **Lab results are now numerically coded.** Each lab result is stored with its LOINC code, canonical SI unit, reference range, and an automatically computed abnormal flag (low / normal / high / critical). Blood gas results use mmHg throughout.
- **Drug coding with ATC.** The drug classification tree (ATC, ~6,300 codes) is now seeded into the database. Intraoperative drug events and preoperative medication entries gain ATC codes for research queries.
- **Field-level audit trail.** Every preoperative and postoperative field change is now recorded individually — what changed, from what value, to what value, by whom, and when.
- **Finalisation snapshots.** When a case is finalised (COMPLETE), a full-case snapshot is stored (one row per case, updated on re-finalization). Research datasets can cite the snapshot to ensure reproducibility.
- **Comorbidities coded in ICD-10.** Comorbidity entries now carry an ICD-10 code alongside the free-text label, making them queryable across cases by standard code.

---

## [1.2.0] — 2026-06-18

### Changed
- **Clinical data is now stored as queryable database rows.** Diagnoses, procedures,
  comorbidities, lab results, vascular accesses, vitals, and the multi-select fields
  (positions, techniques, airway, ventilation, handover) — previously held only as
  JSON — are now also written as proper rows, making research and data export much
  more powerful. **No change to what data is collected or how you enter it**, and no
  change to how the apps perform.

---

## [1.1.1] — 2026-06-17

### Fixed
- **Browser/PWA intraoperative saves** that use the newer sync headers or the `PUT` method (edits/deletes, conflict-detected saves, offline replay) no longer fail in the browser. The installed app was unaffected.
- **Finalised cases are now fully locked** — intraoperative entries can't be edited or deleted once a case is finalised.
- **Case codes now use the current calendar year** (e.g. `2026-0001`), resetting each January per user.
- Offline intraoperative entries are kept and retried through a temporary sign-in expiry instead of being dropped.
- **Department-head view scoped to your own institution** — a Head of Department now sees only cases from their institution, not every case in the system.
- **"Undo finalise" now works on mobile** and uses a consistent **30-minute** window across the app and server.
- Hardened sign-in so a failed login can't reveal whether an email address has an account.
- Fixed the desktop "Ongoing cases" shortcut, which could fail to list active cases.

### Changed
- Softened remaining "GDPR compliance" wording to "GDPR principles/considerations" in the documentation.
- Self-hosting docs now use `prisma migrate deploy` (production-safe) for schema updates instead of `db push`.
- Corrected the stored-data list (removed "time in recovery room," which is no longer collected).

---

## [1.1.0] — 2026-06-15

### Notifications
- **Case reminders** — both the app and the PWA can now remind you to chart vitals during an active case. Turn it on in **Settings → Notifications**, choose how often you're reminded (3/5/10/15 min), and send a test notification to confirm it's working. The reminder resets each time you record a set of vitals. In the installed app these fire even when it's in the background; in the PWA they work while it's open (over HTTPS).

### Intraoperative charting — reliability & safety
- The timetable is now backed by an immutable event log, so **nothing is lost** when two people document the same case at once, and offline entries can't be duplicated when they sync.
- **Edits and deletions keep their full history** under the hood (better for audit and medico-legal review), while the chart still shows the clean, current picture.
- **Infusion rate changes display correctly** — the chart and pills show the right rate before and after each change.

### Account security
- Hardened login throttling and sign-out (a token is properly invalidated server-side when you log out), and tightened a few access-control edge cases.

### Note
- Wording across the app and site changed from "GDPR compliant" to "designed with GDPR principles" pending a formal legal review.

---

## [1.0.1] — 2026-06-11

### Mobile improvements
- **Settings redesign** — settings is now two-level: a Profile screen (name, institution, edit institution from a DB list) and a Settings screen (UI: theme/language/preop layout; Automation: auto-fill vitals/BP/HR/background refresh; Privacy & Data: policy/terms/about/export/delete). Admin console visible to admins only. Sign out is a separate persistent button.
- **Inline procedure and diagnosis search** — mobile search fields now use inline dropdown autocomplete instead of full-screen sheets. Procedure results display the clinical group as the primary label and the code and domain below it, matching the web app.
- **AI monitor scan** — fixed on native Android; camera images now correctly pass base64 to the vitals-scan endpoint.
- **AI advisor removed from case summary** — the AI pre-operative advisor button is available only in the preop form. It was incorrectly appearing on the case summary screen.
- **Case status chain completed** — mobile dashboard and case summary now reflect the full seven-step status chain: Draft → In Consultation → Awaiting Allocation → In Theatre → Awaiting Post-op → Awaiting Review → Case Finished.

### Lab scan improvements
- **Library-anchored extraction** — the AI lab scan now only returns tests from the LOSPOR catalogue. Unknown or phantom test names (e.g. "absolute leucocyte count") are silently discarded server-side.
- **Normalised units** — all extracted results are mapped to canonical units: Hb in g/L, Hct as a decimal ratio, glucose in mmol/L, and so on. Unit normalisation is enforced server-side regardless of how the value appears in the source image.
- **Custom lab results removed** — free-form custom lab entries have been removed. All results must come from the catalogue, ensuring consistent units and reference ranges.

### PWA fixes
- **Timetable autosize on PWA** — vital-sign input fields, blood pressure popup, and drug dose controls in the intraoperative timetable now adapt to the browser window width. Previously they overflowed off the right edge of the screen.
- **Dark mode colour-scheme error fixed** — `darkMode: "class"` is now set in the Tailwind config, preventing a `Cannot manually set color scheme` console error on the PWA.

### Legal
- **Privacy Policy updated to v1.1** — sub-processors section now explicitly covers Mistral AI image processing for lab scan and monitor scan. Effective date updated to June 2026.
- **Terms of Service updated to v1.1** — new section 3a documents user obligations when using AI image scanning features. Effective date updated to June 2026.
- **AGPL-3.0 LICENSE added to mobile app** — `lospor-mobile/LICENSE` created. Copyright (C) 2026 Kaloyan Dzhunov.

---

## [1.0.0] - 2026-05-26

### Dashboard and mobile navigation
- **Dashboard defaults to all accessible cases** - the web and mobile dashboards now open to the full case history in reverse chronological order instead of hiding older cases behind a Today filter.
- **Clickable dashboard statistics** - dashboard statistics can now act as case-list filters. The selected scope is visible and resettable.
- **Mobile clinical toolbar** - the mobile dashboard now uses a compact LOSPOR toolbar with dashboard, new-case, and settings actions instead of an ambiguous plus-only workflow.
- **Visible mobile case scope rail** - mobile case scopes are shown as a quiet horizontal rail with counts: All, Today, Month, Active, Drafts, Awaiting postop, Complete, and Handovers.

### Mobile preoperative workflow
- **Preop section dashboard** - mobile new-case and edit-preop workflows now start with a section dashboard summary. Tapping a section opens a focused full-screen editor instead of forcing one long scroll.
- **Shared clinical number entry** - age, height, weight, mouth opening, thyromental distance, and other numeric clinical fields now use a reusable wheel/chip/stepper-style control with manual fallback.
- **Decimal input fixed** - comma decimals such as `8,5` and dot decimals such as `8.5` are accepted safely. Empty or invalid numeric input no longer becomes `NaN`.
- **Mobile AI lab scan** - mobile preop labs can now use camera or gallery upload, call the existing Mistral lab reader, review extracted results, and add selected rows. Manual entry remains available.
- **Medication search duplicate-key warning fixed** - duplicate labels from drug search results no longer produce React duplicate-key warnings.
- **Continue to intraop validation fixed** - invalid mobile preop submission now shows the missing fields instead of jumping back to the top of the form.

---

## [0.4.2] — 2026-05-24

### Features
- **Full Bulgarian UI translation** — every user-visible string in the interface now adapts to the selected language. All previously hardcoded English labels, section headers, button text, error messages, and status indicators across the admin panel, case entry wizard, register page, settings, guided tour, and preoperative form have been converted to translatable keys. Switching to Bulgarian in Settings → Language now translates the entire app.
- **Vercel Analytics** — anonymous page-view tracking added. No personal data is collected.

### Security / compliance
- **AI disclaimer corrected** — the AI advisor no longer uses "clinical decision support" language. The disclaimer now clearly states that the output is an informational summary, does not constitute clinical advice, and that the responsible anaesthesiologist retains full clinical responsibility.
- **Lab scan upload warning strengthened** — the GDPR notice above the upload button now explicitly instructs users to crop patient names, date of birth, ID numbers, and other identifiers out of the image before uploading.
- **PII detection best-effort notice** — the Privacy Policy now clarifies that automatic pattern detection is best-effort. Users remain responsible for not entering patient-identifiable information in free-text fields.

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
