import type {
  AssignedTask,
  DepartmentPlan,
  Person,
  TaskTemplate,
} from "./types";

/** Anchor “today” for deterministic demo statuses. */
export const DEMO_TODAY = "2026-11-03";

export const people: Person[] = [
  {
    id: "sarah",
    name: "Sarah Chen",
    title: "HR Manager",
    department: "People",
    email: "sarah.chen@brightpath.tech",
    role: "hr",
    avatarInitials: "SC",
  },
  {
    id: "david",
    name: "David Okonkwo",
    title: "Engineering Manager",
    department: "Engineering",
    email: "david.okonkwo@brightpath.tech",
    role: "manager",
    avatarInitials: "DO",
  },
  {
    id: "alex",
    name: "Alex Rivera",
    title: "Sales Manager",
    department: "Sales",
    email: "alex.rivera@brightpath.tech",
    role: "manager",
    avatarInitials: "AR",
  },
  {
    id: "jordan",
    name: "Jordan Lee",
    title: "Product Manager",
    department: "Engineering",
    email: "jordan.lee@brightpath.tech",
    role: "manager",
    avatarInitials: "JL",
  },
  {
    id: "emily",
    name: "Emily Park",
    title: "Software Engineer",
    department: "Engineering",
    email: "emily.park@brightpath.tech",
    role: "employee",
    managerId: "david",
    startDate: "2026-11-10",
    avatarInitials: "EP",
  },
  {
    id: "marcus",
    name: "Marcus Webb",
    title: "Account Executive",
    department: "Sales",
    email: "marcus.webb@brightpath.tech",
    role: "employee",
    managerId: "alex",
    startDate: "2026-10-20",
    avatarInitials: "MW",
  },
  {
    id: "priya",
    name: "Priya Nair",
    title: "Platform Engineer",
    department: "Engineering",
    email: "priya.nair@brightpath.tech",
    role: "employee",
    managerId: "david",
    startDate: "2026-10-06",
    avatarInitials: "PN",
  },
];

export const taskTemplates: TaskTemplate[] = [
  // Company-wide pre–day 1
  {
    id: "tpl-offer-packet",
    title: "Complete offer & tax paperwork",
    description: "Sign offer letter, W-4 / I-9 equivalents, and direct deposit form in the HR portal.",
    phase: "pre-day-1",
    dueOffsetDays: -7,
    ownerHint: "employee",
    focusPriority: 1,
  },
  {
    id: "tpl-background",
    title: "Authorize background check",
    description: "Submit consent so People Ops can clear you before day one.",
    phase: "pre-day-1",
    dueOffsetDays: -5,
    ownerHint: "employee",
    focusPriority: 2,
  },
  {
    id: "tpl-welcome-call",
    title: "Book welcome call with People Ops",
    description: "15-minute call to cover first-day logistics and Q&A.",
    phase: "pre-day-1",
    dueOffsetDays: -3,
    ownerHint: "employee",
    focusPriority: 3,
  },
  {
    id: "tpl-equipment",
    title: "Confirm equipment shipping address",
    description: "Laptop and accessories ship to the address you confirm.",
    phase: "pre-day-1",
    dueOffsetDays: -4,
    ownerHint: "employee",
    focusPriority: 4,
  },
  // Company-wide first weeks
  {
    id: "tpl-handbook",
    title: "Read employee handbook",
    description: "Acknowledge the BrightPath handbook and code of conduct.",
    phase: "first-weeks",
    dueOffsetDays: 3,
    ownerHint: "employee",
    focusPriority: 10,
  },
  {
    id: "tpl-benefits",
    title: "Enroll in benefits",
    description: "Choose medical, dental, vision, and 401(k) within 30 days.",
    phase: "first-weeks",
    dueOffsetDays: 14,
    ownerHint: "employee",
    focusPriority: 12,
  },
  {
    id: "tpl-buddy",
    title: "Meet your onboarding buddy",
    description: "Schedule a coffee chat with the buddy People Ops assigned.",
    phase: "first-weeks",
    dueOffsetDays: 5,
    ownerHint: "employee",
    focusPriority: 11,
  },
  {
    id: "tpl-manager-1on1",
    title: "First 1:1 with your manager",
    description: "Align on 30/60/90 goals and working preferences.",
    phase: "first-weeks",
    dueOffsetDays: 2,
    ownerHint: "employee",
    focusPriority: 9,
  },
  // Engineering-specific
  {
    id: "tpl-eng-github",
    title: "Request GitHub & SSO access",
    description: "Submit IT ticket for GitHub Org, Okta groups, and VPN.",
    phase: "pre-day-1",
    dueOffsetDays: -2,
    department: "Engineering",
    ownerHint: "employee",
    focusPriority: 5,
  },
  {
    id: "tpl-eng-laptop",
    title: "Set up local dev environment",
    description: "Follow the Eng wiki: clone starter repos, install toolchain, run hello-world.",
    phase: "first-weeks",
    dueOffsetDays: 4,
    department: "Engineering",
    ownerHint: "employee",
    focusPriority: 8,
  },
  {
    id: "tpl-eng-arch",
    title: "Architecture overview with tech lead",
    description: "Attend the 60-minute systems walkthrough for your squad.",
    phase: "first-weeks",
    dueOffsetDays: 7,
    department: "Engineering",
    ownerHint: "employee",
    focusPriority: 13,
  },
  {
    id: "tpl-eng-pr",
    title: "Land your first pull request",
    description: "Ship a small fix or docs change with a teammate reviewing.",
    phase: "first-weeks",
    dueOffsetDays: 10,
    department: "Engineering",
    ownerHint: "employee",
    focusPriority: 14,
  },
  // Sales-specific
  {
    id: "tpl-sales-crm",
    title: "Get Salesforce seat provisioned",
    description: "Confirm CRM login and complete the security quiz.",
    phase: "pre-day-1",
    dueOffsetDays: -2,
    department: "Sales",
    ownerHint: "employee",
    focusPriority: 5,
  },
  {
    id: "tpl-sales-product",
    title: "Complete product certification",
    description: "Finish BrightPath product modules 1–4 in the LMS.",
    phase: "first-weeks",
    dueOffsetDays: 7,
    department: "Sales",
    ownerHint: "employee",
    focusPriority: 8,
  },
  {
    id: "tpl-sales-shadow",
    title: "Shadow two discovery calls",
    description: "Sit in with a senior AE and log takeaways in Notion.",
    phase: "first-weeks",
    dueOffsetDays: 10,
    department: "Sales",
    ownerHint: "employee",
    focusPriority: 13,
  },
  {
    id: "tpl-sales-quota",
    title: "Review territory & quota with manager",
    description: "Align on ramp plan, accounts, and weekly metrics.",
    phase: "first-weeks",
    dueOffsetDays: 3,
    department: "Sales",
    ownerHint: "employee",
    focusPriority: 9,
  },
];

export const departmentPlans: DepartmentPlan[] = [
  {
    department: "Engineering",
    name: "Engineering new-hire plan",
    summary:
      "Company baseline plus GitHub/SSO, local setup, architecture walkthrough, and a first PR.",
    taskTemplateIds: [
      "tpl-offer-packet",
      "tpl-background",
      "tpl-welcome-call",
      "tpl-equipment",
      "tpl-eng-github",
      "tpl-handbook",
      "tpl-benefits",
      "tpl-buddy",
      "tpl-manager-1on1",
      "tpl-eng-laptop",
      "tpl-eng-arch",
      "tpl-eng-pr",
    ],
  },
  {
    department: "Sales",
    name: "Sales new-hire plan",
    summary:
      "Company baseline plus Salesforce, product certification, call shadows, and territory review.",
    taskTemplateIds: [
      "tpl-offer-packet",
      "tpl-background",
      "tpl-welcome-call",
      "tpl-equipment",
      "tpl-sales-crm",
      "tpl-handbook",
      "tpl-benefits",
      "tpl-buddy",
      "tpl-manager-1on1",
      "tpl-sales-product",
      "tpl-sales-shadow",
      "tpl-sales-quota",
    ],
  },
  {
    department: "People",
    name: "People Ops shared baseline",
    summary: "Company-wide tasks every BrightPath hire completes, regardless of department.",
    taskTemplateIds: [
      "tpl-offer-packet",
      "tpl-background",
      "tpl-welcome-call",
      "tpl-equipment",
      "tpl-handbook",
      "tpl-benefits",
      "tpl-buddy",
      "tpl-manager-1on1",
    ],
  },
];

function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function buildTasksForHire(
  hire: Person,
  templateIds: string[],
  completions: Record<string, string | undefined>,
): AssignedTask[] {
  if (!hire.startDate) return [];
  return templateIds.map((templateId) => {
    const tpl = taskTemplates.find((t) => t.id === templateId)!;
    const dueDate = addDays(hire.startDate!, tpl.dueOffsetDays);
    const completedAt = completions[templateId];
    return {
      id: `${hire.id}-${templateId}`,
      templateId,
      hireId: hire.id,
      title: tpl.title,
      description: tpl.description,
      phase: tpl.phase,
      dueDate,
      completedAt,
      ownerHint: tpl.ownerHint,
      focusPriority: tpl.focusPriority,
    };
  });
}

const engPlanIds =
  departmentPlans.find((p) => p.department === "Engineering")!.taskTemplateIds;
const salesPlanIds =
  departmentPlans.find((p) => p.department === "Sales")!.taskTemplateIds;

/** Seeded assigned tasks for demo hires. */
export function createInitialAssignments(): AssignedTask[] {
  const emily = people.find((p) => p.id === "emily")!;
  const marcus = people.find((p) => p.id === "marcus")!;
  const priya = people.find((p) => p.id === "priya")!;

  // Emily starts Nov 10 — mostly pre–day 1 outstanding / upcoming; a couple done.
  const emilyTasks = buildTasksForHire(emily, engPlanIds, {
    "tpl-offer-packet": "2026-10-28",
    "tpl-background": "2026-10-30",
  });

  // Marcus started Oct 20 — mid-ramp with overdue items for conflict/overdue demo.
  const marcusTasks = buildTasksForHire(marcus, salesPlanIds, {
    "tpl-offer-packet": "2026-10-12",
    "tpl-background": "2026-10-13",
    "tpl-welcome-call": "2026-10-15",
    "tpl-equipment": "2026-10-14",
    "tpl-sales-crm": "2026-10-18",
    "tpl-handbook": "2026-10-22",
    "tpl-manager-1on1": "2026-10-21",
    "tpl-sales-quota": "2026-10-23",
    // benefits overdue, buddy overdue, product/shadow outstanding
  });

  // Priya started Oct 6 — all done (celebration / empty outstanding state).
  const priyaCompletions: Record<string, string> = {};
  for (const id of engPlanIds) {
    priyaCompletions[id] = "2026-10-20";
  }
  const priyaTasks = buildTasksForHire(priya, engPlanIds, priyaCompletions);

  return [...emilyTasks, ...marcusTasks, ...priyaTasks];
}

export const viewAsOptions = [
  {
    id: "emily",
    label: "Emily Park — New employee (Eng)",
    role: "employee" as const,
  },
  {
    id: "marcus",
    label: "Marcus Webb — New employee (Sales)",
    role: "employee" as const,
  },
  {
    id: "priya",
    label: "Priya Nair — New employee (done)",
    role: "employee" as const,
  },
  {
    id: "david",
    label: "David Okonkwo — Eng manager",
    role: "manager" as const,
  },
  {
    id: "alex",
    label: "Alex Rivera — Sales manager",
    role: "manager" as const,
  },
  {
    id: "jordan",
    label: "Jordan Lee — Manager (no hires)",
    role: "manager" as const,
  },
  {
    id: "sarah",
    label: "Sarah Chen — HR",
    role: "hr" as const,
  },
];
