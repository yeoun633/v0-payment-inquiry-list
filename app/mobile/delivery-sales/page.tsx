"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ChevronRight, Search, UtensilsCrossed } from "lucide-react"

const platforms = ["전체", "배민1", "배달의민족", "쿠팡이츠", "요기요", "땡겨요"]

const sampleResults = [
  { 
    id: "1", 
    date: "2025-03-22", 
    platform: "배민1", 
    orderCount: 45, 
    cancelCount: 2, 
    totalSales: 1850000, 
    expectedSettlement: 1702000,
    status: "정산완료"
  },
  { 
    id: "2", 
    date: "2025-03-22", 
    platform: "쿠팡이츠", 
    orderCount: 32, 
    cancelCount: 1, 
    totalSales: 1280000, 
    expectedSettlement: 1177600,
    status: "정산예정"
  },
  { 
    id: "3", 
    date: "2025-03-21", 
    platform: "배달의민족", 
    orderCount: 28, 
    cancelCount: 0, 
    totalSales: 980000, 
    expectedSettlement: 901600,
    status: "정산완료"
  },
  { 
    id: "4", 
    date: "2025-03-21", 
    platform: "요기요", 
    orderCount: 18, 
    cancelCount: 1, 
    totalSales: 620000, 
    expectedSettlement: 570400,
    status: "정산완료"
  },
  { 
    id: "5", 
    date: "2025-03-20", 
    platform: "배민1", 
    orderCount: 52, 
    cancelCount: 3, 
    totalSales: 2150000, 
    expectedSettlement: 1978000,
    status: "정산완료"
  },
  { 
    id: "6", 
    date: "2025-03-20", 
    platform: "땡겨요", 
    orderCount: 12, 
    cancelCount: 0, 
    totalSales: 380000, 
    expectedSettlement: 349600,
    status: "정산예정"
  },
]

function getPlatformColor(platform: string): string {
  switch (platform) {
    case "배민1":
    case "배달의민족":
      return "bg-[#2AC1BC]"
    case "쿠팡이츠":
      return "bg-[#E94E4E]"
    case "요기요":
      return "bg-[#FA0050]"
    case "땡겨요":
      return "bg-[#FF6B00]"
    default:
      return "bg-muted-foreground"
  }
}

function getStatusStyle(status: string): string {
  switch (status) {
    case "정산완료":
      return "bg-success-light text-success"
    case "정산예정":
      return "bg-info-light text-info"
    case "정산보류":
      return "bg-warning-light text-warning-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function DeliverySalesPage() {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState("전체")
  const [showResults, setShowResults] = useState(false)

  const filteredResults = selectedPlatform === "전체" 
    ? sampleResults 
    : sampleResults.filter(r => r.platform === selectedPlatform)

  const totalSalesSum = filteredResults.reduce((sum, r) => sum + r.totalSales, 0)
  const totalOrderCount = filteredResults.reduce((sum, r) => sum + r.orderCount, 0)

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="배달매출 조회" 
        showBack 
        onBack={() => router.back()}
      />

      <div className="p-4 space-y-4">
        {/* Info Banner */}
        <div className="bg-info-light border border-info/20 rounded-lg p-3">
          <p className="text-xs text-info">
            배달 플랫폼별 매출 및 정산 내역을 조회합니다. 홈 화면의 종합/캘린더/그래프와는 별도의 배달 전용 조회 화면입니다.
          </p>
        </div>

        {/* Inquiry Form */}
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">조회 기간</label>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-input bg-background text-sm">
                <span className="text-foreground">2025-03-01 ~ 2025-03-22</span>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Platform Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">플랫폼</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedPlatform === platform
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
              onClick={() => setShowResults(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              조회
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && (
          <div className="space-y-3">
            {/* Summary */}
            <Card className="bg-primary-light border-primary/20">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-primary/70 mb-1">총 배달매출</p>
                    <p className="text-lg font-bold text-primary">{totalSalesSum.toLocaleString()}원</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/70 mb-1">총 주문건수</p>
                    <p className="text-lg font-bold text-primary">{totalOrderCount}건</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                총 <span className="font-medium text-foreground">{filteredResults.length}</span>건
              </p>
            </div>

            {filteredResults.map((result) => (
              <Card 
                key={result.id} 
                className="overflow-hidden cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => router.push(`/mobile/delivery-sales/${result.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full ${getPlatformColor(result.platform)} flex items-center justify-center`}>
                        <UtensilsCrossed className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{result.platform}</p>
                        <p className="text-xs text-muted-foreground">{result.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">
                          {result.totalSales.toLocaleString()}원
                        </p>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusStyle(result.status)}`}>
                          {result.status}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">주문</span>
                      <span className="ml-1 font-medium text-foreground">{result.orderCount}건</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">취소</span>
                      <span className="ml-1 font-medium text-destructive">{result.cancelCount}건</span>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground">정산예정</span>
                      <span className="ml-1 font-medium text-foreground">{result.expectedSettlement.toLocaleString()}원</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
