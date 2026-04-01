"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ChevronRight, Search, UtensilsCrossed } from "lucide-react"

const platforms = ["전체", "배달의민족", "쿠팡이츠", "요기요", "땡겨요"]

// Transaction-level sample data (individual orders)
const sampleResults = [
  { 
    id: "1", 
    platform: "배달의민족", 
    orderNumber: "B20250322-001542",
    orderDateTime: "2025-03-22 14:32:15",
    orderAmount: 32500,
    cancelAmount: 0,
    expectedSettlement: 29900,
    status: "정산완료",
  },
  { 
    id: "2", 
    platform: "배달의민족", 
    orderNumber: "B20250322-001538",
    orderDateTime: "2025-03-22 13:45:22",
    orderAmount: 28000,
    cancelAmount: 0,
    expectedSettlement: 25760,
    status: "정산완료",
  },
  { 
    id: "3", 
    platform: "쿠팡이츠", 
    orderNumber: "CE20250322-087421",
    orderDateTime: "2025-03-22 12:18:44",
    orderAmount: 45000,
    cancelAmount: 0,
    expectedSettlement: 41400,
    status: "정산예정",
  },
  { 
    id: "4", 
    platform: "배달의민족", 
    orderNumber: "B20250322-001525",
    orderDateTime: "2025-03-22 11:55:03",
    orderAmount: 18500,
    cancelAmount: 18500,
    expectedSettlement: 0,
    status: "취소",
  },
  { 
    id: "5", 
    platform: "요기요", 
    orderNumber: "YG20250322-445621",
    orderDateTime: "2025-03-22 11:22:18",
    orderAmount: 52000,
    cancelAmount: 0,
    expectedSettlement: 47840,
    status: "정산완료",
  },
  { 
    id: "6", 
    platform: "쿠팡이츠", 
    orderNumber: "CE20250322-087398",
    orderDateTime: "2025-03-22 10:48:33",
    orderAmount: 38000,
    cancelAmount: 0,
    expectedSettlement: 34960,
    status: "정산예정",
  },
  { 
    id: "7", 
    platform: "땡겨요", 
    orderNumber: "TG20250322-012847",
    orderDateTime: "2025-03-22 10:15:55",
    orderAmount: 22000,
    cancelAmount: 0,
    expectedSettlement: 20240,
    status: "정산예정",
  },
  { 
    id: "8", 
    platform: "배달의민족", 
    orderNumber: "B20250321-001498",
    orderDateTime: "2025-03-21 19:42:11",
    orderAmount: 67500,
    cancelAmount: 0,
    expectedSettlement: 62100,
    status: "정산완료",
  },
  { 
    id: "9", 
    platform: "요기요", 
    orderNumber: "YG20250321-445589",
    orderDateTime: "2025-03-21 18:33:27",
    orderAmount: 29000,
    cancelAmount: 0,
    expectedSettlement: 26680,
    status: "정산완료",
  },
  { 
    id: "10", 
    platform: "쿠팡이츠", 
    orderNumber: "CE20250321-087342",
    orderDateTime: "2025-03-21 17:15:08",
    orderAmount: 41500,
    cancelAmount: 41500,
    expectedSettlement: 0,
    status: "취소",
  },
]

function getPlatformColor(platform: string): string {
  switch (platform) {
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
    case "취소":
      return "bg-destructive-light text-destructive"
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

  const totalAmount = filteredResults
    .filter(r => r.status !== "취소")
    .reduce((sum, r) => sum + r.orderAmount, 0)

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
            배달 플랫폼별 주문 건별 매출 내역을 조회합니다. 홈 화면의 종합/캘린더/그래프와는 별도의 배달 전용 조회 화면입니다.
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
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                총 <span className="font-medium text-foreground">{filteredResults.length}</span>건
              </p>
              <p className="text-sm font-medium text-primary">
                합계 {totalAmount.toLocaleString()}원
              </p>
            </div>

            {/* Transaction List */}
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
                        <p className="text-xs text-muted-foreground">{result.orderNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${result.status === "취소" ? "text-destructive line-through" : "text-foreground"}`}>
                          {result.orderAmount.toLocaleString()}원
                        </p>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusStyle(result.status)}`}>
                          {result.status}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>{result.orderDateTime}</span>
                    {result.status !== "취소" && (
                      <span>정산예정 <span className="font-medium text-foreground">{result.expectedSettlement.toLocaleString()}원</span></span>
                    )}
                    {result.status === "취소" && (
                      <span className="text-destructive">취소금액 {result.cancelAmount.toLocaleString()}원</span>
                    )}
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
