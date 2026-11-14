import { DEMO_TODAY } from "./data";
import type { AssignedTask, TaskStatus } from "./types";

export function getTaskStatus(
  task: AssignedTask,
  today: string = DEMO_TODAY,
): TaskStatus {
  if (task.completedAt) return "done";
  if (task.dueDate < today) return "overdue";
  if (task.dueDate === today) return "outstanding";
  // Due within the next 3 days counts as outstanding (actionable now)
  const due = new Date(`${task.dueDate}T12:00:00Z`).getTime();
  const now = new Date(`${today}T12:00:00Z`).getTime();
  const days = (due - now) / (1000 * 60 * 60 * 24);
  if (days <= 3) return "outstanding";
  return "upcoming";
}

export function formatShortDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function completionPercent(tasks: AssignedTask[]): number {
  if (tasks.length === 0) return 0;
  const done = tasks.filter((t) => t.completedAt).length;
  return Math.round((done / tasks.length) * 100);
}

export function focusNowTasks(
  tasks: AssignedTask[],
  today: string = DEMO_TODAY,
  limit = 3,
): AssignedTask[] {
  const actionable = tasks
    .filter((t) => {
      const s = getTaskStatus(t, today);
      return s === "outstanding" || s === "overdue";
    })
    .sort((a, b) => {
      const sa = getTaskStatus(a, today);
      const sb = getTaskStatus(b, today);
      // Overdue first, then by focusPriority, then due date
      if (sa === "overdue" && sb !== "overdue") return -1;
      if (sb === "overdue" && sa !== "overdue") return 1;
      if (a.focusPriority !== b.focusPriority) {
        return a.focusPriority - b.focusPriority;
      }
      return a.dueDate.localeCompare(b.dueDate);
    });
  return actionable.slice(0, limit);
}

export function nextIncompleteTask(
  tasks: AssignedTask[],
  today: string = DEMO_TODAY,
): AssignedTask | undefined {
  return focusNowTasks(tasks, today, 1)[0];
}

export function countByStatus(tasks: AssignedTask[], today: string = DEMO_TODAY) {
  const counts = { done: 0, outstanding: 0, upcoming: 0, overdue: 0 };
  for (const t of tasks) {
    counts[getTaskStatus(t, today)] += 1;
  }
  return counts;
}
