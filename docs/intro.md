---
slug: /
sidebar_position: 1
title: Introduction
---

# LOSPOR — Large Open Source Perioperative Register

LOSPOR is a free, open-source **personal anaesthetic case log** for learning, portfolio, and reflection. It is designed for anaesthesiologists and is available in both **English** and **Bulgarian**.

## What does it do?

LOSPOR guides the anaesthesiologist through three forms for each case:

1. **Preoperative assessment** — patient demographics, diagnosis, airway evaluation, risk scores, vitals, and labs
2. **Intraoperative record** — real-time timetable of vital signs, drugs, agents, infusions, and fluids
3. **Postoperative recovery** — Aldrete score, pain, disposition, and handover instructions

At the end, LOSPOR automatically generates a **printable two-page anaesthesia protocol** (PDF) containing all entered data in a standardised, professionally laid out document.

## Who is it for?

- **Anaesthesiologists** recording cases and generating protocols
- **Anaesthesia nurses** contributing to case records
- **Heads of department** overseeing institutional cases and assigning staff
- **Researchers** accessing the de-identified / pseudonymised perioperative dataset

## How does it work?

```
Clinician registers → Opens new case → Fills preop form
  → Fills intraop form (live timetable) → Fills postop form
  → Protocol generated → PDF printed → De-identified data stored
```

Patient-identifiable information is **never stored**. The printed protocol leaves patient identity fields blank — fill them in by hand after printing.

## Try it

The live application is available at **[app.lospor.org](https://app.lospor.org)**.

Use the **?** button in the top-right corner to launch the guided tour, or open the **Example case walkthrough** to see a realistic pre-filled case.

## Open source

LOSPOR is licensed under the **AGPL-3.0** licence. The source code is available on [GitHub](https://github.com/kaloyandjunow-prog/lospor-app). You are free to self-host it for your institution — see the [Self-hosting guide](/self-hosting).

## What LOSPOR is and isn't

**Is:** A personal log for anaesthesiologists to record cases without direct patient identifiers, track learning, and generate a printable case summary.

**Is not:** A clinical record system, a patient management tool, or a certified medical device.

## Privacy & GDPR

LOSPOR is designed with GDPR principles in mind:
- Patient names and ID numbers are **never stored** in the database
- Each case is shown by a pseudonymised case code (e.g. `2026-0001`); internal user, institution, and timestamp linkage is retained for access control, audit, and research governance
- LOSPOR targets GDPR-oriented deployment. The hosting region, database region, AI inference region, and sub-processors depend on the deployed configuration. The default configuration uses EU-region providers (Supabase, Vercel, Mistral La Plateforme), but regional AI inference may fall back to global endpoints if the configured region is unavailable.
- Users must be authenticated to access any data
- GDPR rights (data export, account deletion) are available under Settings → Privacy & Data
