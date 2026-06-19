---
sidebar_position: 3
title: Administrator & HOD Guide
---

# Administrator & HOD Guide

## Roles

LOSPOR has three user roles:

| Role | Capabilities |
|------|-------------|
| **Member** (default) | Record and view their own cases only |
| **Head of Department (HOD)** | View and edit all cases in their institution; transfer cases to any member of their institution |
| **Admin** | View and edit all cases across all institutions; approve role requests; manage users |

## Requesting HOD role

1. Go to **Settings** (⚙ icon) → **Settings** → scroll to **Security & Access**
2. Click **Request Head of Department role**
3. Your request is submitted to the LOSPOR administrator

The administrator will review and approve or reject the request.

## HOD capabilities

### Viewing and editing institutional cases

As an HOD, the dashboard shows **all cases in your institution**, not just your own. The case owner's name is shown on each row. You can open and edit any case in your institution.

### Transferring cases

You can transfer any case in your institution to any member of the **same institution**, instantly and without requiring their acceptance:

1. Find the case on your dashboard
2. Click the **Hand over / Assign** button
3. Select the target colleague
4. Click **Assign now**

The transfer is immediate.

## Admin panel

Administrators have access to the **Admin** page (visible in the navigation bar as a shield icon).

### Pending role requests

All pending HOD role requests are listed here. For each request:
- **Approve** — grants the user the HOD role
- **Reject** — denies the request

### User management

A table of all registered users is shown with their name, email, institution, and current role. Administrators can:
- Promote a Member to HOD
- Demote an HOD to Member

Admin roles cannot be changed through the UI.

## OMOP CDM export

LOSPOR can export the anonymised dataset in OMOP CDM v5.4 format for research use. The export is available to admins only.

1. Open the **Admin** panel (shield icon in the navigation bar)
2. Scroll to the **Research export** section
3. Click **Export JSON** for a full OMOP bundle, or **Export CSV** for a flat multi-table CSV

The export contains: `visit_occurrence`, `condition_occurrence` (diagnoses and comorbidities in ICD-10), `drug_exposure` (intraoperative drugs with ATC code), `measurement` (preoperative vitals and LOINC-coded lab results), `procedure_occurrence`, and `observation` (ASA, RCRI, Apfel, STOP-BANG, airway assessment, fluid totals, postop disposition).

:::info Anonymisation
`person_id` is a deterministic hash of the internal case ID — no patient identifiers are stored or exported. All data is at case level; month/year only, no exact surgery date.
:::

:::note Research quality
Drug exposure is sourced from the intraoperative event log (ATC-coded where available). Lab measurements include LOINC codes and canonical SI units. `condition_concept_id` and `drug_concept_id` are `0` where OMOP standard vocabulary mapping is not yet available; the source ICD-10 / ATC code is always in the `*_source_value` column.
:::

## First administrator

The first administrator account must be set directly in the database. In Supabase:

1. Go to your project → **Table Editor** → `User` table
2. Find the user you want to make an admin
3. Set their `role` column to `ADMIN`

Subsequent admins can be promoted by existing admins via the Admin panel.
