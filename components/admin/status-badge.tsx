import { cn } from "@/lib/utils"

export type StatusType = "pending" | "processing" | "completed" | "failed" | "scheduled"

interface StatusBadgeProps {
  status: StatusType
  label?: string
  className?: string
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: {
    label: "처리예정",
    className: "bg-warning-light text-warning-foreground border-warning/30",
  },
  processing: {
    label: "처리중",
    className: "bg-info-light text-info border-info/30",
  },
  completed: {
    label: "완료",
    className: "bg-success-light text-success border-success/30",
  },
  failed: {
    label: "실패",
    className: "bg-destructive-light text-destructive border-destructive/30",
  },
  scheduled: {
    label: "조회예정",
    className: "bg-warning-light text-warning-foreground border-warning/30",
  },
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {label || config.label}
    </span>
  )
}
