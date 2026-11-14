import { Badge } from "@/components/ui/badge";
import type { TaskStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<TaskStatus, string> = {
  done: "bg-emerald-100 text-emerald-900 border-emerald-200",
  outstanding: "bg-amber-100 text-amber-950 border-amber-200",
  upcoming: "bg-sky-100 text-sky-950 border-sky-200",
  overdue: "bg-rose-100 text-rose-950 border-rose-200",
};

const labels: Record<TaskStatus, string> = {
  done: "Done",
  outstanding: "Outstanding",
  upcoming: "Upcoming",
  overdue: "Overdue",
};

export function StatusBadge({
  status,
  className,
}: {
  status: TaskStatus;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium tracking-wide", styles[status], className)}
    >
      {labels[status]}
    </Badge>
  );
}
