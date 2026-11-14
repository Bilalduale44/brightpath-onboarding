"use client";

import { PageIntro } from "@/components/app-shell";
import {
  buildAttentionItems,
  NeedsAttentionStrip,
} from "@/components/needs-attention-strip";
import { StatusBadge } from "@/components/status-badge";
import { TaskRow } from "@/components/task-row";
import { Progress } from "@/components/ui/progress";
import { useOnboarding } from "@/lib/onboarding-context";
import {
  completionPercent,
  countByStatus,
  formatShortDate,
  getTaskStatus,
  nextIncompleteTask,
} from "@/lib/status";
import type { Person } from "@/lib/types";

function HireProgressCard({ hire }: { hire: Person }) {
  const { tasksForHire, today } = useOnboarding();
  const tasks = tasksForHire(hire.id);
  const pct = completionPercent(tasks);
  const counts = countByStatus(tasks, today);
  const next = nextIncompleteTask(tasks, today);
  const overdueTasks = tasks.filter((t) => getTaskStatus(t, today) === "overdue");

  return (
    <article className="rounded-2xl border border-[var(--bp-border)] bg-[var(--bp-surface)]/90 p-5 transition-shadow duration-300 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex size-11 items-center justify-center rounded-full bg-[var(--bp-brand-soft)] text-sm font-semibold text-[var(--bp-brand)]"
            aria-hidden
          >
            {hire.avatarInitials}
          </div>
          <div>
            <h3 className="font-medium text-[var(--bp-ink)]">{hire.name}</h3>
            <p className="text-xs text-[var(--bp-muted)]">
              {hire.title} · started {hire.startDate ? formatShortDate(hire.startDate) : "—"}
            </p>
          </div>
        </div>
        <p className="text-sm font-semibold tabular-nums text-[var(--bp-ink)]">{pct}%</p>
      </div>

      <Progress value={pct} className="mt-4 h-2" />

      <div className="mt-3 flex flex-wrap gap-2">
        {counts.overdue > 0 ? <StatusBadge status="overdue" /> : null}
        <span className="text-xs text-[var(--bp-muted)] self-center">
          {counts.done} done · {counts.outstanding} outstanding · {counts.upcoming} upcoming
        </span>
      </div>

      <div className="mt-4 border-t border-[var(--bp-border)]/70 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--bp-muted)]">
          What’s next
        </p>
        {next ? (
          <ul className="mt-1">
            <TaskRow task={next} compact allowToggle={false} />
          </ul>
        ) : (
          <p className="mt-2 text-sm text-emerald-800">All tasks complete.</p>
        )}
      </div>

      {overdueTasks.length > 0 ? (
        <div className="mt-3 rounded-xl bg-rose-50/80 px-3 py-2">
          <p className="text-xs font-medium text-rose-900">
            {overdueTasks.length} overdue:{" "}
            {overdueTasks.map((t) => t.title).join(", ")}
          </p>
        </div>
      ) : null}
    </article>
  );
}

export function ManagerView() {
  const { currentPerson, hiresForManager, tasksForHire, today } = useOnboarding();
  if (!currentPerson) return null;
  const hires = hiresForManager(currentPerson.id);
  const attention = buildAttentionItems(hires, tasksForHire, today);

  return (
    <div>
      <PageIntro
        eyebrow="Team progress"
        title={`${currentPerson.name.split(" ")[0]}’s new hires`}
        description="Completion, overdue work, and the next task for each person on your team."
      />

      {hires.length === 0 ? (
        <section className="animate-bp-rise rounded-2xl border border-dashed border-[var(--bp-border)] bg-[var(--bp-surface)]/60 px-6 py-16 text-center">
          <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--bp-ink)]">
            No new hires assigned
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-[var(--bp-muted)]">
            When People Ops assigns someone to your team, their onboarding plan and progress will
            show up here.
          </p>
        </section>
      ) : (
        <>
          <NeedsAttentionStrip items={attention} />
          <div className="grid gap-4 sm:grid-cols-2">
            {hires.map((hire, i) => (
              <div
                key={hire.id}
                className="animate-bp-rise"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <HireProgressCard hire={hire} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
