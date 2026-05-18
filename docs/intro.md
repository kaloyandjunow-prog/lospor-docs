---
slug: /
sidebar_position: 1
title: Introduction
---

# LOSPOR — Large Open Source Perioperative Register

LOSPOR is a free, open-source web application for anaesthesiologists to record perioperative data and generate standardised anaesthesia protocols. It is designed for clinical use in Bulgaria and is available in both **English** and **Bulgarian**.

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
- **Researchers** accessing the anonymised perioperative dataset

## How does it work?

```
Clinician registers → Opens new case → Fills preop form
  → Fills intraop form (live timetable) → Fills postop form
  → Protocol generated → PDF printed → Anonymised data stored
```

Patient-identifiable information (name, ID number) is entered **only at print time** and is never uploaded or stored in the database.

## Try it

The live application is available at **[app.lospor.org](https://app.lospor.org)**.

Use the **?** button in the top-right corner to launch the guided tour, or open the **Example case walkthrough** to see a realistic pre-filled case.

## Open source

LOSPOR is licensed under the **AGPL-3.0** licence. The source code is available on [GitHub](https://github.com/kaloyandjunow-prog/lospor-app). You are free to self-host it for your institution — see the [Self-hosting guide](/self-hosting).

## Privacy & GDPR

LOSPOR is designed with GDPR compliance in mind:
- Patient names and ID numbers are **never stored** in the database
- Each case is linked only to an anonymised case code
- All data is stored in the EU (Supabase, Frankfurt region)
- Users must be authenticated to access any data
