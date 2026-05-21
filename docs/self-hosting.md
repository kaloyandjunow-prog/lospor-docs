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

# Optional — AI pre-operative advisor (EU-hosted, Mistral La Plateforme; free tier available)
MISTRAL_API_KEY="your-mistral-api-key"

# Optional — for ICD-11 diagnosis search
WHO_ICD_CLIENT_ID="your-who-client-id"
WHO_ICD_CLIENT_SECRET="your-who-client-secret"
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### WHO ICD-11 API credentials (optional)

Register at [icd.who.int/icdapi](https://icd.who.int/icdapi) — it is free and no credit card is required. These credentials enable the ICD-11 diagnosis search in the preoperative form.

## 4 — Push the database schema

```bash
npx prisma db push
```

This creates all the required tables in your database.

## 5 — Seed institutions (optional)

The Bulgarian NHIF institution list is already included. To seed it:

```bash
npx tsx prisma/seed.ts
```

## 6 — Seed ICD-11 Bulgarian translations (optional)

If you want Bulgarian-language ICD-11 codes in the search, run the translation seeder. This requires a **Mistral API key** (free tier is sufficient):

```bash
# Add MISTRAL_API_KEY to .env first
npx tsx prisma/seed-icd11-bg.ts
```

The seeder is resumable — you can run it multiple times and it will skip already-translated codes.

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
npx prisma db push   # apply any new schema changes
```

Commit and push to trigger a Vercel redeployment.

## Creating the first admin

After registering your first account, promote it to admin directly in the Supabase table editor:

1. Supabase → **Table Editor** → `User` table
2. Find your user row → set `role` to `ADMIN`
3. Refresh the app — the Admin panel appears in the navigation bar

## Licence

LOSPOR is licensed under **AGPL-3.0**. Self-hosted installations must make their source code available to users if modified. The unmodified code is already open source at GitHub.
