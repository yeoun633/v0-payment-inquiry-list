"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ChevronDown, Search, TrendingUp, CheckCircle2, Clock } from "lucide-react"

const sampleResults = [
  { id: "1", cardCompany: "신한카드", depositDate: "2025-03-23", status: "scheduled", amount: 1218750 },
  { id: "2", cardCompany: "삼성카드", depositDate: "2025-03-23", status: "scheduled", amount: 663000 },
  { id: "3", cardCompany: "현대카드", depositDate: "2025-03-22", status: "completed", amount: 897000 },
  { id: "4", cardCompany: "KB국민카드", depositDate: "2025-03-22", status: "completed", amount: 438750 },
  { id: "5", cardCompany: "신한카드", depositDate: "2025-03-21", status: "completed", amount: 1105000 },
]

const statusConfig = {
  scheduled: { label: "입금예정", icon: Clock, color: "text-warning-foreground", bgColor: "bg-warning-light" },
  completed: { label: "입금완료", icon: CheckCircle2, color: "text-success", bgColor: "bg-success-light" },
}

export default function DepositInquiryPage() {
  const router = useRouter()
  const [showResults, setShowResults] = useState(false)

  const scheduledTotal = sampleResults
    .filter(r => r.status === "scheduled")
    .reduce((sum, r) => sum + r.amount, 0)
  
  const completedTotal = sampleResults
    .filter(r => r.status === "completed")
    .reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="입금내역 조회" 
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
                <span className="text-foreground">2025-03-01 ~ 2025-03-23</span>
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
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-warning-light border-warning/20">
                <CardContent className="p-4 text-center">
                  <Clock className="h-5 w-5 text-warning-foreground mx-auto mb-2" />
                  <p className="text-xs text-warning-foreground/70 mb-1">입금예정</p>
                  <p className="text-lg font-bold text-warning-foreground">{scheduledTotal.toLocaleString()}원</p>
                </CardContent>
              </Card>
              <Card className="bg-success-light border-success/20">
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="h-5 w-5 text-success mx-auto mb-2" />
                  <p className="text-xs text-success/70 mb-1">입금완료</p>
                  <p className="text-lg font-bold text-success">{completedTotal.toLocaleString()}원</p>
                </CardContent>
              </Card>
            </div>

            {/* List */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                총 <span className="font-medium text-foreground">{sampleResults.length}</span>건
              </p>

              {sampleResults.map((result) => {
                const status = statusConfig[result.status as keyof typeof statusConfig]
                const StatusIcon = status.icon
                
                return (
                  <Card key={result.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-full ${status.bgColor} flex items-center justify-center`}>
                            <TrendingUp className={`h-5 w-5 ${status.color}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{result.cardCompany}</p>
                            <p className="text-xs text-muted-foreground">{result.depositDate}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">
                            {result.amount.toLocaleString()}원
                          </p>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${status.bgColor} ${status.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
