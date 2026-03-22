"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ChevronDown, CreditCard, Search } from "lucide-react"

const cardCompanies = ["전체", "신한카드", "삼성카드", "현대카드", "KB국민카드", "BC카드"]

const sampleResults = [
  { id: "1", cardCompany: "신한카드", date: "2025-03-22", time: "14:32", amount: 125000, status: "승인", cardNumber: "**** 1234" },
  { id: "2", cardCompany: "삼성카드", date: "2025-03-22", time: "13:15", amount: 45000, status: "승인", cardNumber: "**** 5678" },
  { id: "3", cardCompany: "현대카드", date: "2025-03-22", time: "11:42", amount: 89000, status: "승인", cardNumber: "**** 9012" },
  { id: "4", cardCompany: "KB국민카드", date: "2025-03-21", time: "18:20", amount: 32500, status: "승인", cardNumber: "**** 3456" },
  { id: "5", cardCompany: "신한카드", date: "2025-03-21", time: "15:55", amount: 178000, status: "취소", cardNumber: "**** 1234" },
]

export default function ApprovalInquiryPage() {
  const router = useRouter()
  const [selectedCard, setSelectedCard] = useState("전체")
  const [showResults, setShowResults] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="카드 승인내역 조회" 
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                총 <span className="font-medium text-foreground">{sampleResults.length}</span>건
              </p>
              <p className="text-sm font-medium text-primary">
                합계 {sampleResults.reduce((sum, r) => sum + (r.status === "승인" ? r.amount : 0), 0).toLocaleString()}원
              </p>
            </div>

            {sampleResults.map((result) => (
              <Card key={result.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{result.cardCompany}</p>
                        <p className="text-xs text-muted-foreground">{result.cardNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${result.status === "취소" ? "text-destructive" : "text-foreground"}`}>
                        {result.status === "취소" ? "-" : ""}{result.amount.toLocaleString()}원
                      </p>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        result.status === "승인" 
                          ? "bg-success-light text-success" 
                          : "bg-destructive-light text-destructive"
                      }`}>
                        {result.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>{result.date}</span>
                    <span>{result.time}</span>
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
