"use client"

import Link from "next/link"
import { 
  Building2, 
  Settings, 
  HelpCircle, 
  FileText, 
  Shield, 
  LogOut,
  ChevronRight,
  Bell,
  User,
  Phone
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const menuSections = [
  {
    title: "계정",
    items: [
      { icon: User, label: "내 정보", href: "/mobile/more/profile" },
      { icon: Building2, label: "가맹점 관리", href: "/mobile/inquiry/merchant" },
      { icon: Bell, label: "알림 설정", href: "/mobile/more/notifications" },
    ],
  },
  {
    title: "서비스",
    items: [
      { icon: FileText, label: "이용 가이드", href: "/mobile/more/guide" },
      { icon: HelpCircle, label: "자주 묻는 질문", href: "/mobile/more/faq" },
      { icon: Phone, label: "고객센터", href: "/mobile/more/support" },
    ],
  },
  {
    title: "설정",
    items: [
      { icon: Settings, label: "앱 설정", href: "/mobile/more/settings" },
      { icon: Shield, label: "개인정보 처리방침", href: "/mobile/more/privacy" },
      { icon: FileText, label: "서비스 이용약관", href: "/mobile/more/terms" },
    ],
  },
]

export default function MorePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center justify-center h-14 px-4">
          <h1 className="text-lg font-semibold">더보기</h1>
        </div>
      </header>

      {/* User Info Card */}
      <div className="p-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg">행복한식당</p>
                <p className="text-sm text-muted-foreground">사업자번호: 123-45-67890</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu Sections */}
      <div className="px-4 space-y-6">
        {menuSections.map((section, index) => (
          <div key={index}>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">{section.title}</h2>
            <Card>
              <CardContent className="p-0 divide-y divide-border">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon
                  return (
                    <Link key={itemIndex} href={item.href}>
                      <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Link>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Logout Button */}
        <Card className="mb-8">
          <CardContent className="p-0">
            <button className="w-full flex items-center justify-center gap-2 p-4 text-destructive hover:bg-destructive/5 transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">로그아웃</span>
            </button>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center pb-8">
          <p className="text-xs text-muted-foreground">Octover v1.0.0</p>
        </div>
      </div>
    </div>
  )
}
