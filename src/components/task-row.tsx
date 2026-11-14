"use client";

import { StatusBadge } from "@/components/status-badge";
import { formatShortDate, getTaskStatus } from "@/lib/status";
import { useOnboarding } from "@/lib/onboarding-context";
import type { AssignedTask } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TaskRow({
  task,
  compact = false,
  allowToggle = true,
}: {
  task: AssignedTask;
  compact?: boolean;
  allowToggle?: boolean;
}) {
  const { today, toggleTaskComplete } = useOnboarding();
  const status = getTaskStatus(task, today);
  const done = status === "done";

  return (
    <li
      className={cn(
        "group flex gap-3 border-b border-[var(--bp-border)]/60 py-3.5 last:border-b-0",
        "transition-colors duration-200 hover:bg-[var(--bp-tint)]/40",
        compact && "py-2.5",
      )}
    >
      {allowToggle ? (
        <div className="pt-0.5">
          <input
            type="checkbox"
            checked={done}
            onChange={() => toggleTaskComplete(task.id)}
            aria-label={`Mark ${task.title} ${done ? "incomplete" : "complete"}`}
            className="size-4 cursor-pointer rounded border-[var(--bp-border)] accent-[var(--bp-brand)]"
          />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={cn(
              "text-sm font-medium text-[var(--bp-ink)]",
              done && "text-[var(--bp-muted)] line-through",
            )}
          >
            {task.title}
          </p>
          <StatusBadge status={status} />
        </div>
        {!compact ? (
          <p className="mt-1 text-sm leading-relaxed text-[var(--bp-muted)]">
            {task.description}
          </p>
        ) : null}
        <p className="mt-1.5 text-xs text-[var(--bp-muted)]">
          Due {formatShortDate(task.dueDate)}
          {task.completedAt ? ` · Completed ${formatShortDate(task.completedAt)}` : null}
        </p>
      </div>
    </li>
  );
}
