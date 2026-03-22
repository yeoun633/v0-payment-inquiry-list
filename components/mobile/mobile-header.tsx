"use client"

import { ArrowLeft, Bell, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MobileHeaderProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  showNotification?: boolean
  showMenu?: boolean
  className?: string
  variant?: "default" | "transparent"
}

export function MobileHeader({
  title,
  showBack = false,
  onBack,
  showNotification = false,
  showMenu = false,
  className,
  variant = "default",
}: MobileHeaderProps) {
  return (
    <header
      className={cn(
        "h-14 flex items-center justify-between px-4",
        variant === "default" && "bg-card border-b border-border",
        variant === "transparent" && "bg-transparent absolute top-0 left-0 right-0 z-10",
        className
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex items-center gap-2">
        {showBack && (
          <Button variant="ghost" size="icon" className="h-10 w-10 -ml-2" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        {title && (
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        )}
      </div>
      <div className="flex items-center gap-1">
        {showNotification && (
          <Button variant="ghost" size="icon" className="h-10 w-10 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>
        )}
        {showMenu && (
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <MoreVertical className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  )
}
