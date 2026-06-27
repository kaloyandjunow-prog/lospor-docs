---
sidebar_position: 6
title: Changelog
---

# Changelog

All notable changes to LOSPOR are documented here.

---

## [3.2.0] - 2026-06-27

### Added
- **Strict case finalization** — finalizing a case now validates that all three sections are present and clinically coherent: preop must exist; intraop must be started with at least one anaesthesia technique; postop must include at least one Aldrete subscore and a patient disposition (Ward / PACU / ICU). An incomplete case returns a clear message explaining what is missing.
- **Offline case creation deduplication** — if the mobile app saves a new case while offline and the network drops before the server response arrives, retrying no longer creates a duplicate. The server recognises the local draft identifier and returns the existing case.

### Changed
- **Clinical numeric ranges** — age, height, weight, blood pressure, heart rate, SpO2, temperature, respiratory rate, pain score, and Aldrete total now enforce clinically plausible ranges. Nonsense inputs (e.g. age 200, SpO2 101) are rejected at the API instead of being stored silently.
- **CORS production guard** — the server now requires `CORS_ALLOW_ORIGIN` to be set explicitly in production. Previously it could silently fall back to `*` (allow any origin) if the environment variable was missing.

### Fixed
- Selecting a drug from the allergy or current medications list now saves correctly. Multi-word drug names (e.g. "Morphine Sulfate") were being blocked by the server PII filter, which mistook two capitalised words for a patient name. Drug catalogue fields now skip the name check while still being checked for EGN, ID numbers, dates, and email addresses.
- Saving intraoperative events or case data no longer returns a 500 error under load. The case save handler was using a database transaction that is incompatible with Supabase's connection pooler, causing timeouts (P2028). Writes now run sequentially; conflict detection is unchanged.

## [3.1.0-hotfix] - 2026-06-27

### Fixed
- PWA and mobile login was returning 403 after the v3.1.0 CSRF hardening. The server was incorrectly blocking cross-origin requests to the login endpoint. Fixed the same day.

## [3.1.0] - 2026-06-25

### Security and privacy hardening
- Web API writes that use cookie authentication now require same-origin `Origin`/`Referer` validation; bearer-token mobile/PWA calls remain supported.
- Clinical PII validation is field-aware for event rows, so controlled clinical labels are not blocked by the name heuristic while free-text notes remain protected.
- AI lab-reading upload limits now check the actual parsed base64 payload.
- Login flows no longer query pending-account state after a failed sign-in attempt, and the legacy pending-check endpoint returns a generic response.
- Account deletion wording now reflects the implemented behavior: immediate access disable and token revocation, with further deletion/anonymisation handled by retention policy.
- PWA documentation now calls out the weaker browser `localStorage` storage model and logout cache clearing.
- Deployment examples use `pwa.lospor.org` for the mobile PWA.
- Mistral requests for lab scan, vitals scan, and AI advisor now retry against the global API base if a configured regional endpoint rejects inference with `regional_inference_not_allowed` (`code: 1914`).
- AI privacy wording now refers to the configured AI provider rather than promising a fixed regional inference path.
- Mobile/PWA bolus drug and infusion pickers now use scenario-based cockpit menus with synced favourite drugs/infusions in user preferences.
- Route-specific drug profiles are respected on mobile/PWA, including lidocaine dose mode for IV and concentration/volume mode for regional routes.

## [3.0.0] - 2026-06-25

### Why this is v3.0
This release is larger than the planned 2.3 line. It changes the canonical database/API contract, aligns mobile and web around one backend schema, introduces shared clinical libraries, moves intraoperative charting to append-only events, and adds research-grade export/provenance tooling.

### Canonical app contract
- `lospor-app` is the canonical database and API owner.
- `lospor-mobile` no longer behaves as a separate schema; mobile payloads are mapped to web/API field names before persistence.
- Case save conflict detection, offline queues, live refresh, and shared case access behavior were tightened so data can move between web, native mobile, and PWA without silent overwrites.

### Shared libraries
- The new `OptionLibrary` powers web/mobile/PWA pickers for techniques, airway, ventilation, monitoring, positions, premedication, drugs, infusions, agents, fluids, events, disposition, handover, demographic pickers, and numeric ranges.
- The option library is seeded from structured source files and has a bundled/cached fallback snapshot so first-load or offline devices do not show empty clinical pickers silently.
- The canonical lab catalogue, canonical units, LOINC codes, and normal ranges are shared by both apps. AI lab scan is asked to search the whole canonical catalogue and only imports recognised tests.

### Database and research model
- Normalized research rows now mirror the clinical JSON/cache data: diagnoses, procedures, comorbidities, labs, medications/allergies, vascular access, premedication, complications, selections, and event timeline data.
- ICD-10 stores English and Bulgarian labels for the same code. The labels are display/search metadata, not duplicate clinical concepts.
- `ConceptMap` stores source vocabulary/code/labels and OMOP concept IDs where confidently known. Source-only values are explicit and never represented by fake OMOP IDs.
- `ClinicalFieldStatus` records key-field missingness/provenance so blank values are not interpreted as negative findings.

### Intraoperative timetable
- Web and mobile now use the same append-only `CaseEvent` event log for drugs, infusions, fluids, agents, gas settings, vitals, glucose, and clinical events.
- Fresh gas flow is stored over time with FGF, carrier gas, FiO2, calculated FiAir, and calculated FiN2O. FiO2 cannot go below 21%; O2-only is FiO2 100%.
- Running infusions, fluids, agents, and gas settings extend visually when reopening an active case.

### Export and governance
- v3.0 adds local Athena/OMOP vocabulary import tables and an import script for full vocabulary-backed concept resolution.
- `ConceptMap` now records mapping method, confidence, review state, mapping notes, and Athena vocabulary version.
- OMOP export reads normalized rows and active event rows, includes provenance/version metadata, preserves source codes/labels, and stores known OMOP concept IDs only where mapped confidently.
- Export bundles include table counts, mapping summary, de-identification metadata, and quality warnings. App exports warn rather than block.
- Free-text is redacted before AI advisor/export paths; coded values are preserved.
- Case snapshots and OMOP export metadata now use `3.0.0`.
- Data should be described as de-identified / pseudonymised, not fully anonymised, because internal user, institution, audit, and timestamp linkage exists.

### Verification
- Web and mobile have deployment checks for typecheck, lint, and tests.
- Mobile now has baseline ESLint/Vitest tooling and component/clinical utility tests.

## [2.3.0] ‘” 2026-06-20

- **Shared option library.** Every intraop/preop pill-button option (position, technique, vascular access, airway management, monitoring, premedication drugs, intraop drugs, infusions, inhalational agents, fluids, clinical events) now comes from one shared catalogue instead of being hardcoded separately in each app. This fixed a real drift where mobile and web sometimes disagreed on technique codes for the same clinical technique, and where mobile's own screens disagreed with each other on drug/infusion/fluid lists.
- **Separate Infusions entry point (web).** Starting an infusion on web no longer requires picking a drug and then choosing "Bolus" vs "Infusion" ‘” there's now a dedicated Infusions row, matching how the mobile app has always separated Drug/Infusion/Fluid/Agent entry.
- **Web intraop events now persist the same way mobile's do.** Bolus drugs, infusion start/rate-change/stop, agent start/stop, fluid start/stop, and clinical events on web now write to the same append-only event log mobile already used, instead of only a JSON snapshot.
- **Still-running infusions/fluids/agents now display correctly after reopening a case.** Previously, a case closed mid-infusion and reopened later would show the bar frozen at wherever it was when you left; the timetable now extends active bars client-side using the user's local wall clock, the same way it already updated live while editing.
- **Security.** Centralized role-authorization across admin/export endpoints; OMOP export and the AI advisor's data path now redact free-text fields that could carry identifying information.
- **Option lists no longer go blank if a device can't reach the server.** Both web and mobile now fall back to a snapshot of the option library bundled into the app itself if a device has never connected successfully and has no cached copy either ‘” e.g. a tablet's very first launch with no signal. A small banner appears whenever any picker is showing this offline/cached data instead of the live list, and it switches back automatically the moment a connection is available again ‘” nothing is ever shown without you being able to tell whether it's current.
- **Mobile quality gates.** The mobile app now has baseline `npm run lint`, `npm run typecheck`, and `npm run test` scripts, plus starter Vitest coverage for pure clinical utility logic and React Native component behavior.
- Self-hosting: added a required post-migration seeding step for the new option library (see [self-hosting guide](./self-hosting.md)).
- Migration note: environments that only have the original option-library enum must apply the additive `LibraryCategory` enum migration before seeding the expanded preop/postop categories. If a live database was manually drifted, check `_prisma_migrations` before deploy.

## [2.1.1] ‘” 2026-06-19

- **Release hardening.** Aligned web, PWA, and mobile metadata to v2.1.1.
- **Access control.** `HEAD_OF_DEPT` users without an institution now fall back to their own cases only; they no longer match other null-institution users.
- **PII protection.** The backend now uses a central clinical free-text PII gate across preop, intraop, postop, and event-save paths.
- **CORS.** Production deployments now require an explicit `CORS_ALLOW_ORIGIN`; Vercel production no longer silently falls back to `*`.
- **Bulgarian ICD-10.** Diagnosis and comorbidity search now stores stable ICD-10 codes with English/Bulgarian label snapshots and displays `labelBg` in Bulgarian UI.
- **Mobile privacy.** Mobile/PWA settings include a clear local clinical cache action for offline drafts and queued saves.
- **Wording.** Documentation now uses ‘њde-identified/pseudonymised‘ќ and describes the OMOP export as partial/OMOP-inspired until full concept mapping is complete.

## [2.1.0] ‘” 2026-06-19

### Added
- **Institution ID on cases.** New cases now store the creating user's institution directly on the case record, improving research attribution and eliminating re-attribution risk if a case is later transferred to a user from a different institution.
- **Drug ID linkage.** Intraoperative drug events now resolve the Drug catalogue entry (by ATC code) and store `drugId` on the event row, enabling precise drug record linkage beyond ATC code string matching.
- **OMOP export: drug events from event log.** Drug exposure in the OMOP CDM export now reads from the `CaseEvent` table (type=drug, status=active) ‘” the canonical append-only event log ‘” instead of parsing the legacy `keyEvents` JSON blob. ATC codes appear in `drug_source_concept_id`.
- **OMOP export: lab results.** Lab measurements are now included in the OMOP `measurement` table using LOINC-coded, canonical-unit rows from the `LabResult` table. Previously lab results were absent from the OMOP export.
- **OMOP export: institution care site.** `care_site_source_value` in `visit_occurrence` now uses the case-level `institutionId` (populated from v2.1+) with fallback to the user's institution name.
- **Bulgarian diagnosis and comorbidity search.** Searching for diagnoses or comorbidities in the Bulgarian-language version of the web and mobile app now correctly queries `labelBg` (Bulgarian ICD-10 labels) in addition to `labelEn`. Previously, Cyrillic queries returned no results because the `locale` parameter was not forwarded to the search API from the comorbidities field (web) or either field (mobile).

### Changed
- OMOP export `source_version` updated from `1.0.0` to `2.1.0`.

---

## [2.0.1] ‘” 2026-06-19

### Fixed
- **CORS preflight now accepts all intraop sync headers.** The `x-lospor-intraop-updated-at` and `x-lospor-force-update` headers were missing from the `Access-Control-Allow-Headers` list, causing mobile conflict-detection saves to fail with a CORS error.
- **Plain-text medication sync.** Preoperative medication lists entered as comma- or newline-separated text on mobile are now parsed correctly instead of being silently dropped.
- **ATC codes on intraoperative drug events.** The event writer now persists `atcCode` and `drugRoute` to the `CaseEvent` table; previously these columns were populated in the schema but never written.
- **Search index performance.** Added `pg_trgm` GIN indexes on ICD-10 labels, synonyms, and drug names so diagnosis and drug searches use index scans instead of full table scans across 100k+ rows.

### Internal
- Vocabulary seed script switched to bulk `INSERT … ON CONFLICT` batches, cutting a full live re-seed from ~4 hours to ~15 minutes.

---

## [2.0.0] ‘” 2026-06-19

### Changed ‘” Database Optimization

- **ICD-10 diagnosis and comorbidity search.** The previous ICD-11 search required a live connection to the WHO API and used AI-translated Bulgarian labels. Diagnosis and comorbidity search now queries a local ICD-10 database seeded from the WHO international classification with official Bulgarian Ministry of Health labels ‘” faster, offline-capable, and aligned with Bulgarian NHIF clinical coding.
- **Lab results are now numerically coded.** Each lab result is stored with its LOINC code, canonical SI unit, reference range, and an automatically computed abnormal flag (low / normal / high / critical). Blood gas results use mmHg throughout.
- **Drug coding with ATC.** The drug classification tree (ATC, ~6,300 codes) is now seeded into the database. Intraoperative drug events and preoperative medication entries gain ATC codes for research queries.
- **Field-level audit trail.** Every preoperative and postoperative field change is now recorded individually ‘” what changed, from what value, to what value, by whom, and when.
- **Finalisation snapshots.** When a case is finalised (COMPLETE), a full-case snapshot is stored (one row per case, updated on re-finalization). Research datasets can cite the snapshot to ensure reproducibility.
- **Comorbidities coded in ICD-10.** Comorbidity entries now carry an ICD-10 code alongside the free-text label, making them queryable across cases by standard code.

---

## [1.2.0] ‘” 2026-06-18

### Changed
- **Clinical data is now stored as queryable database rows.** Diagnoses, procedures,
  comorbidities, lab results, vascular accesses, vitals, and the multi-select fields
  (positions, techniques, airway, ventilation, handover) ‘” previously held only as
  JSON ‘” are now also written as proper rows, making research and data export much
  more powerful. **No change to what data is collected or how you enter it**, and no
  change to how the apps perform.

---

## [1.1.1] ‘” 2026-06-17

### Fixed
- **Browser/PWA intraoperative saves** that use the newer sync headers or the `PUT` method (edits/deletes, conflict-detected saves, offline replay) no longer fail in the browser. The installed app was unaffected.
- **Finalised cases are now fully locked** ‘” intraoperative entries can't be edited or deleted once a case is finalised.
- **Case codes now use the current calendar year** (e.g. `2026-0001`), resetting each January per user.
- Offline intraoperative entries are kept and retried through a temporary sign-in expiry instead of being dropped.
- **Department-head view scoped to your own institution** ‘” a Head of Department now sees only cases from their institution, not every case in the system.
- **"Undo finalise" now works on mobile** and uses a consistent **30-minute** window across the app and server.
- Hardened sign-in so a failed login can't reveal whether an email address has an account.
- Fixed the desktop "Ongoing cases" shortcut, which could fail to list active cases.

### Changed
- Softened remaining "GDPR compliance" wording to "GDPR principles/considerations" in the documentation.
- Self-hosting docs now use `prisma migrate deploy` (production-safe) for schema updates instead of `db push`.
- Corrected the stored-data list (removed "time in recovery room," which is no longer collected).

---

## [1.1.0] ‘” 2026-06-15

### Notifications
- **Case reminders** ‘” both the app and the PWA can now remind you to chart vitals during an active case. Turn it on in **Settings в†’ Notifications**, choose how often you're reminded (3/5/10/15 min), and send a test notification to confirm it's working. The reminder resets each time you record a set of vitals. In the installed app these fire even when it's in the background; in the PWA they work while it's open (over HTTPS).

### Intraoperative charting ‘” reliability & safety
- The timetable is now backed by an immutable event log, so **nothing is lost** when two people document the same case at once, and offline entries can't be duplicated when they sync.
- **Edits and deletions keep their full history** under the hood (better for audit and medico-legal review), while the chart still shows the clean, current picture.
- **Infusion rate changes display correctly** ‘” the chart and pills show the right rate before and after each change.

### Account security
- Hardened login throttling and sign-out (a token is properly invalidated server-side when you log out), and tightened a few access-control edge cases.

### Note
- Wording across the app and site changed from "GDPR compliant" to "designed with GDPR principles" pending a formal legal review.

---

## [1.0.1] ‘” 2026-06-11

### Mobile improvements
- **Settings redesign** ‘” settings is now two-level: a Profile screen (name, institution, edit institution from a DB list) and a Settings screen (UI: theme/language/preop layout; Automation: auto-fill vitals/BP/HR/background refresh; Privacy & Data: policy/terms/about/export/delete). Admin console visible to admins only. Sign out is a separate persistent button.
- **Inline procedure and diagnosis search** ‘” mobile search fields now use inline dropdown autocomplete instead of full-screen sheets. Procedure results display the clinical group as the primary label and the code and domain below it, matching the web app.
- **AI monitor scan** ‘” fixed on native Android; camera images now correctly pass base64 to the vitals-scan endpoint.
- **AI advisor removed from case summary** ‘” the AI pre-operative advisor button is available only in the preop form. It was incorrectly appearing on the case summary screen.
- **Case status chain completed** ‘” mobile dashboard and case summary now reflect the full seven-step status chain: Draft в†’ In Consultation в†’ Awaiting Allocation в†’ In Theatre в†’ Awaiting Post-op в†’ Awaiting Review в†’ Case Finished.

### Lab scan improvements
- **Library-anchored extraction** ‘” the AI lab scan now only returns tests from the LOSPOR catalogue. Unknown or phantom test names (e.g. "absolute leucocyte count") are silently discarded server-side.
- **Normalised units** ‘” all extracted results are mapped to canonical units: Hb in g/L, Hct as a decimal ratio, glucose in mmol/L, and so on. Unit normalisation is enforced server-side regardless of how the value appears in the source image.
- **Custom lab results removed** ‘” free-form custom lab entries have been removed. All results must come from the catalogue, ensuring consistent units and reference ranges.

### PWA fixes
- **Timetable autosize on PWA** ‘” vital-sign input fields, blood pressure popup, and drug dose controls in the intraoperative timetable now adapt to the browser window width. Previously they overflowed off the right edge of the screen.
- **Dark mode colour-scheme error fixed** ‘” `darkMode: "class"` is now set in the Tailwind config, preventing a `Cannot manually set color scheme` console error on the PWA.

### Legal
- **Privacy Policy updated to v1.1** ‘” sub-processors section now explicitly covers Mistral AI image processing for lab scan and monitor scan. Effective date updated to June 2026.
- **Terms of Service updated to v1.1** ‘” new section 3a documents user obligations when using AI image scanning features. Effective date updated to June 2026.
- **AGPL-3.0 LICENSE added to mobile app** ‘” `lospor-mobile/LICENSE` created. Copyright (C) 2026 Kaloyan Dzhunov.

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

## [0.4.2] ‘” 2026-05-24

### Features
- **Full Bulgarian UI translation** ‘” every user-visible string in the interface now adapts to the selected language. All previously hardcoded English labels, section headers, button text, error messages, and status indicators across the admin panel, case entry wizard, register page, settings, guided tour, and preoperative form have been converted to translatable keys. Switching to Bulgarian in Settings в†’ Language now translates the entire app.
- **Vercel Analytics** ‘” anonymous page-view tracking added. No personal data is collected.

### Security / compliance
- **AI disclaimer corrected** ‘” the AI advisor no longer uses "clinical decision support" language. The disclaimer now clearly states that the output is an informational summary, does not constitute clinical advice, and that the responsible anaesthesiologist retains full clinical responsibility.
- **Lab scan upload warning strengthened** ‘” the GDPR notice above the upload button now explicitly instructs users to crop patient names, date of birth, ID numbers, and other identifiers out of the image before uploading.
- **PII detection best-effort notice** ‘” the Privacy Policy now clarifies that automatic pattern detection is best-effort. Users remain responsible for not entering patient-identifiable information in free-text fields.

---

## [0.4.1] ‘” 2026-05-24

### Fixes
- **Terms and Privacy links not opening when logged in** ‘” clicking Terms or Privacy in the app footer redirected back to the dashboard. Fixed.

---

## [0.4.0] ‘” 2026-05-24

### Features
- **30-minute review window** ‘” submitting the postoperative form now opens a 30-minute review period instead of immediately locking the case. A countdown banner is visible at every step. Navigate back to preop, intraop, or postop to correct any data. The case auto-closes when the timer expires or you click **Close Now**. The timer persists if you leave and return to the page.
- **Expanded lab catalogue** ‘” the preoperative Labs section now includes 100+ perioperative-relevant tests across nine categories: Haematology, Coagulation, Electrolytes, Biochemistry, Liver, Cardiac, Blood Gas, Thyroid, and Inflammatory/Other. Tests are shown in collapsible category rows.
- **Lab reference ranges** ‘” each entered result is compared to a reference interval and flagged as normal (green) or out of range (amber). No clinical action is implied; the flag is informational only.
- **Lab search** ‘” type in the search box above the catalogue to filter tests instantly.
- **AI lab scan** ‘” click **Scan lab report** to upload a photo of a printed lab result. Mistral AI reads the image and extracts test names, values, and units. A preview panel shows the extracted results; select which ones to add. A GDPR notice is shown above the upload button at all times.
- **HOD access restricted to own institution** ‘” Heads of department can view and edit only cases belonging to members of their own institution. Case transfers are also restricted to within-institution recipients. Admin access remains global.

### Fixes
- **Autosave error on case reopen** ‘” returning to the intraop form after navigating away caused a validation error and autosave failure. Fixed.
- **Postop data blank on reopen** ‘” reopening a case that had already been submitted through postop showed empty postop fields. All data is now restored.
- **Review window resets on navigation** ‘” leaving and returning to the summary page restarted the 30-minute timer from scratch. The timer now resumes from the correct remaining time.
- **Parallel fluid lane disappears** ‘” inline-discontinuing one of two same-category parallel fluids caused the discontinued lane to vanish from the timetable. Fixed.
- **Lab results cut off in print** ‘” entering more than 12 or so lab results caused them to overflow and be clipped in the printed protocol. The summary now uses a multi-column layout with a compact font so up to ~40 results fit on the page.
- **Summary cards too narrow on first open** ‘” the printable summary was narrower than expected on the first open during case entry. Fixed.

---

## [0.3.0] ‘” 2026-05-21

### GDPR ‘” Data minimisation
- **Removed staff names** ‘” surgeon, anaesthesiologist, and nurse name fields removed from the preoperative form. Replaced by a free-text **Team notes** field with a privacy warning.
- **Removed exact surgery date** ‘” the date field is replaced by a month/year selector. No calendar date is stored.
- **Anonymous case codes** ‘” format changed from `DDMMYYYY-NN` to `YYYY-NNNN` (e.g. `2026-0001`).
- **Patient identity never stored** ‘” the printable protocol leaves identity fields blank for hand-writing after printing. The print-time name/ID dialog has been removed.
- **Institution decoupled from Case** ‘” institution is now stored on the user account only.

### GDPR ‘” Consent and transparency
- **Consent screen** ‘” shown on first login; must be accepted before using the app.
- **Terms checkbox on registration** ‘” new accounts must accept the Terms of Use and Medical Disclaimer.
- **Privacy Policy page** (`/privacy`) and **Terms of Service page** (`/terms`) ‘” accessible without login.
- **Footer links** ‘” Terms · Privacy · Open source · AGPL-3.0 added throughout the app.

### GDPR ‘” Rights (Articles 15 & 17)
- **Data export** ‘” Settings в†’ Privacy & Data в†’ Download my data (JSON, Article 15).
- **Account deletion** - Settings - Privacy & Data - Delete my account (soft-delete/access-disable flow; later deletion or anonymisation follows retention policy).

### Security
- **DB-backed JWT revocation** ‘” revoked tokens survive server restarts.
- **Constant-time login check** ‘” prevents email enumeration via response timing.
- **Last login tracking** ‘” displayed in Settings в†’ Privacy & Data.
- **Soft-delete** ‘” deleted accounts cannot log in.
- **Server-side PII detection** ‘” free-text fields are checked for EGN, long digit sequences, date patterns, email addresses, and name patterns. Returns a clear 400 error and logs to the audit trail.

### AI advisor
- **Migrated to Mistral La Plateforme** — GDPR-oriented inference (EU region preferred; regional inference may fall back to global endpoint). Groq removed.
- **Free-text fields stripped** ‘” only structured clinical fields are sent; notes and free-text are never forwarded.
- **Opt-in per case** ‘” disabled by default; enabled via a toggle in the preop form.

### Features
- **Settings в†’ Privacy & Data** ‘” last login, data export, account deletion.
- **GuardedTextarea** ‘” live character counter and blur warning for EGN/MRN patterns on free-text inputs.
- **Admin / HOD case access** ‘” admins and heads of department can view and edit cases owned by any member.

### Fixes
- **Timetable timezone** ‘” times were shifting by the UTC offset on every reload; fixed by using UTC methods when reading stored times.
- **Autosave schema coercion** ‘” HTML inputs return strings; API schemas now coerce string values, preventing Zod 400 errors mid-typing.
- **Autosave no longer locks cases** ‘” postop autosave no longer promotes the case to COMPLETE; only the final submit button does.
- **PDF empty 3rd page** ‘” footer text overflow fixed.

---

## [0.2.0] ‘” 2026-05-20

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

## [0.1.0] ‘” 2026-04-01

Initial release. Preoperative, intraoperative, and postoperative data entry. PDF export. ICD-11 diagnosis search with Bulgarian translation. AI pre-operative advisor. Guided tour. Dark mode. Bilingual (English / Bulgarian).


