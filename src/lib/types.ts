export type RoleView = "employee" | "manager" | "hr";

export type Department = "Engineering" | "Sales" | "People";

export type TaskPhase = "pre-day-1" | "first-weeks";

export type TaskStatus = "done" | "outstanding" | "upcoming" | "overdue";

export type Person = {
  id: string;
  name: string;
  title: string;
  department: Department;
  email: string;
  role: RoleView;
  /** Manager this person reports to (for new hires / ICs). */
  managerId?: string;
  startDate?: string; // ISO date
  avatarInitials: string;
};

export type TaskTemplate = {
  id: string;
  title: string;
  description: string;
  phase: TaskPhase;
  /** Relative due offset from start date in days (negative = before start). */
  dueOffsetDays: number;
  department?: Department; // undefined = company-wide
  ownerHint: "employee" | "manager" | "hr";
  focusPriority: number; // lower = show first in Focus now
};

export type AssignedTask = {
  id: string;
  templateId: string;
  hireId: string;
  title: string;
  description: string;
  phase: TaskPhase;
  dueDate: string; // ISO date
  completedAt?: string;
  ownerHint: "employee" | "manager" | "hr";
  focusPriority: number;
};

export type DepartmentPlan = {
  department: Department;
  name: string;
  summary: string;
  taskTemplateIds: string[];
};
