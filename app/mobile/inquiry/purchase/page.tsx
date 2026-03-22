"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ChevronDown, CreditCard, Search, Wallet } from "lucide-react"

const sampleResults = [
  { id: "1", cardCompany: "신한카드", purchaseDate: "2025-03-22", approvalCount: 15, totalAmount: 1250000, fee: 31250, netAmount: 1218750 },
  { id: "2", cardCompany: "삼성카드", purchaseDate: "2025-03-22", approvalCount: 8, totalAmount: 680000, fee: 17000, netAmount: 663000 },
  { id: "3", cardCompany: "현대카드", purchaseDate: "2025-03-21", approvalCount: 12, totalAmount: 920000, fee: 23000, netAmount: 897000 },
  { id: "4", cardCompany: "KB국민카드", purchaseDate: "2025-03-21", approvalCount: 6, totalAmount: 450000, fee: 11250, netAmount: 438750 },
]

export default function PurchaseInquiryPage() {
  const router = useRouter()
  const [showResults, setShowResults] = useState(false)

  const totalStats = {
    totalAmount: sampleResults.reduce((sum, r) => sum + r.totalAmount, 0),
    totalFee: sampleResults.reduce((sum, r) => sum + r.fee, 0),
    totalNet: sampleResults.reduce((sum, r) => sum + r.netAmount, 0),
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="매입내역 조회" 
        showBack 
        onBack={() => router.back()}
      />

      <div className="p-4 space-y-4">
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

            {/* Business Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">사업장 선택</label>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-input bg-background text-sm">
                <span className="text-foreground">행복한식당 (123-45-67890)</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
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
          <div className="space-y-4">
            {/* Summary */}
            <Card className="bg-primary-light border-primary/20">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-primary/70 mb-1">총 매입금액</p>
                    <p className="text-sm font-bold text-primary">{totalStats.totalAmount.toLocaleString()}원</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/70 mb-1">총 수수료</p>
                    <p className="text-sm font-bold text-primary">{totalStats.totalFee.toLocaleString()}원</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/70 mb-1">실 입금액</p>
                    <p className="text-sm font-bold text-primary">{totalStats.totalNet.toLocaleString()}원</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* List */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                총 <span className="font-medium text-foreground">{sampleResults.length}</span>건
              </p>

              {sampleResults.map((result) => (
                <Card key={result.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-info-light flex items-center justify-center">
                          <Wallet className="h-5 w-5 text-info" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{result.cardCompany}</p>
                          <p className="text-xs text-muted-foreground">{result.purchaseDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">
                          {result.netAmount.toLocaleString()}원
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {result.approvalCount}건 매입
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                      <span>매입액: {result.totalAmount.toLocaleString()}원</span>
                      <span>수수료: -{result.fee.toLocaleString()}원</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
