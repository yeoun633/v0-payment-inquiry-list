"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ViewMode = "daily" | "weekly" | "monthly"

// Sample data for different view modes
const dailyData = [
  { label: "3/25", total: 1680000, card: 1120000, delivery: 560000 },
  { label: "3/26", total: 1850000, card: 1230000, delivery: 620000 },
  { label: "3/27", total: 1950000, card: 1300000, delivery: 650000 },
  { label: "3/28", total: 2100000, card: 1400000, delivery: 700000 },
  { label: "3/29", total: 2350000, card: 1550000, delivery: 800000 },
  { label: "3/30", total: 2550000, card: 1680000, delivery: 870000 },
  { label: "3/31", total: 1900000, card: 1260000, delivery: 640000 },
]

const weeklyData = [
  { label: "3월 1주", total: 13250000, card: 8700000, delivery: 4550000 },
  { label: "3월 2주", total: 14850000, card: 9800000, delivery: 5050000 },
  { label: "3월 3주", total: 14500000, card: 9550000, delivery: 4950000 },
  { label: "3월 4주", total: 15280000, card: 10100000, delivery: 5180000 },
  { label: "3월 5주", total: 4450000, card: 2940000, delivery: 1510000 },
]

const monthlyData = [
  { label: "2024.10", total: 52000000, card: 34000000, delivery: 18000000 },
  { label: "2024.11", total: 48500000, card: 32000000, delivery: 16500000 },
  { label: "2024.12", total: 61000000, card: 40000000, delivery: 21000000 },
  { label: "2025.01", total: 45000000, card: 30000000, delivery: 15000000 },
  { label: "2025.02", total: 49500000, card: 33000000, delivery: 16500000 },
  { label: "2025.03", total: 62330000, card: 41090000, delivery: 21240000 },
]

const viewModes: { key: ViewMode; label: string }[] = [
  { key: "daily", label: "일별" },
  { key: "weekly", label: "주별" },
  { key: "monthly", label: "월별" },
]

export default function GraphStatisticsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("daily")

  const getData = () => {
    switch (viewMode) {
      case "daily":
        return dailyData
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
    }
  }

  const data = getData()
  const maxValue = Math.max(...data.map((d) => d.total))
  const totalSum = data.reduce((sum, d) => sum + d.total, 0)
  const cardSum = data.reduce((sum, d) => sum + d.card, 0)
  const deliverySum = data.reduce((sum, d) => sum + d.delivery, 0)

  // Calculate trend
  const currentValue = data[data.length - 1].total
  const previousValue = data[data.length - 2]?.total || currentValue
  const trendPercent = ((currentValue - previousValue) / previousValue) * 100
  const isPositive = trendPercent >= 0

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/statistics" className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">일/주/월 그래프 조회</h1>
        </div>
      </header>

      {/* View Mode Tabs */}
      <div className="p-4">
        <div className="flex bg-muted rounded-lg p-1">
          {viewModes.map((mode) => (
            <button
              key={mode.key}
              onClick={() => setViewMode(mode.key)}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-md transition-colors",
                viewMode === mode.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <div className="px-4 mb-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-primary-foreground/80">
                {viewMode === "daily" && "최근 7일 총 매출"}
                {viewMode === "weekly" && "이번 달 주간 총 매출"}
                {viewMode === "monthly" && "최근 6개월 총 매출"}
              </span>
              <div className={cn("flex items-center gap-1 text-sm", isPositive ? "text-green-300" : "text-red-300")}>
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{isPositive ? "+" : ""}{trendPercent.toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-2xl font-bold">{totalSum.toLocaleString()}원</p>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <div className="px-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-4">
              {viewMode === "daily" && "일별 매출 추이"}
              {viewMode === "weekly" && "주별 매출 추이"}
              {viewMode === "monthly" && "월별 매출 추이"}
            </h3>

            {/* Chart */}
            <div className="space-y-3">
              {data.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground w-16">{item.label}</span>
                    <span className="font-medium">{item.total.toLocaleString()}원</span>
                  </div>
                  <div className="h-6 bg-muted rounded-full overflow-hidden flex">
                    {/* Card portion */}
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(item.card / maxValue) * 100}%` }}
                    />
                    {/* Delivery portion */}
                    <div
                      className="h-full bg-success transition-all duration-300"
                      style={{ width: `${(item.delivery / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">카드매출</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">배달매출</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <div className="px-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-4">카테고리별 비중</h3>
            <div className="space-y-4">
              {/* Card Sales */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">카드매출</span>
                  <div className="text-right">
                    <span className="font-semibold">{cardSum.toLocaleString()}원</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({((cardSum / totalSum) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(cardSum / totalSum) * 100}%` }}
                  />
                </div>
              </div>

              {/* Delivery Sales */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">배달매출</span>
                  <div className="text-right">
                    <span className="font-semibold">{deliverySum.toLocaleString()}원</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({((deliverySum / totalSum) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full"
                    style={{ width: `${(deliverySum / totalSum) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
