"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createInitialAssignments,
  DEMO_TODAY,
  people,
  viewAsOptions,
} from "./data";
import type { AssignedTask, Person, RoleView } from "./types";

type LoadState = "loading" | "ready" | "error";

type OnboardingContextValue = {
  today: string;
  loadState: LoadState;
  retryLoad: () => void;
  simulateError: () => void;
  isSignedIn: boolean;
  signIn: (personId: string) => void;
  signOut: () => void;
  viewAsId: string | null;
  currentPerson: Person | null;
  currentRole: RoleView | null;
  tasks: AssignedTask[];
  people: Person[];
  hiresForManager: (managerId: string) => Person[];
  tasksForHire: (hireId: string) => AssignedTask[];
  toggleTaskComplete: (taskId: string) => { ok: true } | { ok: false; reason: string };
  lastConflict: string | null;
  clearConflict: () => void;
  viewAsOptions: typeof viewAsOptions;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [viewAsId, setViewAsId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<AssignedTask[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [lastConflict, setLastConflict] = useState<string | null>(null);
  const [loadGeneration, setLoadGeneration] = useState(0);

  useEffect(() => {
    setLoadState("loading");
    // Short artificial delay so the Loading state is demoable via Retry; not a real fetch.
    const timer = setTimeout(() => {
      setTasks(createInitialAssignments());
      setLoadState("ready");
    }, 180);
    return () => clearTimeout(timer);
  }, [loadGeneration]);

  const currentPerson = useMemo(
    () => (viewAsId ? (people.find((p) => p.id === viewAsId) ?? null) : null),
    [viewAsId],
  );

  const signIn = useCallback((personId: string) => {
    setLastConflict(null);
    setViewAsId(personId);
  }, []);

  const signOut = useCallback(() => {
    setLastConflict(null);
    setViewAsId(null);
  }, []);

  const hiresForManager = useCallback(
    (managerId: string) =>
      people.filter((p) => p.role === "employee" && p.managerId === managerId),
    [],
  );

  const tasksForHire = useCallback(
    (hireId: string) => tasks.filter((t) => t.hireId === hireId),
    [tasks],
  );

  const toggleTaskComplete = useCallback((taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      const reason = "Task not found — it may have been removed.";
      setLastConflict(reason);
      return { ok: false as const, reason };
    }

    // Simulated conflict: Marcus's benefits task refuses once (race demo)
    if (
      task.id === "marcus-tpl-benefits" &&
      !task.completedAt &&
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("bp-conflict-once") !== "1"
    ) {
      window.sessionStorage.setItem("bp-conflict-once", "1");
      const reason =
        "People Ops just updated Enroll in benefits from another session (simulated race).";
      setLastConflict(reason);
      return { ok: false as const, reason };
    }

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        if (t.completedAt) {
          return { ...t, completedAt: undefined };
        }
        return { ...t, completedAt: DEMO_TODAY };
      }),
    );
    return { ok: true as const };
  }, [tasks]);

  const value: OnboardingContextValue = {
    today: DEMO_TODAY,
    loadState,
    retryLoad: () => setLoadGeneration((g) => g + 1),
    simulateError: () => setLoadState("error"),
    isSignedIn: viewAsId !== null,
    signIn,
    signOut,
    viewAsId,
    currentPerson,
    currentRole: currentPerson?.role ?? null,
    tasks,
    people,
    hiresForManager,
    tasksForHire,
    toggleTaskComplete,
    lastConflict,
    clearConflict: () => setLastConflict(null),
    viewAsOptions,
  };

  return (
    <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
