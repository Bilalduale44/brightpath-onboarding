"use client";

import { useOnboarding } from "@/lib/onboarding-context";
import { people } from "@/lib/data";
import { cn } from "@/lib/utils";

const GROUPS = [
  { label: "New hire", role: "employee" as const },
  { label: "Manager", role: "manager" as const },
  { label: "People Ops", role: "hr" as const },
];

/** Short “what you’ll see” copy so the first minute orients the demo. */
const LANDING_HINT: Record<string, string> = {
  emily: "Focus now — a short list before the full checklist",
  marcus: "Mid-ramp Sales hire with overdue work + a conflict demo",
  priya: "All tasks done — the celebration state",
  david: "Emily & Priya progress, overdue callouts, what’s next",
  alex: "Marcus’s Sales ramp and overdue strip",
  jordan: "Empty state — no new hires assigned",
  sarah: "Company-wide hires + Eng vs Sales sample plans",
};

export function MockLogin() {
  const { viewAsOptions, signIn } = useOnboarding();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bp-atmosphere" aria-hidden />

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-12 sm:px-6">
        <div className="animate-bp-fade">
          <div className="flex items-center gap-3">
            <div
              className="flex size-12 items-center justify-center rounded-xl bg-[var(--bp-brand)] text-white shadow-sm"
              aria-hidden
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 16c3-1 5-4 8-4s5 3 8 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 12V5m0 0 2.5 2.5M12 5 9.5 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-3xl leading-none tracking-tight text-[var(--bp-ink)] sm:text-4xl">
                BrightPath
              </p>
              <p className="mt-1.5 text-sm text-[var(--bp-muted)]">Onboarding</p>
            </div>
          </div>

          <h1 className="mt-10 font-[family-name:var(--font-display)] text-2xl tracking-tight text-[var(--bp-ink)] sm:text-3xl">
            Welcome — pick who you are
          </h1>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-[var(--bp-muted)]">
            Mock login for this take-home. Each persona opens a different lens: new hires see{" "}
            <span className="font-medium text-[var(--bp-ink)]">Focus now</span>, managers see team
            progress, People Ops sees company plans. No password or SSO.
          </p>

          <div className="mt-5 rounded-xl border border-[var(--bp-brand)]/25 bg-[var(--bp-tint)]/80 px-4 py-3 text-sm text-[var(--bp-ink)]">
            <p className="font-medium text-[var(--bp-brand)]">Start with Emily</p>
            <p className="mt-0.5 text-[var(--bp-muted)]">
              You’ll land on Focus now — at most three things that matter, not the full checklist.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-8 animate-bp-rise" style={{ animationDelay: "80ms" }}>
          {GROUPS.map((group) => {
            const options = viewAsOptions.filter((o) => o.role === group.role);
            if (options.length === 0) return null;
            return (
              <section key={group.role} aria-labelledby={`login-${group.role}`}>
                <h2
                  id={`login-${group.role}`}
                  className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--bp-brand)]"
                >
                  {group.label}
                </h2>
                <ul className="flex flex-col gap-2">
                  {options.map((o, index) => {
                    const person = people.find((p) => p.id === o.id);
                    if (!person) return null;
                    const hint = LANDING_HINT[o.id];
                    const isEmily = o.id === "emily";
                    return (
                      <li key={o.id}>
                        <button
                          type="button"
                          onClick={() => signIn(o.id)}
                          className={cn(
                            "group flex w-full items-center gap-4 rounded-xl border bg-[var(--bp-surface)]/85 px-4 py-3.5 text-left transition",
                            "hover:border-[var(--bp-brand)]/55 hover:bg-white hover:shadow-sm",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bp-brand)]",
                            isEmily
                              ? "border-[var(--bp-brand)]/50 shadow-sm ring-1 ring-[var(--bp-brand)]/15"
                              : "border-[var(--bp-border)]",
                          )}
                          style={{ animationDelay: `${100 + index * 40}ms` }}
                        >
                          <span
                            className={cn(
                              "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition group-hover:bg-[var(--bp-brand)] group-hover:text-white",
                              isEmily
                                ? "bg-[var(--bp-brand)] text-white"
                                : "bg-[var(--bp-tint)] text-[var(--bp-brand)]",
                            )}
                            aria-hidden
                          >
                            {person.avatarInitials}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="font-medium text-[var(--bp-ink)]">
                                {person.name}
                              </span>
                              {isEmily ? (
                                <span className="rounded-full bg-[var(--bp-brand-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--bp-brand)]">
                                  Recommended
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-0.5 block truncate text-sm text-[var(--bp-muted)]">
                              {person.title} · {person.department}
                            </span>
                            {hint ? (
                              <span className="mt-1 block text-xs leading-snug text-[var(--bp-muted)]">
                                You’ll see: {hint}
                              </span>
                            ) : null}
                          </span>
                          <span className="hidden text-sm text-[var(--bp-brand)] sm:inline">
                            Continue
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <p className="mt-12 text-center text-xs text-[var(--bp-muted)]">
          BrightPath Technologies · Scenario 1 prototype · mock data only
        </p>
      </div>
    </div>
  );
}
