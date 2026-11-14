# Assumptions & tradeoffs

Prototype for BrightPath Scenario 1 (new employee onboarding). The customer ask was incomplete on purpose; these are the bets behind v1.

## Guesses and why

1. **One checklist per hire, assembled from company baseline + department template**  
   Sarah wants “one place.” David wants department differences. v1 shows **static sample plans** (Engineering vs Sales + shared baseline) and assigns the right template per hire. Auto-create by role is deferred, but the data model already separates company vs department tasks.

2. **Statuses = done / outstanding / upcoming (+ overdue)**  
   Sarah asked for completed, outstanding, and upcoming. **Overdue** is outstanding past due date — managers need it, and it exercises a non-happy path.

3. **“Focus now” = up to 3 actionable tasks**  
   Emily doesn’t want 40 items at once. Focus now shows overdue first, then highest `focusPriority`, capped at three. The full list stays in phase tabs.

4. **Phases keyed off start date**  
   Pre–Day 1 tasks use negative due offsets from start date; First weeks use positive. Demo calendar is pinned to **2026-11-03**.

5. **Mock login instead of real auth**  
   Assignment allows mock roles. A persona picker (“Sign in”) stands in for SSO; no passwords. Personas: Sarah (HR), David & Alex & Jordan (managers), Emily / Marcus / Priya (hires). Header **Switch user** returns to the picker.

6. **Managers see only their direct new hires**  
   Reasonable for ~150 people; HR sees all open hires.

7. **Employees can check off their own tasks**  
   Assumed self-serve completion with a simulated conflict if two systems update at once (Marcus + benefits).

## Stakeholder tension

| Person | Need | How v1 handles it |
| --- | --- | --- |
| **David** | Different checklists by department | Sample Engineering vs Sales plans in HR view; hires get the matching template |
| **Emily** | Don’t overwhelm | Focus now (≤3) + phase tabs; progress % without dumping everything |

Neither got the eventual “auto-create by role” system — that needs rules Sarah hasn’t specified.

## Left out (on purpose)

- Real SSO / auth, database, notifications / email
- Auto-creating plans by role or department rules engine
- Full HR admin CRUD for every field / template editor
- Native mobile app
- Manager-only tasks, buddy workflows, IT ticketing integrations
- Multi-language, accessibility audit beyond basic labels, dark mode

## What I’d ask Sarah next

1. Who is allowed to mark a task done — hire only, manager, People Ops, or all three?
2. Should overdue tasks escalate (nudge email / Slack) and after how many days?
3. Which departments need first-class templates beyond Eng and Sales?
4. For auto-create: is the key input **job family**, **manager**, **location**, or a Hire ticket field?
5. Do contractors and interns use the same plans?
6. What’s the source of truth for start date and manager today (HRIS)?
