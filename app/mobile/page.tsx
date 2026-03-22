"use client"

import Link from "next/link"
import { Bell, ChevronDown, ChevronRight, CreditCard, Building2, Wallet, FileText, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const quickMenus = [
  { icon: CreditCard, label: "승인내역", href: "/mobile/inquiry/approval", color: "bg-primary" },
  { icon: Wallet, label: "매입내역", href: "/mobile/inquiry/purchase", color: "bg-info" },
  { icon: TrendingUp, label: "입금내역", href: "/mobile/inquiry/deposit", color: "bg-success" },
  { icon: Building2, label: "가맹점 정보", href: "/mobile/inquiry/merchant", color: "bg-warning" },
]

const recentTransactions = [
  { cardCompany: "신한카드", time: "10:32", amount: 45000, status: "승인" },
  { cardCompany: "삼성카드", time: "09:15", amount: 128000, status: "승인" },
  { cardCompany: "현대카드", time: "08:42", amount: 32500, status: "승인" },
  { cardCompany: "KB국민카드", time: "어제", amount: 89000, status: "승인" },
]

export default function MobileHomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-primary-foreground/80">안녕하세요,</p>
              <button className="flex items-center gap-1 font-semibold">
                행복한식당 <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-primary" />
          </Button>
        </div>

        {/* Summary Card */}
        <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-primary-foreground/70 mb-1">오늘 승인금액</p>
                <p className="text-xl font-bold">1,245,000원</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success-light" />
                  <span className="text-[10px] text-success-light">전일 대비 +12.5%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-primary-foreground/70 mb-1">오늘 입금예정</p>
                <p className="text-xl font-bold">3,520,000원</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[10px] text-primary-foreground/60">D+1 기준</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </header>

      {/* Quick Menu Grid */}
      <div className="px-4 py-6">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">빠른 조회</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickMenus.map((menu) => {
            const Icon = menu.icon
            return (
              <Link key={menu.href} href={menu.href}>
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:bg-muted/50 transition-colors">
                  <div className={`h-10 w-10 rounded-full ${menu.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{menu.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground">최근 승인내역</h2>
          <Link href="/mobile/inquiry/approval" className="flex items-center text-xs text-primary">
            전체보기 <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {recentTransactions.map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.cardCompany}</p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {tx.amount.toLocaleString()}원
                  </p>
                  <p className="text-xs text-success">{tx.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary Banner */}
      <div className="px-4 py-6">
        <Card className="bg-primary-light border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">3월 매출 현황</p>
                <p className="text-2xl font-bold text-primary mt-1">42,350,000원</p>
              </div>
              <Link href="/mobile/analysis">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  상세보기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
