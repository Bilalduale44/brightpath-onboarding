"use client";

import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { currentPerson, currentRole, today, signOut } = useOnboarding();

  if (!currentPerson || !currentRole) return null;

  const roleLabel =
    currentRole === "hr"
      ? "People Ops"
      : currentRole === "manager"
        ? "Manager"
        : "New hire";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bp-atmosphere" aria-hidden />
      <header className="border-b border-[var(--bp-border)]/70 bg-[var(--bp-surface)]/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div
              className="flex size-10 items-center justify-center rounded-xl bg-[var(--bp-brand)] text-white shadow-sm"
              aria-hidden
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
              <p className="font-[family-name:var(--font-display)] text-xl leading-none tracking-tight text-[var(--bp-ink)]">
                BrightPath
              </p>
              <p className="mt-1 text-xs text-[var(--bp-muted)]">Onboarding</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-[var(--bp-ink)]">{currentPerson.name}</p>
              <p className="text-xs text-[var(--bp-muted)]">
                {roleLabel} · demo today {today}
              </p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={signOut}>
              Switch user
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-8 text-center text-xs text-[var(--bp-muted)] sm:px-6">
        BrightPath Technologies · Scenario 1 prototype · mock data only
      </footer>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 max-w-2xl animate-bp-fade", className)}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--bp-brand)]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--bp-ink)] sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-[var(--bp-muted)]">{description}</p>
      ) : null}
    </div>
  );
}
