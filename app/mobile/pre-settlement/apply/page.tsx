"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Zap, Clock, ChevronDown, ChevronUp, UtensilsCrossed, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SelectedItem {
  id: string
  platform: string
  orderNumber: string
  orderDateTime: string
  orderAmount: number
  expectedSettlement: number
}

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

export default function PreSettlementApplyPage() {
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
  const [showItemList, setShowItemList] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem("preSettlementSelectedItems")
    if (stored) {
      try {
        setSelectedItems(JSON.parse(stored))
      } catch {
        router.replace("/mobile/delivery-sales")
      }
    } else {
      router.replace("/mobile/delivery-sales")
    }
  }, [router])

  const summary = useMemo(() => {
    const count = selectedItems.length
    const totalOrderAmount = selectedItems.reduce((sum, r) => sum + r.orderAmount, 0)
    const totalSettlement = selectedItems.reduce((sum, r) => sum + r.expectedSettlement, 0)
    const realtimeFeeRate = 0.025 // 2.5%
    const nextDayFeeRate = 0.015 // 1.5%
    const realtimeFee = Math.round(totalSettlement * realtimeFeeRate)
    const nextDayFee = Math.round(totalSettlement * nextDayFeeRate)
    const realtimeReceive = totalSettlement - realtimeFee
    const nextDayReceive = totalSettlement - nextDayFee
    return { 
      count, 
      totalOrderAmount, 
      totalSettlement,
      realtimeFee,
      nextDayFee,
      realtimeReceive,
      nextDayReceive
    }
  }, [selectedItems])

  const handleSelectOption = (type: "realtime" | "next-day") => {
    // Keep the selected items in sessionStorage for the next page
    router.push(`/mobile/pre-settlement/${type}`)
  }

  if (selectedItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/delivery-sales" className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">선정산 신청</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Selected Summary Card */}
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-5">
            <p className="text-sm text-primary-foreground/80 mb-1">선정산 가능 금액</p>
            <p className="text-3xl font-bold">{summary.totalSettlement.toLocaleString()}원</p>
            <p className="text-xs text-primary-foreground/60 mt-2">
              {summary.count}건 선택 · 총 주문금액 {summary.totalOrderAmount.toLocaleString()}원
            </p>
          </CardContent>
        </Card>

        {/* Fee Comparison */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">수수료 비교</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <div>
                <p className="text-sm font-medium">실시간 선정산</p>
                <p className="text-xs text-muted-foreground">수수료 2.5%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-destructive">-{summary.realtimeFee.toLocaleString()}원</p>
                <p className="font-semibold text-primary">{summary.realtimeReceive.toLocaleString()}원</p>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="text-sm font-medium">익일 선정산</p>
                <p className="text-xs text-muted-foreground">수수료 1.5%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-destructive">-{summary.nextDayFee.toLocaleString()}원</p>
                <p className="font-semibold text-info">{summary.nextDayReceive.toLocaleString()}원</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Items Collapsible List */}
        <Card>
          <CardHeader className="pb-0">
            <button
              onClick={() => setShowItemList(!showItemList)}
              className="flex items-center justify-between w-full"
            >
              <CardTitle className="text-sm font-medium">선택된 주문 내역 ({summary.count}건)</CardTitle>
              {showItemList ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </CardHeader>
          {showItemList && (
            <CardContent className="pt-3 space-y-2">
              {selectedItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className={`h-8 w-8 rounded-full ${getPlatformColor(item.platform)} flex items-center justify-center shrink-0`}>
                    <UtensilsCrossed className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.platform}</p>
                    <p className="text-xs text-muted-foreground">{item.orderNumber}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold">{item.orderAmount.toLocaleString()}원</p>
                    <p className="text-xs text-muted-foreground">정산 {item.expectedSettlement.toLocaleString()}원</p>
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Pre-settlement Options */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">선정산 유형 선택</h2>
          
          {/* Realtime Pre-settlement */}
          <Card 
            className="hover:bg-muted/30 transition-colors cursor-pointer border-2 border-primary/20"
            onClick={() => handleSelectOption("realtime")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">실시간 선정산 신청하기</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    신청 후 10분 이내 입금 · 수수료 2.5%
                  </p>
                  <p className="text-lg font-bold text-primary mt-1">
                    {summary.realtimeReceive.toLocaleString()}원 수령
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next-day Pre-settlement */}
          <Card 
            className="hover:bg-muted/30 transition-colors cursor-pointer"
            onClick={() => handleSelectOption("next-day")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-info flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-info-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">익일 선정산 신청하기</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    다음 영업일 오전 입금 · 수수료 1.5%
                  </p>
                  <p className="text-lg font-bold text-info mt-1">
                    {summary.nextDayReceive.toLocaleString()}원 수령
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="bg-info-light border-info/20">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-info shrink-0 mt-0.5" />
              <div className="text-sm text-info">
                <p className="font-medium mb-1">선정산 안내</p>
                <ul className="text-xs space-y-1 text-info/80">
                  <li>• 실시간 선정산: 평일 09:00 ~ 17:00 신청 가능</li>
                  <li>• 익일 선정산: 24시간 신청 가능, 다음 영업일 지급</li>
                  <li>• 선택하신 {summary.count}건의 배달매출에 대해 선정산이 적용됩니다.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
