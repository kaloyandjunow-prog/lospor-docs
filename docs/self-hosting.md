---
sidebar_position: 4
title: Self-hosting
---

# Self-hosting Guide

LOSPOR can be self-hosted by any institution on their own infrastructure. The application is a standard Next.js app backed by a PostgreSQL database.

## Requirements

- **Node.js** 18 or later
- **PostgreSQL** database (Supabase recommended — free tier is sufficient)
- A **Vercel** account (free Hobby tier is sufficient) or any server running Node.js

## 1 — Get the code

```bash
git clone https://github.com/kaloyandjunow-prog/lospor-app.git
cd lospor-app
npm install
```

## 2 — Set up the database

Create a free project at [supabase.com](https://supabase.com). After creating the project:

1. Go to **Project Settings** → **Database** → **Connection String**
2. Copy the **Transaction** pooler URI (port 6543) — this is your `DATABASE_URL`
3. Copy the **Direct** connection URI (port 5432) — this is your `DIRECT_URL`

## 3 — Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://postgres.<ref>:<pass>@aws-<region>.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.<ref>:<pass>@aws-<region>.pooler.supabase.com:5432/postgres"
NEXTAUTH_SECRET="your-random-secret"   # openssl rand -base64 32
NEXTAUTH_URL="https://your-domain.com"

# Optional — AI pre-operative advisor and lab scan (EU-hosted, Mistral La Plateforme; free tier available)
MISTRAL_API_KEY="your-mistral-api-key"
MISTRAL_API_BASE="https://api.mistral.ai/v1"   # optional — override for compatible providers
MISTRAL_MODEL="open-mistral-7b"                 # optional — override model

```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## 4 — Apply the database schema

```bash
npx prisma migrate deploy
```

This creates all the required tables in your database.

## 5 — Seed institutions (optional)

The Bulgarian NHIF institution list is already included. To seed it:

```bash
npx tsx prisma/seed.ts
```

## 6 — Seed ICD-10 vocabulary (required for diagnosis search)

Diagnosis and comorbidity search requires the ICD-10 vocabulary to be seeded.
Download the vocabulary bundle from [athena.ohdsi.org](https://athena.ohdsi.org/vocabulary/list)
(select at minimum: ICD10, ICD10CM, ATC) and place the CSV files in a local folder.
Then run:

```bash
npx tsx scripts/seed-vocabularies.ts --vocab-dir /path/to/athena-csvs
npx tsx scripts/seed-lab-loinc.ts
```

Both scripts are idempotent and safe to re-run. Bulgarian ICD-10 labels are loaded
from an Excel file matching `ICD10_*.xlsx` in the same folder (official MZ export).

## 7 — Run in development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## 8 — Deploy to Vercel

1. Push your code to a GitHub repository (private is fine)
2. Import the project at [vercel.com](https://vercel.com)
3. Set all environment variables in the Vercel dashboard
4. Deploy

Vercel automatically handles SSL, CDN, and zero-downtime deployments.

## 9 — Custom domain

In Vercel, go to **Settings** → **Domains** and add your domain. Configure the DNS records as directed by Vercel.

Update `NEXTAUTH_URL` to your production domain and redeploy.

## Updating

To update to a newer version of LOSPOR:

```bash
git pull origin main
npm install
npx prisma migrate deploy   # apply tracked migrations (production-safe)
```

Commit and push to trigger a Vercel redeployment.

## Creating the first admin

After registering your first account, promote it to admin directly in the Supabase table editor:

1. Supabase → **Table Editor** → `User` table
2. Find your user row → set `role` to `ADMIN`
3. Refresh the app — the Admin panel appears in the navigation bar

## Licence

LOSPOR is licensed under **AGPL-3.0**. Self-hosted installations must make their source code available to users if modified. The unmodified code is already open source at GitHub.
