"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  ArrowRight,
  FileText,
  Users,
  BarChart3,
} from "lucide-react"

const inquiryServices = [
  {
    icon: CreditCard,
    title: "카드 승인내역 조회",
    description: "카드 승인 내역 조회 요청 관리",
    href: "/admin/scraping/approval",
    count: 156,
  },
  {
    icon: Wallet,
    title: "매입내역 조회",
    description: "카드사 매입 내역 조회 요청 관리",
    href: "/admin/scraping/purchase",
    count: 89,
  },
  {
    icon: TrendingUp,
    title: "입금내역 조회",
    description: "입금 내역 조회 요청 관리",
    href: "/admin/scraping/deposit",
    count: 124,
  },
  {
    icon: Building2,
    title: "가맹점 정보 조회",
    description: "여신금융협회 연계 가맹점 정보 조회",
    href: "/admin/scraping/merchant",
    count: 41,
  },
]

const summaryStats = [
  { label: "오늘 조회 요청", value: "23건", change: "+5" },
  { label: "처리 완료", value: "21건", change: null },
  { label: "처리 대기", value: "2건", change: null },
  { label: "이번 달 총 조회", value: "412건", change: "+12%" },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">운영 관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          여신금융협회 API 연계 조회 서비스 운영 현황
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                {stat.change && (
                  <span className="text-xs text-success mb-1">{stat.change}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inquiry Services */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-4">조회 서비스 관리</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inquiryServices.map((service, index) => {
            const Icon = service.icon
            return (
              <Link key={index} href={service.href}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">{service.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-lg font-bold text-primary">{service.count}</span>
                        <span className="text-[10px] text-muted-foreground">총 요청</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-4">빠른 메뉴</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-foreground">API 호출 보고서</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-foreground">회원 정보 관리</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-foreground">데이터 관리</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
