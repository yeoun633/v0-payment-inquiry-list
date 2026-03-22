"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronRight,
  CreditCard,
  Database,
  FileText,
  Home,
  LayoutDashboard,
  Settings,
  Users,
  Building2,
  FileSearch,
  Calendar,
  Shield,
} from "lucide-react"

interface NavItem {
  label: string
  href?: string
  icon?: React.ReactNode
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    label: "정산",
    icon: <CreditCard className="h-4 w-4" />,
    children: [
      { label: "청구내역", href: "/admin/billing" },
    ],
  },
  {
    label: "회원 정보 관리",
    icon: <Users className="h-4 w-4" />,
    children: [
      { label: "알림 연락처 관리", href: "/admin/contacts" },
      { label: "사용 API 관리", href: "/admin/api-usage" },
    ],
  },
  {
    label: "노코드 관리",
    icon: <Database className="h-4 w-4" />,
    children: [
      { label: "인증 정보 관리", href: "/admin/auth-info" },
      {
        label: "스크래핑 업무",
        children: [
          { label: "예금주 조회", href: "/admin/scraping/depositor" },
          { label: "사업장 휴폐업 조회", href: "/admin/scraping/business-status" },
          { label: "부동산 등기부등본 조회", href: "/admin/scraping/property" },
          { label: "가맹점 정보 조회", href: "/admin/scraping/merchant" },
        ],
      },
    ],
  },
  {
    label: "데이터 비즈",
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: "/admin/data-biz",
  },
  {
    label: "스케줄",
    icon: <Calendar className="h-4 w-4" />,
    href: "/admin/schedule",
  },
  {
    label: "보고서",
    icon: <FileText className="h-4 w-4" />,
    children: [
      { label: "API 호출 보고서", href: "/admin/reports/api-calls" },
    ],
  },
  {
    label: "유지운영",
    icon: <Settings className="h-4 w-4" />,
    href: "/admin/maintenance",
  },
]

interface NavItemComponentProps {
  item: NavItem
  depth?: number
}

function NavItemComponent({ item, depth = 0 }: NavItemComponentProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(
    item.children?.some((child) => 
      child.href === pathname || 
      child.children?.some((subChild) => subChild.href === pathname)
    ) ?? false
  )
  
  const isActive = item.href === pathname
  const hasChildren = item.children && item.children.length > 0

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
            "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            depth > 0 && "pl-8",
            depth > 1 && "pl-12"
          )}
        >
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-sidebar-muted" />
          ) : (
            <ChevronRight className="h-4 w-4 text-sidebar-muted" />
          )}
        </button>
        {isOpen && (
          <div className="mt-1 space-y-1">
            {item.children.map((child, index) => (
              <NavItemComponent key={index} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href || "#"}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent",
        depth === 0 && "font-medium",
        depth === 1 && "pl-8",
        depth === 2 && "pl-12"
      )}
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  )
}

export function AdminSidebar() {
  return (
    <aside className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col min-h-screen">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-sidebar-border">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <span className="text-sidebar-foreground font-bold text-lg tracking-tight">Octover</span>
            <span className="text-sidebar-muted text-[10px] ml-1 uppercase tracking-wider">Admin</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navigation.map((item, index) => (
          <NavItemComponent key={index} item={item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-muted text-center">
          v1.4.3 | 여신금융협회 API
        </div>
      </div>
    </aside>
  )
}
