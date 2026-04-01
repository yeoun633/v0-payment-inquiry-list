"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ChevronDown, ChevronRight, Search, Wallet } from "lucide-react"

const cardCompanies = ["전체", "신한카드", "삼성카드", "현대카드", "KB국민카드", "BC카드"]

const statusConfig = {
  "매입예정": { bg: "bg-info-light", text: "text-info" },
  "매입완료": { bg: "bg-success-light", text: "text-success" },
  "매입보류": { bg: "bg-warning-light", text: "text-warning-foreground" },
  "취소반영": { bg: "bg-destructive-light", text: "text-destructive" },
} as const

type PurchaseStatus = keyof typeof statusConfig

interface PurchaseItem {
  id: string
  cardCompany: string
  approvalDate: string
  approvalTime: string
  approvalNumber: string
  approvalAmount: number
  fee: number
  purchaseAmount: number
  status: PurchaseStatus
}

const sampleResults: PurchaseItem[] = [
  { id: "1", cardCompany: "신한카드", approvalDate: "2025-03-22", approvalTime: "14:32", approvalNumber: "12345678", approvalAmount: 125000, fee: 3125, purchaseAmount: 121875, status: "매입완료" },
  { id: "2", cardCompany: "삼성카드", approvalDate: "2025-03-22", approvalTime: "13:15", approvalNumber: "23456789", approvalAmount: 45000, fee: 1125, purchaseAmount: 43875, status: "매입완료" },
  { id: "3", cardCompany: "현대카드", approvalDate: "2025-03-22", approvalTime: "11:42", approvalNumber: "34567890", approvalAmount: 89000, fee: 2225, purchaseAmount: 86775, status: "매입예정" },
  { id: "4", cardCompany: "KB국민카드", approvalDate: "2025-03-21", approvalTime: "18:20", approvalNumber: "45678901", approvalAmount: 32500, fee: 813, purchaseAmount: 31687, status: "매입예정" },
  { id: "5", cardCompany: "신한카드", approvalDate: "2025-03-21", approvalTime: "15:55", approvalNumber: "56789012", approvalAmount: 178000, fee: 4450, purchaseAmount: 173550, status: "취소반영" },
  { id: "6", cardCompany: "BC카드", approvalDate: "2025-03-21", approvalTime: "12:30", approvalNumber: "67890123", approvalAmount: 65000, fee: 1625, purchaseAmount: 63375, status: "매입보류" },
  { id: "7", cardCompany: "삼성카드", approvalDate: "2025-03-20", approvalTime: "16:45", approvalNumber: "78901234", approvalAmount: 210000, fee: 5250, purchaseAmount: 204750, status: "매입완료" },
]

export default function PurchaseInquiryPage() {
  const router = useRouter()
  const [selectedCard, setSelectedCard] = useState("전체")
  const [showResults, setShowResults] = useState(false)

  const filteredResults = selectedCard === "전체" 
    ? sampleResults 
    : sampleResults.filter(r => r.cardCompany === selectedCard)

  const totalStats = {
    totalApproval: filteredResults.reduce((sum, r) => sum + (r.status !== "취소반영" ? r.approvalAmount : 0), 0),
    totalFee: filteredResults.reduce((sum, r) => sum + (r.status !== "취소반영" ? r.fee : 0), 0),
    totalPurchase: filteredResults.reduce((sum, r) => sum + (r.status !== "취소반영" ? r.purchaseAmount : 0), 0),
  }

  const handleItemClick = (id: string) => {
    router.push(`/mobile/inquiry/purchase/${id}`)
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

            {/* Card Company Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">카드사</label>
              <div className="flex flex-wrap gap-2">
                {cardCompanies.map((card) => (
                  <button
                    key={card}
                    onClick={() => setSelectedCard(card)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedCard === card
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {card}
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
          <div className="space-y-4">
            {/* Summary */}
            <Card className="bg-primary-light border-primary/20">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-primary/70 mb-1">총 승인금액</p>
                    <p className="text-sm font-bold text-primary">{totalStats.totalApproval.toLocaleString()}원</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/70 mb-1">총 수수료</p>
                    <p className="text-sm font-bold text-primary">{totalStats.totalFee.toLocaleString()}원</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/70 mb-1">총 매입금액</p>
                    <p className="text-sm font-bold text-primary">{totalStats.totalPurchase.toLocaleString()}원</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  총 <span className="font-medium text-foreground">{filteredResults.length}</span>건
                </p>
              </div>

              {filteredResults.map((result) => (
                <Card 
                  key={result.id} 
                  className="overflow-hidden cursor-pointer active:bg-muted/30 transition-colors"
                  onClick={() => handleItemClick(result.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-info-light flex items-center justify-center">
                          <Wallet className="h-5 w-5 text-info" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{result.cardCompany}</p>
                          <p className="text-xs text-muted-foreground">승인번호: {result.approvalNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="text-right">
                          <p className={`text-sm font-semibold ${result.status === "취소반영" ? "text-destructive line-through" : "text-foreground"}`}>
                            {result.purchaseAmount.toLocaleString()}원
                          </p>
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${statusConfig[result.status].bg} ${statusConfig[result.status].text}`}>
                            {result.status}
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground mt-0.5" />
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{result.approvalDate} {result.approvalTime}</span>
                        <span>수수료: -{result.fee.toLocaleString()}원</span>
                      </div>
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
