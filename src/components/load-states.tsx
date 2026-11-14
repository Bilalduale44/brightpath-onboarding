"use client";

import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding-context";

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-bp-fade">
      <div
        className="size-10 rounded-full border-2 border-[var(--bp-brand)]/30 border-t-[var(--bp-brand)] animate-spin"
        aria-hidden
      />
      <p className="mt-4 text-sm text-[var(--bp-muted)]">Loading onboarding plans…</p>
    </div>
  );
}

export function ErrorState() {
  const { retryLoad } = useOnboarding();
  return (
    <div
      role="alert"
      className="mx-auto max-w-lg animate-bp-rise overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 via-orange-50/50 to-[var(--bp-surface)]"
    >
      <div className="px-6 py-10 text-center sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-rose-800">
          Connection problem
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-2xl text-rose-950 sm:text-3xl">
          Couldn’t load plans
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-rose-900/80">
          Mock data didn’t load this time. Nothing was lost — retry to restore checklists, Focus
          now, and manager progress. In production this would surface a real API error.
        </p>
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            className="bg-[var(--bp-brand)] hover:bg-[var(--bp-brand)]/90"
            onClick={retryLoad}
          >
            Reload plans
          </Button>
          <p className="text-xs text-[var(--bp-muted)]">Usually recovers in under a second.</p>
        </div>
      </div>
    </div>
  );
}

export function DemoTools() {
  const { simulateError, loadState } = useOnboarding();
  if (loadState !== "ready") return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-xl border border-[var(--bp-border)] bg-white/95 p-2 shadow-md">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={() => simulateError()}
      >
        Simulate load error
      </Button>
    </div>
  );
}
