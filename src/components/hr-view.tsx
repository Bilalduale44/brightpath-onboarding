"use client";

import { PageIntro } from "@/components/app-shell";
import {
  buildAttentionItems,
  NeedsAttentionStrip,
} from "@/components/needs-attention-strip";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { departmentPlans, taskTemplates } from "@/lib/data";
import { useOnboarding } from "@/lib/onboarding-context";
import {
  completionPercent,
  countByStatus,
  formatShortDate,
} from "@/lib/status";
import type { Department } from "@/lib/types";

function DepartmentPlanPanel({ department }: { department: Department }) {
  const plan = departmentPlans.find((p) => p.department === department)!;
  const templates = plan.taskTemplateIds
    .map((id) => taskTemplates.find((t) => t.id === id)!)
    .filter(Boolean);

  const pre = templates.filter((t) => t.phase === "pre-day-1");
  const weeks = templates.filter((t) => t.phase === "first-weeks");

  return (
    <div className="rounded-2xl border border-[var(--bp-border)] bg-[var(--bp-surface)]/90 p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--bp-ink)]">
            {plan.name}
          </h2>
          <p className="mt-1 max-w-xl text-sm text-[var(--bp-muted)]">{plan.summary}</p>
        </div>
        <Badge variant="outline" className="border-[var(--bp-border)]">
          {templates.length} tasks
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--bp-brand)]">
            Pre–Day 1
          </p>
          <ul className="space-y-2">
            {pre.map((t) => (
              <li
                key={t.id}
                className="border-b border-[var(--bp-border)]/50 pb-2 text-sm text-[var(--bp-ink)] last:border-0"
              >
                <span className="font-medium">{t.title}</span>
                {t.department ? (
                  <span className="ml-2 text-xs text-[var(--bp-muted)]">{t.department}</span>
                ) : (
                  <span className="ml-2 text-xs text-[var(--bp-muted)]">Company</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--bp-brand)]">
            First weeks
          </p>
          <ul className="space-y-2">
            {weeks.map((t) => (
              <li
                key={t.id}
                className="border-b border-[var(--bp-border)]/50 pb-2 text-sm text-[var(--bp-ink)] last:border-0"
              >
                <span className="font-medium">{t.title}</span>
                {t.department ? (
                  <span className="ml-2 text-xs text-[var(--bp-muted)]">{t.department}</span>
                ) : (
                  <span className="ml-2 text-xs text-[var(--bp-muted)]">Company</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function HrView() {
  const { people, tasksForHire, today } = useOnboarding();
  const hires = people.filter((p) => p.role === "employee");
  const attention = buildAttentionItems(hires, tasksForHire, today);

  return (
    <div>
      <PageIntro
        eyebrow="People Ops"
        title="Onboarding at a glance"
        description="Department sample plans (static templates for Engineering vs Sales) and live progress across open new hires. Auto-create by role is deferred."
      />

      <NeedsAttentionStrip items={attention} />

      <section className="mb-10">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl text-[var(--bp-ink)]">
          Open new hires
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {hires.map((hire) => {
            const tasks = tasksForHire(hire.id);
            const pct = completionPercent(tasks);
            const counts = countByStatus(tasks, today);
            return (
              <article
                key={hire.id}
                className="rounded-2xl border border-[var(--bp-border)] bg-[var(--bp-surface)]/90 p-4 animate-bp-fade"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-[var(--bp-ink)]">{hire.name}</p>
                  <span className="text-xs text-[var(--bp-muted)]">{hire.department}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--bp-muted)]">
                  Start {hire.startDate ? formatShortDate(hire.startDate) : "—"}
                </p>
                <Progress value={pct} className="mt-3 h-1.5" />
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs tabular-nums text-[var(--bp-muted)]">{pct}%</span>
                  {counts.overdue > 0 ? <StatusBadge status="overdue" /> : null}
                  {counts.done === tasks.length && tasks.length > 0 ? (
                    <StatusBadge status="done" />
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-[family-name:var(--font-display)] text-xl text-[var(--bp-ink)]">
          Department sample plans
        </h2>
        <p className="mb-4 max-w-2xl text-sm text-[var(--bp-muted)]">
          David’s ask: Engineering and Sales don’t share one checklist. These are curated templates
          HR can assign—not auto-generated plans.
        </p>
        <Tabs defaultValue="Engineering">
          <TabsList>
            <TabsTrigger value="Engineering">Engineering</TabsTrigger>
            <TabsTrigger value="Sales">Sales</TabsTrigger>
            <TabsTrigger value="People">Company baseline</TabsTrigger>
          </TabsList>
          <TabsContent value="Engineering" className="mt-4">
            <DepartmentPlanPanel department="Engineering" />
          </TabsContent>
          <TabsContent value="Sales" className="mt-4">
            <DepartmentPlanPanel department="Sales" />
          </TabsContent>
          <TabsContent value="People" className="mt-4">
            <DepartmentPlanPanel department="People" />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
