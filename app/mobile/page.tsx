"use client"

import Link from "next/link"
import { Bell, ChevronDown, ChevronRight, CreditCard, Building2, Wallet, TrendingUp, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const inquiryMenus = [
  { icon: CreditCard, label: "카드 승인내역 조회", href: "/mobile/inquiry/approval", color: "bg-primary" },
  { icon: Wallet, label: "매입내역 조회", href: "/mobile/inquiry/purchase", color: "bg-info" },
  { icon: TrendingUp, label: "입금내역 조회", href: "/mobile/inquiry/deposit", color: "bg-success" },
  { icon: Building2, label: "가맹점 정보 조회", href: "/mobile/inquiry/merchant", color: "bg-warning" },
]

const recentInquiries = [
  { type: "가맹점 정보 조회", date: "2025-03-22 14:30", status: "completed" },
  { type: "카드 승인내역 조회", date: "2025-03-22 10:15", status: "completed" },
  { type: "입금내역 조회", date: "2025-03-21 16:45", status: "completed" },
  { type: "매입내역 조회", date: "2025-03-20 09:00", status: "pending" },
]

const statusConfig = {
  completed: { label: "완료", icon: CheckCircle2, color: "text-success" },
  pending: { label: "조회중", icon: Clock, color: "text-warning-foreground" },
}

export default function MobileHomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-primary-foreground/70">여신금융협회 API</p>
              <button className="flex items-center gap-1 font-semibold text-sm">
                행복한식당 <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        {/* Summary Card - Simplified */}
        <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
          <CardContent className="p-4">
            <p className="text-xs text-primary-foreground/70 mb-1">가맹점 번호</p>
            <p className="text-base font-semibold">M2024001234567</p>
            <p className="text-xs text-primary-foreground/60 mt-1">사업자번호: 123-45-67890</p>
          </CardContent>
        </Card>
      </header>

      {/* Inquiry Menu Grid */}
      <div className="px-4 py-6">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">조회 서비스</h2>
        <div className="grid grid-cols-2 gap-3">
          {inquiryMenus.map((menu) => {
            const Icon = menu.icon
            return (
              <Link key={menu.href} href={menu.href}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:bg-muted/50 transition-colors">
                  <div className={`h-10 w-10 rounded-lg ${menu.color} flex items-center justify-center shrink-0`}>
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-tight">{menu.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Inquiry History */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground">최근 조회 내역</h2>
          <Link href="/mobile/inquiry/history" className="flex items-center text-xs text-primary">
            전체보기 <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {recentInquiries.map((inquiry, index) => {
              const status = statusConfig[inquiry.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              return (
                <div key={index} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{inquiry.type}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{inquiry.date}</p>
                  </div>
                  <div className={`flex items-center gap-1 ${status.color}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">{status.label}</span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Service Notice */}
      <div className="px-4 py-6">
        <Card className="bg-info-light border-info/20">
          <CardContent className="p-4">
            <p className="text-xs font-medium text-info mb-1">서비스 안내</p>
            <p className="text-xs text-info/80 leading-relaxed">
              여신금융협회 API를 통해 가맹점 정보 및 카드 관련 내역을 조회할 수 있습니다. 
              조회 결과는 실시간으로 제공됩니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
