"use client";

import { PageIntro } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { TaskRow } from "@/components/task-row";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOnboarding } from "@/lib/onboarding-context";
import {
  completionPercent,
  countByStatus,
  focusNowTasks,
  formatShortDate,
} from "@/lib/status";
import type { AssignedTask, TaskPhase } from "@/lib/types";

function PhaseList({
  tasks,
  phase,
  emptyLabel,
}: {
  tasks: AssignedTask[];
  phase: TaskPhase;
  emptyLabel: string;
}) {
  const filtered = tasks.filter((t) => t.phase === phase);
  if (filtered.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-[var(--bp-muted)]">{emptyLabel}</p>
    );
  }
  return (
    <ul>
      {filtered.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </ul>
  );
}

export function EmployeeView() {
  const { currentPerson, tasksForHire, today } = useOnboarding();
  if (!currentPerson) return null;
  const tasks = tasksForHire(currentPerson.id);
  const pct = completionPercent(tasks);
  const counts = countByStatus(tasks, today);
  const focus = focusNowTasks(tasks, today, 3);
  const allDone = tasks.length > 0 && counts.done === tasks.length;

  return (
    <div>
      <PageIntro
        eyebrow="Your checklist"
        title={`Welcome, ${currentPerson.name.split(" ")[0]}`}
        description={
          currentPerson.startDate
            ? `Start date ${formatShortDate(currentPerson.startDate)} · ${currentPerson.department}. Start with Focus now below — then open Pre–Day 1 or First weeks when you want the full plan.`
            : "Your onboarding plan will appear here once People Ops assigns a start date."
        }
      />

      {allDone ? (
        <section className="mb-8 animate-bp-rise rounded-2xl border border-emerald-200/80 bg-emerald-50/80 px-6 py-8 text-center">
          <p className="font-[family-name:var(--font-display)] text-2xl text-emerald-950">
            You’re all caught up
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-emerald-900/80">
            Every onboarding task is done. Your manager can still see this history; nothing else is
            outstanding.
          </p>
        </section>
      ) : (
        <section
          id="focus-now"
          aria-labelledby="focus-now-heading"
          className="mb-8 animate-bp-rise scroll-mt-6 rounded-2xl border-2 border-[var(--bp-brand)]/35 bg-[var(--bp-surface)]/95 p-5 shadow-[0_0_0_4px_rgba(234,88,12,0.06)] sm:p-6"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--bp-brand)]">
                Focus now
              </p>
              <h2
                id="focus-now-heading"
                className="mt-1 font-[family-name:var(--font-display)] text-xl text-[var(--bp-ink)] sm:text-2xl"
              >
                {focus.length === 0
                  ? "Nothing urgent today"
                  : focus.length === 1
                    ? "One thing to do next"
                    : `${focus.length} things to do next`}
              </h2>
              <p className="mt-1.5 max-w-lg text-sm text-[var(--bp-muted)]">
                Overdue first, then priority — never the whole plan at once. Full checklist is below.
              </p>
            </div>
            <p className="text-sm font-medium tabular-nums text-[var(--bp-ink)]">{pct}% complete</p>
          </div>
          <Progress value={pct} className="mt-4 h-2" />
          {focus.length === 0 ? (
            <p className="mt-6 text-sm text-[var(--bp-muted)]">
              Nothing actionable today—upcoming tasks will move here as due dates approach.
            </p>
          ) : (
            <ul className="mt-2">
              {focus.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </ul>
          )}
        </section>
      )}

      <section className="animate-bp-fade rounded-2xl border border-[var(--bp-border)] bg-[var(--bp-surface)]/90 p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <StatusBadge status="done" />
          <span className="text-xs text-[var(--bp-muted)] self-center">{counts.done}</span>
          <StatusBadge status="outstanding" />
          <span className="text-xs text-[var(--bp-muted)] self-center">{counts.outstanding}</span>
          <StatusBadge status="overdue" />
          <span className="text-xs text-[var(--bp-muted)] self-center">{counts.overdue}</span>
          <StatusBadge status="upcoming" />
          <span className="text-xs text-[var(--bp-muted)] self-center">{counts.upcoming}</span>
        </div>

        <Tabs defaultValue="pre-day-1">
          <TabsList className="mb-2">
            <TabsTrigger value="pre-day-1">Pre–Day 1</TabsTrigger>
            <TabsTrigger value="first-weeks">First weeks</TabsTrigger>
          </TabsList>
          <TabsContent value="pre-day-1">
            <PhaseList
              tasks={tasks}
              phase="pre-day-1"
              emptyLabel="No pre–day 1 tasks on this plan."
            />
          </TabsContent>
          <TabsContent value="first-weeks">
            <PhaseList
              tasks={tasks}
              phase="first-weeks"
              emptyLabel="No first-weeks tasks on this plan."
            />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

export function ConflictBanner() {
  const { lastConflict, clearConflict } = useOnboarding();
  if (!lastConflict) return null;
  return (
    <div
      role="alert"
      className="mb-6 animate-bp-rise overflow-hidden rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50 via-orange-50/80 to-[var(--bp-surface)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 px-4 py-4 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-800">
            Update conflict
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-lg text-[var(--bp-ink)]">
            Someone else changed this task
          </p>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[var(--bp-muted)]">
            {lastConflict} Your checkbox wasn’t saved — reopen the task and try once more.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            className="bg-[var(--bp-brand)] hover:bg-[var(--bp-brand)]/90"
            onClick={clearConflict}
          >
            Got it — try again
          </Button>
          <Button variant="outline" size="sm" onClick={clearConflict}>
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
}
