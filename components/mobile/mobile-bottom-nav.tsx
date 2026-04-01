"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, BarChart3, Zap, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "홈", href: "/mobile" },
  { icon: Search, label: "조회", href: "/mobile/inquiry/approval" },
  { icon: BarChart3, label: "통계", href: "/mobile/statistics" },
  { icon: Zap, label: "선정산", href: "/mobile/pre-settlement" },
  { icon: MoreHorizontal, label: "더보기", href: "/mobile/more" },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/mobile") {
      return pathname === "/mobile"
    }
    if (href === "/mobile/inquiry/approval") {
      // "조회" tab is active for all inquiry routes and delivery-sales
      return pathname.startsWith("/mobile/inquiry") || pathname.startsWith("/mobile/delivery-sales")
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
