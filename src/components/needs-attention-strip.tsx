"use client";

import { formatShortDate, getTaskStatus } from "@/lib/status";
import type { AssignedTask, Person } from "@/lib/types";
import { cn } from "@/lib/utils";

export type AttentionItem = {
  hire: Person;
  overdueCount: number;
  sampleTitles: string[];
};

export function buildAttentionItems(
  hires: Person[],
  tasksForHire: (hireId: string) => AssignedTask[],
  today: string,
): AttentionItem[] {
  return hires
    .map((hire) => {
      const overdue = tasksForHire(hire.id).filter(
        (t) => getTaskStatus(t, today) === "overdue",
      );
      return {
        hire,
        overdueCount: overdue.length,
        sampleTitles: overdue.slice(0, 2).map((t) => t.title),
      };
    })
    .filter((item) => item.overdueCount > 0)
    .sort((a, b) => b.overdueCount - a.overdueCount);
}

export function NeedsAttentionStrip({
  items,
  className,
}: {
  items: AttentionItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  const totalOverdue = items.reduce((sum, i) => sum + i.overdueCount, 0);

  return (
    <section
      aria-label="Needs attention"
      className={cn(
        "mb-6 animate-bp-rise overflow-hidden rounded-2xl border border-rose-200/90 bg-gradient-to-r from-rose-50 via-orange-50/70 to-[var(--bp-surface)]",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-rose-200/60 px-4 py-3 sm:px-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-rose-800">
            Needs attention
          </p>
          <p className="mt-1 text-sm text-rose-950/80">
            {items.length === 1
              ? `${items[0].hire.name.split(" ")[0]} has ${totalOverdue} overdue task${totalOverdue === 1 ? "" : "s"}`
              : `${items.length} hires · ${totalOverdue} overdue tasks`}
          </p>
        </div>
        <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold tabular-nums text-rose-900">
          {totalOverdue} overdue
        </span>
      </div>
      <ul className="divide-y divide-rose-100/80">
        {items.map((item) => (
          <li
            key={item.hire.id}
            className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5"
          >
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-900"
              aria-hidden
            >
              {item.hire.avatarInitials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[var(--bp-ink)]">
                {item.hire.name}
                <span className="ml-2 text-xs font-normal text-[var(--bp-muted)]">
                  {item.hire.department}
                  {item.hire.startDate
                    ? ` · started ${formatShortDate(item.hire.startDate)}`
                    : null}
                </span>
              </p>
              <p className="mt-0.5 truncate text-xs text-rose-900/75">
                {item.sampleTitles.join(" · ")}
                {item.overdueCount > item.sampleTitles.length
                  ? ` · +${item.overdueCount - item.sampleTitles.length} more`
                  : null}
              </p>
            </div>
            <span className="text-xs font-semibold tabular-nums text-rose-900">
              {item.overdueCount}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
