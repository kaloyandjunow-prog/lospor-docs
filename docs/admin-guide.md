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

1. Go to **Settings** (⚙ icon) → **Security & Access**
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

## First administrator

The first administrator account must be set directly in the database. In Supabase:

1. Go to your project → **Table Editor** → `User` table
2. Find the user you want to make an admin
3. Set their `role` column to `ADMIN`

Subsequent admins can be promoted by existing admins via the Admin panel.
