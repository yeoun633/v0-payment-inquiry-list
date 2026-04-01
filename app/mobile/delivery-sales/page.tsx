"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, ChevronRight, Search, UtensilsCrossed, Zap } from "lucide-react"

const platforms = ["전체", "배달의민족", "쿠팡이츠", "요기요", "땡겨요"]

// Pre-settlement eligibility statuses
type PreSettlementStatus = "선정산 가능" | "선정산 신청완료" | "선정산 불가" | "정산완료" | "취소건"

interface DeliveryTransaction {
  id: string
  platform: string
  orderNumber: string
  orderDateTime: string
  orderAmount: number
  cancelAmount: number
  expectedSettlement: number
  status: string
  preSettlementStatus: PreSettlementStatus
}

// Transaction-level sample data (individual orders)
const sampleResults: DeliveryTransaction[] = [
  { 
    id: "1", 
    platform: "배달의민족", 
    orderNumber: "B20250322-001542",
    orderDateTime: "2025-03-22 14:32:15",
    orderAmount: 32500,
    cancelAmount: 0,
    expectedSettlement: 29900,
    status: "정산예정",
    preSettlementStatus: "선정산 가능",
  },
  { 
    id: "2", 
    platform: "배달의민족", 
    orderNumber: "B20250322-001538",
    orderDateTime: "2025-03-22 13:45:22",
    orderAmount: 28000,
    cancelAmount: 0,
    expectedSettlement: 25760,
    status: "정산예정",
    preSettlementStatus: "선정산 가능",
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
    preSettlementStatus: "선정산 신청완료",
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
    preSettlementStatus: "취소건",
  },
  { 
    id: "5", 
    platform: "요기요", 
    orderNumber: "YG20250322-445621",
    orderDateTime: "2025-03-22 11:22:18",
    orderAmount: 52000,
    cancelAmount: 0,
    expectedSettlement: 47840,
    status: "정산예정",
    preSettlementStatus: "선정산 가능",
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
    preSettlementStatus: "선정산 불가",
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
    preSettlementStatus: "선정산 가능",
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
    preSettlementStatus: "정산완료",
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
    preSettlementStatus: "정산완료",
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
    preSettlementStatus: "취소건",
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

function getPreSettlementStatusStyle(status: PreSettlementStatus): { bg: string; text: string } {
  switch (status) {
    case "선정산 가능":
      return { bg: "bg-primary/10", text: "text-primary" }
    case "선정산 신청완료":
      return { bg: "bg-info-light", text: "text-info" }
    case "선정산 불가":
      return { bg: "bg-muted", text: "text-muted-foreground" }
    case "정산완료":
      return { bg: "bg-success-light", text: "text-success" }
    case "취소건":
      return { bg: "bg-destructive-light", text: "text-destructive" }
    default:
      return { bg: "bg-muted", text: "text-muted-foreground" }
  }
}

function isSelectable(status: PreSettlementStatus): boolean {
  return status === "선정산 가능"
}

export default function DeliverySalesPage() {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState("전체")
  const [showResults, setShowResults] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const filteredResults = selectedPlatform === "전체" 
    ? sampleResults 
    : sampleResults.filter(r => r.platform === selectedPlatform)

  const totalAmount = filteredResults
    .filter(r => r.status !== "취소")
    .reduce((sum, r) => sum + r.orderAmount, 0)

  // Calculate selected items summary
  const selectedItems = useMemo(() => {
    return filteredResults.filter(r => selectedIds.has(r.id))
  }, [filteredResults, selectedIds])

  const selectedSummary = useMemo(() => {
    const count = selectedItems.length
    const totalOrderAmount = selectedItems.reduce((sum, r) => sum + r.orderAmount, 0)
    const totalSettlement = selectedItems.reduce((sum, r) => sum + r.expectedSettlement, 0)
    const feeRate = 0.025 // 2.5% for realtime
    const estimatedFee = Math.round(totalSettlement * feeRate)
    const estimatedReceive = totalSettlement - estimatedFee
    return { count, totalOrderAmount, totalSettlement, estimatedFee, estimatedReceive }
  }, [selectedItems])

  const eligibleItems = filteredResults.filter(r => isSelectable(r.preSettlementStatus))

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleSelectAll = () => {
    if (selectedIds.size === eligibleItems.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(eligibleItems.map(r => r.id)))
    }
  }

  const handleApplyPreSettlement = () => {
    // Store selected IDs in sessionStorage for the apply page
    sessionStorage.setItem("preSettlementSelectedIds", JSON.stringify(Array.from(selectedIds)))
    sessionStorage.setItem("preSettlementSelectedItems", JSON.stringify(selectedItems))
    router.push("/mobile/pre-settlement/apply")
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <MobileHeader 
        title="배달매출 조회" 
        showBack 
        onBack={() => router.back()}
      />

      <div className="p-4 space-y-4">
        {/* Info Banner */}
        <div className="bg-info-light border border-info/20 rounded-lg p-3">
          <p className="text-xs text-info">
            배달 플랫폼별 주문 건별 매출 내역을 조회하고, 선정산 가능 건을 선택하여 선정산을 신청할 수 있습니다.
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
              onClick={() => {
                setShowResults(true)
                setSelectedIds(new Set())
              }}
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
                {eligibleItems.length > 0 && (
                  <span className="text-primary ml-1">(선정산 가능 {eligibleItems.length}건)</span>
                )}
              </p>
              <p className="text-sm font-medium text-primary">
                합계 {totalAmount.toLocaleString()}원
              </p>
            </div>

            {/* Select All */}
            {eligibleItems.length > 0 && (
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Checkbox
                  id="selectAll"
                  checked={selectedIds.size > 0 && selectedIds.size === eligibleItems.length}
                  onCheckedChange={handleSelectAll}
                />
                <label 
                  htmlFor="selectAll" 
                  className="text-sm font-medium cursor-pointer flex-1"
                >
                  선정산 가능 건 전체 선택
                </label>
                <span className="text-xs text-muted-foreground">
                  {selectedIds.size}/{eligibleItems.length}건 선택
                </span>
              </div>
            )}

            {/* Transaction List */}
            {filteredResults.map((result) => {
              const canSelect = isSelectable(result.preSettlementStatus)
              const isSelected = selectedIds.has(result.id)
              const statusStyle = getPreSettlementStatusStyle(result.preSettlementStatus)

              return (
                <Card 
                  key={result.id} 
                  className={`overflow-hidden transition-colors ${
                    canSelect 
                      ? isSelected 
                        ? "ring-2 ring-primary bg-primary/5" 
                        : "hover:bg-muted/30 cursor-pointer"
                      : "opacity-70"
                  }`}
                  onClick={() => canSelect && handleToggleSelect(result.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Checkbox for selectable items */}
                      <div className="pt-1">
                        {canSelect ? (
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleToggleSelect(result.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <div className="w-4 h-4 rounded border border-muted-foreground/30 bg-muted" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className={`h-8 w-8 rounded-full ${getPlatformColor(result.platform)} flex items-center justify-center shrink-0`}>
                              <UtensilsCrossed className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{result.platform}</p>
                              <p className="text-xs text-muted-foreground">{result.orderNumber}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className={`text-sm font-semibold ${result.preSettlementStatus === "취소건" ? "text-destructive line-through" : "text-foreground"}`}>
                              {result.orderAmount.toLocaleString()}원
                            </p>
                          </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{result.orderDateTime}</span>
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                            {result.preSettlementStatus}
                          </span>
                        </div>

                        {result.preSettlementStatus !== "취소건" && (
                          <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">정산예정액</span>
                            <span className="font-medium text-foreground">{result.expectedSettlement.toLocaleString()}원</span>
                          </div>
                        )}

                        {/* Detail link for non-selectable items */}
                        {!canSelect && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/mobile/delivery-sales/${result.id}`)
                            }}
                            className="mt-2 text-xs text-primary flex items-center gap-1"
                          >
                            상세보기 <ChevronRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Fixed Bottom Action Bar */}
      {showResults && selectedIds.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg">
          <div className="p-4 space-y-3">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">선택 건수</span>
                <span className="font-medium">{selectedSummary.count}건</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">선택 금액</span>
                <span className="font-medium">{selectedSummary.totalOrderAmount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">예상 수수료</span>
                <span className="text-destructive">-{selectedSummary.estimatedFee.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">실수령 예상</span>
                <span className="font-semibold text-primary">{selectedSummary.estimatedReceive.toLocaleString()}원</span>
              </div>
            </div>

            {/* Apply Button */}
            <Button 
              className="w-full h-12 text-base font-semibold"
              onClick={handleApplyPreSettlement}
            >
              <Zap className="h-5 w-5 mr-2" />
              선정산 신청하기
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
