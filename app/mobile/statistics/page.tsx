"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, BarChart3, TrendingUp, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const statMenus = [
  {
    icon: Calendar,
    title: "일자별 캘린더 조회",
    description: "월별 캘린더에서 일자별 매출을 확인하세요",
    href: "/mobile/statistics/calendar",
    color: "bg-primary",
  },
  {
    icon: BarChart3,
    title: "일/주/월 그래프 조회",
    description: "일별, 주별, 월별 매출 추이를 그래프로 확인하세요",
    href: "/mobile/statistics/graph",
    color: "bg-success",
  },
]

// Sample summary data
const summaryData = {
  todaySales: 1850000,
  yesterdaySales: 2120000,
  thisWeekSales: 12450000,
  thisMonthSales: 45800000,
}

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile" className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">통계</h1>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="p-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">매출 요약</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-primary-foreground/70">오늘 매출</p>
                <p className="text-xl font-bold">{summaryData.todaySales.toLocaleString()}원</p>
              </div>
              <div>
                <p className="text-xs text-primary-foreground/70">어제 매출</p>
                <p className="text-xl font-bold">{summaryData.yesterdaySales.toLocaleString()}원</p>
              </div>
              <div>
                <p className="text-xs text-primary-foreground/70">이번 주</p>
                <p className="text-lg font-semibold">{summaryData.thisWeekSales.toLocaleString()}원</p>
              </div>
              <div>
                <p className="text-xs text-primary-foreground/70">이번 달</p>
                <p className="text-lg font-semibold">{summaryData.thisMonthSales.toLocaleString()}원</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu Cards */}
      <div className="px-4 space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">통계 메뉴</h2>
        {statMenus.map((menu) => {
          const Icon = menu.icon
          return (
            <Link key={menu.href} href={menu.href}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-lg ${menu.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{menu.title}</p>
                      <p className="text-sm text-muted-foreground">{menu.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="px-4 mt-6">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">빠른 비교</h2>
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">전일 대비</span>
              <span className="text-sm font-semibold text-destructive">
                {((summaryData.todaySales - summaryData.yesterdaySales) / summaryData.yesterdaySales * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">주간 일평균</span>
              <span className="text-sm font-semibold">
                {Math.round(summaryData.thisWeekSales / 7).toLocaleString()}원
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">월간 일평균</span>
              <span className="text-sm font-semibold">
                {Math.round(summaryData.thisMonthSales / 30).toLocaleString()}원
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
