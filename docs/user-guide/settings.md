---
sidebar_position: 8
title: Settings
---

# Settings

Access settings by tapping the **⚙** gear icon (web) or the person/gear icon in the navigation bar (mobile).

## Navigation

Settings is organised into two levels:

- **Profile** — your name, title, and institution; edit institution
- **Settings** — UI preferences, automation, privacy & data
- **Admin console** — visible only to LOSPOR administrators
- **Sign out** — always visible as a separate button at the bottom

---

## Profile

The profile screen shows your **full name**, **title**, and **institution**.

### Edit institution

Tap **Edit** next to your institution name to open the institution picker. Search for your institution by name and select it from the list. Only institutions already registered in LOSPOR appear in the list — contact your administrator if your institution is missing.

### View profile

Full profile editing (name, title, email) is available from the web app under Settings → Profile.

---

## Settings

### UI

#### Language
Switch between **English** and **Bulgarian** (Български). The change applies immediately across the entire app.

#### Theme
Choose **Light** or **Dark** mode. Dark mode is the default.

#### Preop layout *(mobile)*
- **Sections** — opens each section of the preoperative form in a focused editor (default)
- **Scroll** — all sections on a single scrollable page

### Automation

#### Favourite intraoperative drugs and infusions
Choose up to 8 favourite bolus drugs and up to 8 favourite infusions. These are synced in your user profile and appear as the first action in the mobile/PWA intraoperative drug and infusion pickers.

### Offline data

- **Web — offline save queue** *(Privacy tab)*: saves made without a connection wait in the browser until they sync; the counter shows how many, and a discard control removes them permanently (server-synced cases are unaffected).
- **Mobile — Unsaved events** *(Privacy & Data)*: intraoperative events the server permanently rejected are kept on the device so no clinical data is silently lost; this screen lets you review and clear them.
- **Mobile — Clear local clinical cache** *(Privacy & Data)*: removes offline drafts and queued saves from the device only.

#### Auto-fill vitals
Master switch for automatic intraoperative vital carry-forward. When enabled,
LOSPOR copies the previous EtCO2, SpO2, and temperature into each missed empty
5-minute timetable column as time advances.

#### Auto-fill BP & HR
Child option that requires **Auto-fill vitals**. It also carries forward
systolic blood pressure, diastolic blood pressure, and heart rate.

#### Backfill on reopen
Child option that requires **Auto-fill vitals**. When an in-progress case is
reopened, LOSPOR fills empty timetable columns between the last recorded vitals
and the current time.

Turning off **Auto-fill vitals** also turns off the child options on web and
mobile, so hidden stale settings cannot generate observations later.

#### Background refresh
Keeps the case list and active case updated in the background.

### Privacy & Data

#### Privacy Policy
Opens the LOSPOR Privacy Policy.

#### Terms of Service
Opens the LOSPOR Terms of Service.

#### About
Shows the current app version and links to the documentation site.

#### Report a bug
Provides a way to report issues to the LOSPOR team.

#### Export my data
Downloads one ZIP archive containing a manifest, your account details, every
case with its clinical and audit relations, complete audit history, role
requests, and case-transfer history. The API pages through large accounts
internally rather than silently stopping at a fixed row limit. Password hashes,
authentication tokens, temporary locks, and rate-limit records are excluded
and listed in the manifest. This archive supports the preparation of a response
to a right-of-access request under **GDPR Article 15**.

#### Delete my account
Disables your account access immediately. Type `DELETE` in the confirmation field and click **Confirm deletion**. The presented mobile token is revoked, and further deletion or anonymisation is processed according to the retention policy.

:::warning Irreversible
Account deletion cannot be undone. Download your data first if you need to keep a copy.
:::

---

## Admin console

Visible to administrators only. Provides access to:

- **Registrations** — review recently registered accounts (accounts activate via email verification; admin approval is no longer required for login)
- **User management** — view roles, assign HOD status
- **Institution management** — add or edit institutions

---

## Security & Access

### Request Head of Department role
If you are the head of your anaesthesia department, you can request the **HOD** role by opening Settings → **Settings** and scrolling to the Security & Access section. Your request is reviewed and approved by a LOSPOR administrator.

The HOD role grants:
- Visibility of all cases in your institution
- Ability to assign cases to other members instantly (without their acceptance)

---

## Notifications (case reminders)

Open Settings → **Settings** → **Notifications** to turn on **Case reminders**.
When enabled, LOSPOR reminds you to chart vitals during an active case at the
interval you choose (3, 5, 10, or 15 minutes); the timer resets each time you
record a set of vitals. Use **Send test notification** to confirm notifications
are allowed on your device.

- In the installed app, reminders fire even when the app is in the background.
- In the browser PWA, reminders work while it is open, and require the site to be
  opened over **HTTPS** (the status line tells you if notifications are blocked,
  e.g. on an insecure address).
