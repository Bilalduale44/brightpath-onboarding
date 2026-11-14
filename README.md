# BrightPath Onboarding (Scenario 1 prototype)

Working web prototype for **BrightPath Technologies** new-employee onboarding — built for the MangoApps Associate Product Manager (AI Builder) take-home.

New hires see one checklist with **Pre–Day 1** and **First weeks** phases, clear status, and a **Focus now** strip so they aren’t flooded. Managers see hire progress; People Ops sees open hires plus **department sample plans** (Engineering vs Sales).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- In-repo mock data only (no auth, DB, or backend)

## How to run

```bash
npm install
npm run dev -- --port 3847
```

Open [http://localhost:3847](http://localhost:3847).

Other scripts:

```bash
npm run build
npm start -- --port 3847
npm run lint
```

## How to demo (mock login)

Open the app and **pick a persona** on the mock sign-in screen (no password). Use **Switch user** in the header to return to that screen.

| Persona | What to show |
| --- | --- |
| **Emily Park** (Eng new hire) | Focus now + Pre–Day 1 / First weeks tabs; mark tasks complete |
| **Marcus Webb** (Sales) | Mid-ramp hire with **overdue** tasks; first click on *Enroll in benefits* simulates a conflict |
| **Priya Nair** | All tasks done empty/celebration state |
| **David Okonkwo** | Eng manager progress for Emily + Priya |
| **Alex Rivera** | Sales manager progress for Marcus |
| **Jordan Lee** | Manager with **no hires** empty state |
| **Sarah Chen** | HR overview + Engineering / Sales / baseline sample plans |

Corner control: **Simulate load error** → **Try again**.

Demo “today” is fixed at **2026-11-03** so statuses stay stable in walkthroughs.

## What’s in / out of scope

See [ASSUMPTIONS.md](./ASSUMPTIONS.md) for guesses, stakeholder tradeoffs, what was left out, and questions for Sarah.

## Live demo

Deployed at [https://brightpath-onboarding-rose.vercel.app](https://brightpath-onboarding-rose.vercel.app).
