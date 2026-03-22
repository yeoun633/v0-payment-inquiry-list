"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, TrendingUp, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "홈", href: "/mobile" },
  { icon: CreditCard, label: "승인내역", href: "/mobile/inquiry/approval" },
  { icon: TrendingUp, label: "입금내역", href: "/mobile/inquiry/deposit" },
  { icon: Building2, label: "가맹점", href: "/mobile/inquiry/merchant" },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/mobile" && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
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
