"use client";

import { AppShell } from "@/components/app-shell";
import { ConflictBanner, EmployeeView } from "@/components/employee-view";
import { HrView } from "@/components/hr-view";
import { DemoTools, ErrorState, LoadingState } from "@/components/load-states";
import { ManagerView } from "@/components/manager-view";
import { MockLogin } from "@/components/mock-login";
import { OnboardingProvider, useOnboarding } from "@/lib/onboarding-context";

function OnboardingScreens() {
  const { loadState, currentRole, isSignedIn } = useOnboarding();

  if (!isSignedIn) {
    return <MockLogin />;
  }

  return (
    <AppShell>
      {loadState === "loading" ? <LoadingState /> : null}
      {loadState === "error" ? <ErrorState /> : null}
      {loadState === "ready" ? (
        <>
          <ConflictBanner />
          {currentRole === "employee" ? <EmployeeView /> : null}
          {currentRole === "manager" ? <ManagerView /> : null}
          {currentRole === "hr" ? <HrView /> : null}
        </>
      ) : null}
      <DemoTools />
    </AppShell>
  );
}

export function OnboardingApp() {
  return (
    <OnboardingProvider>
      <OnboardingScreens />
    </OnboardingProvider>
  );
}
