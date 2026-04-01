"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, AlertCircle, Clock, Wallet, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RealtimePreSettlementPage() {
  const [requestAmount, setRequestAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mock data
  const availableAmount = 2850000
  const feeRate = 0.025 // 2.5%
  const bankAccount = {
    bank: "신한은행",
    number: "110-***-***890",
    holder: "행복한식당",
  }
  const availableHours = "평일 09:00 ~ 17:00"

  const numericAmount = parseInt(requestAmount.replace(/,/g, "")) || 0
  const estimatedFee = Math.round(numericAmount * feeRate)
  const estimatedReceive = numericAmount - estimatedFee

  const handleAmountChange = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, "")
    if (numeric) {
      setRequestAmount(parseInt(numeric).toLocaleString())
    } else {
      setRequestAmount("")
    }
  }

  const handleQuickAmount = (amount: number) => {
    setRequestAmount(amount.toLocaleString())
  }

  const handleSubmit = () => {
    if (numericAmount < 100000 || numericAmount > availableAmount) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
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
            신청이 완료되었습니다.<br />
            약 10분 이내에 입금될 예정입니다.
          </p>
          
          <Card className="w-full mb-6">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">신청 금액</span>
                <span className="font-semibold">{numericAmount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">수수료</span>
                <span className="text-destructive">-{estimatedFee.toLocaleString()}원</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-medium">실수령액</span>
                <span className="font-bold text-primary">{estimatedReceive.toLocaleString()}원</span>
              </div>
            </CardContent>
          </Card>

          <div className="w-full space-y-3">
            <Link href="/mobile/pre-settlement/history" className="block">
              <Button variant="outline" className="w-full">신청 내역 보기</Button>
            </Link>
            <Link href="/mobile/pre-settlement" className="block">
              <Button className="w-full">선정산 홈으로</Button>
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
          <Link href="/mobile/pre-settlement" className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">실시간 선정산</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Available Amount */}
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-4">
            <p className="text-sm text-primary-foreground/80 mb-1">신청 가능 금액</p>
            <p className="text-2xl font-bold">{availableAmount.toLocaleString()}원</p>
          </CardContent>
        </Card>

        {/* Amount Input */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">신청 금액 입력</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount" className="sr-only">금액</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={requestAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="text-right text-xl font-semibold pr-8 h-14"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">원</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">최소 100,000원 ~ 최대 {availableAmount.toLocaleString()}원</p>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[100000, 500000, 1000000, availableAmount].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAmount(amount)}
                  className="text-xs"
                >
                  {amount === availableAmount ? "전액" : `${(amount / 10000).toLocaleString()}만`}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fee Calculation */}
        {numericAmount > 0 && (
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">예상 수수료 (2.5%)</span>
                <span className="text-destructive">-{estimatedFee.toLocaleString()}원</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-medium">실수령 예상 금액</span>
                <span className="font-bold text-primary text-lg">{estimatedReceive.toLocaleString()}원</span>
              </div>
            </CardContent>
          </Card>
        )}

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
                  <li>• 수수료는 신청 금액에서 차감 후 입금됩니다.</li>
                  <li>• 입금은 신청 후 약 10분 이내 처리됩니다.</li>
                  <li>• 은행 점검 시간에는 지연될 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="pt-2 pb-4">
          <Button
            className="w-full h-14 text-lg font-semibold"
            disabled={numericAmount < 100000 || numericAmount > availableAmount || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "신청 중..." : "실시간 선정산 신청하기"}
          </Button>
        </div>
      </div>
    </div>
  )
}
