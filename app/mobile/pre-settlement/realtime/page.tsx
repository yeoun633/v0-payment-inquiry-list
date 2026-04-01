"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, AlertCircle, Clock, Wallet, CheckCircle2, UtensilsCrossed, ChevronDown, ChevronUp } from "lucide-react"
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

export default function RealtimePreSettlementPage() {
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showItemList, setShowItemList] = useState(false)

  // Mock bank account data
  const bankAccount = {
    bank: "신한은행",
    number: "110-***-***890",
    holder: "행복한식당",
  }
  const availableHours = "평일 09:00 ~ 17:00"
  const feeRate = 0.025 // 2.5%

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
    const estimatedFee = Math.round(totalSettlement * feeRate)
    const estimatedReceive = totalSettlement - estimatedFee
    return { count, totalOrderAmount, totalSettlement, estimatedFee, estimatedReceive }
  }, [selectedItems])

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Clear sessionStorage after successful submission
      sessionStorage.removeItem("preSettlementSelectedIds")
      sessionStorage.removeItem("preSettlementSelectedItems")
    }, 1500)
  }

  if (selectedItems.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
          <div className="flex items-center h-14 px-4">
            <Link href="/mobile/pre-settlement" className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="flex-1 text-center text-lg font-semibold pr-7">신청 완료</h1>
          </div>
        </header>

        <div className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="h-20 w-20 rounded-full bg-success-light flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">실시간 선정산 신청 완료</h2>
          <p className="text-muted-foreground text-center mb-6">
            {summary.count}건에 대한 선정산 신청이 완료되었습니다.<br />
            약 10분 이내에 입금될 예정입니다.
          </p>
          
          <Card className="w-full mb-6">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">신청 대상</span>
                <span className="font-semibold">{summary.count}건</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">선정산 금액</span>
                <span className="font-semibold">{summary.totalSettlement.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">수수료 (2.5%)</span>
                <span className="text-destructive">-{summary.estimatedFee.toLocaleString()}원</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-medium">실수령액</span>
                <span className="font-bold text-primary">{summary.estimatedReceive.toLocaleString()}원</span>
              </div>
            </CardContent>
          </Card>

          <div className="w-full space-y-3">
            <Link href="/mobile/pre-settlement/history" className="block">
              <Button variant="outline" className="w-full">신청 내역 보기</Button>
            </Link>
            <Link href="/mobile/delivery-sales" className="block">
              <Button className="w-full">배달매출 조회로</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/pre-settlement/apply" className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">실시간 선정산</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Application Summary */}
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-primary-foreground/80">신청 대상</p>
              <p className="text-sm font-medium">{summary.count}건</p>
            </div>
            <p className="text-3xl font-bold">{summary.totalSettlement.toLocaleString()}원</p>
            <p className="text-xs text-primary-foreground/60 mt-2">
              총 주문금액 {summary.totalOrderAmount.toLocaleString()}원
            </p>
          </CardContent>
        </Card>

        {/* Fee Calculation */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">정산 내역</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">신청 가능 금액</span>
              <span className="font-medium">{summary.totalSettlement.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">예상 수수료 (2.5%)</span>
              <span className="text-destructive">-{summary.estimatedFee.toLocaleString()}원</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-medium">실수령 예상 금액</span>
              <span className="font-bold text-primary text-lg">{summary.estimatedReceive.toLocaleString()}원</span>
            </div>
          </CardContent>
        </Card>

        {/* Selected Items Collapsible */}
        <Card>
          <CardHeader className="pb-0">
            <button
              onClick={() => setShowItemList(!showItemList)}
              className="flex items-center justify-between w-full"
            >
              <CardTitle className="text-sm font-medium">신청 대상 내역 ({summary.count}건)</CardTitle>
              {showItemList ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </CardHeader>
          {showItemList && (
            <CardContent className="pt-3 space-y-2 max-h-60 overflow-y-auto">
              {selectedItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg"
                >
                  <div className={`h-6 w-6 rounded-full ${getPlatformColor(item.platform)} flex items-center justify-center shrink-0`}>
                    <UtensilsCrossed className="h-3 w-3 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.orderNumber}</p>
                  </div>
                  <p className="text-xs font-semibold shrink-0">{item.expectedSettlement.toLocaleString()}원</p>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Bank Account */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              입금 계좌
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="font-semibold">{bankAccount.bank} {bankAccount.number}</p>
            <p className="text-sm text-muted-foreground">{bankAccount.holder}</p>
          </CardContent>
        </Card>

        {/* Available Time */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              신청 가능 시간
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="font-semibold">{availableHours}</p>
            <p className="text-xs text-muted-foreground mt-1">공휴일 제외</p>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="bg-warning-light border-warning/20">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-warning-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-warning-foreground mb-2">유의사항</p>
                <ul className="text-xs text-warning-foreground/80 space-y-1">
                  <li>• 신청 후 취소가 불가합니다.</li>
                  <li>• 선택하신 {summary.count}건에 대해 선정산이 적용됩니다.</li>
                  <li>• 수수료는 정산예정액에서 차감 후 입금됩니다.</li>
                  <li>• 입금은 신청 후 약 10분 이내 처리됩니다.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="pt-2 pb-4">
          <Button
            className="w-full h-14 text-lg font-semibold"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "신청 중..." : "실시간 선정산 신청하기"}
          </Button>
        </div>
      </div>
    </div>
  )
}
