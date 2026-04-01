"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, CreditCard, UtensilsCrossed } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Sample data - daily sales by date
const salesData: Record<string, { total: number; card: number; delivery: number; count: number }> = {
  "2025-03-01": { total: 1850000, card: 1200000, delivery: 650000, count: 42 },
  "2025-03-02": { total: 2100000, card: 1400000, delivery: 700000, count: 48 },
  "2025-03-03": { total: 1650000, card: 1100000, delivery: 550000, count: 38 },
  "2025-03-04": { total: 1920000, card: 1300000, delivery: 620000, count: 45 },
  "2025-03-05": { total: 2250000, card: 1500000, delivery: 750000, count: 52 },
  "2025-03-06": { total: 1780000, card: 1150000, delivery: 630000, count: 41 },
  "2025-03-07": { total: 2400000, card: 1600000, delivery: 800000, count: 55 },
  "2025-03-08": { total: 2650000, card: 1750000, delivery: 900000, count: 62 },
  "2025-03-09": { total: 2800000, card: 1850000, delivery: 950000, count: 65 },
  "2025-03-10": { total: 1950000, card: 1300000, delivery: 650000, count: 46 },
  "2025-03-11": { total: 1720000, card: 1100000, delivery: 620000, count: 40 },
  "2025-03-12": { total: 2050000, card: 1350000, delivery: 700000, count: 47 },
  "2025-03-13": { total: 1880000, card: 1250000, delivery: 630000, count: 43 },
  "2025-03-14": { total: 2150000, card: 1450000, delivery: 700000, count: 50 },
  "2025-03-15": { total: 2500000, card: 1650000, delivery: 850000, count: 58 },
  "2025-03-16": { total: 2700000, card: 1800000, delivery: 900000, count: 63 },
  "2025-03-17": { total: 1800000, card: 1200000, delivery: 600000, count: 42 },
  "2025-03-18": { total: 1650000, card: 1100000, delivery: 550000, count: 38 },
  "2025-03-19": { total: 1920000, card: 1280000, delivery: 640000, count: 44 },
  "2025-03-20": { total: 2080000, card: 1380000, delivery: 700000, count: 48 },
  "2025-03-21": { total: 2200000, card: 1450000, delivery: 750000, count: 51 },
  "2025-03-22": { total: 2450000, card: 1620000, delivery: 830000, count: 57 },
  "2025-03-23": { total: 2600000, card: 1720000, delivery: 880000, count: 60 },
  "2025-03-24": { total: 1750000, card: 1160000, delivery: 590000, count: 40 },
  "2025-03-25": { total: 1680000, card: 1120000, delivery: 560000, count: 39 },
  "2025-03-26": { total: 1850000, card: 1230000, delivery: 620000, count: 43 },
  "2025-03-27": { total: 1950000, card: 1300000, delivery: 650000, count: 45 },
  "2025-03-28": { total: 2100000, card: 1400000, delivery: 700000, count: 49 },
  "2025-03-29": { total: 2350000, card: 1550000, delivery: 800000, count: 54 },
  "2025-03-30": { total: 2550000, card: 1680000, delivery: 870000, count: 59 },
  "2025-03-31": { total: 1900000, card: 1260000, delivery: 640000, count: 44 },
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export default function CalendarStatisticsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)) // March 2025
  const [selectedDate, setSelectedDate] = useState<string | null>("2025-03-15")

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDate(null)
  }

  const handleDateClick = (day: number) => {
    const dateKey = formatDateKey(year, month, day)
    setSelectedDate(dateKey)
  }

  const selectedSales = selectedDate ? salesData[selectedDate] : null

  // Calculate month total
  const monthTotal = Object.entries(salesData)
    .filter(([key]) => key.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
    .reduce((sum, [, data]) => sum + data.total, 0)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/statistics" className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">일자별 캘린더 조회</h1>
        </div>
      </header>

      {/* Month Navigator */}
      <div className="p-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold">
                {year}년 {month + 1}월
              </h2>
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {WEEKDAYS.map((day, i) => (
                <div
                  key={day}
                  className={cn(
                    "text-center text-xs font-medium py-1",
                    i === 0 && "text-destructive",
                    i === 6 && "text-primary"
                  )}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month start */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="h-14" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dateKey = formatDateKey(year, month, day)
                const daySales = salesData[dateKey]
                const isSelected = selectedDate === dateKey
                const dayOfWeek = (firstDay + i) % 7

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={cn(
                      "h-14 rounded-lg flex flex-col items-center justify-center transition-colors relative",
                      isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                      !isSelected && dayOfWeek === 0 && "text-destructive",
                      !isSelected && dayOfWeek === 6 && "text-primary"
                    )}
                  >
                    <span className="text-sm font-medium">{day}</span>
                    {daySales && (
                      <span
                        className={cn(
                          "text-[9px] font-medium mt-0.5",
                          isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}
                      >
                        {(daySales.total / 10000).toFixed(0)}만
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Month Total */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">이번 달 총 매출</span>
                <span className="text-lg font-bold text-primary">{monthTotal.toLocaleString()}원</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Date Details */}
      {selectedSales && selectedDate && (
        <div className="px-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">
            {selectedDate.replace(/-/g, ".")} 매출 상세
          </h3>
          <Card>
            <CardContent className="p-4 space-y-4">
              {/* Total Sales */}
              <div className="text-center py-3 bg-primary/5 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">총 매출</p>
                <p className="text-2xl font-bold text-primary">{selectedSales.total.toLocaleString()}원</p>
                <p className="text-xs text-muted-foreground mt-1">{selectedSales.count}건</p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">카드매출</span>
                  </div>
                  <p className="text-lg font-semibold">{selectedSales.card.toLocaleString()}원</p>
                  <p className="text-xs text-muted-foreground">
                    {((selectedSales.card / selectedSales.total) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <UtensilsCrossed className="h-4 w-4 text-success" />
                    <span className="text-xs text-muted-foreground">배달매출</span>
                  </div>
                  <p className="text-lg font-semibold">{selectedSales.delivery.toLocaleString()}원</p>
                  <p className="text-xs text-muted-foreground">
                    {((selectedSales.delivery / selectedSales.total) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No Selection */}
      {!selectedSales && (
        <div className="px-4">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-sm text-muted-foreground">날짜를 선택하면 매출 상세를 확인할 수 있습니다.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
