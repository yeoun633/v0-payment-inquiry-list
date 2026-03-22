"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ChevronDown, 
  ChevronRight, 
  Building2, 
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"

const recentInquiries = [
  { 
    id: "1", 
    merchantName: "행복한식당", 
    businessNumber: "123-45-67890",
    requestDate: "2025-03-22 14:30",
    status: "completed",
  },
  { 
    id: "2", 
    merchantName: "맛있는갈비", 
    businessNumber: "234-56-78901",
    requestDate: "2025-03-21 10:15",
    status: "completed",
  },
  { 
    id: "3", 
    merchantName: "서울카페", 
    businessNumber: "345-67-89012",
    requestDate: "2025-03-20 16:45",
    status: "pending",
  },
]

const statusConfig = {
  completed: { label: "완료", icon: CheckCircle2, color: "text-success", bgColor: "bg-success-light" },
  pending: { label: "조회중", icon: Clock, color: "text-warning-foreground", bgColor: "bg-warning-light" },
  failed: { label: "실패", icon: AlertCircle, color: "text-destructive", bgColor: "bg-destructive-light" },
}

export default function MerchantInquiryPage() {
  const router = useRouter()
  const [isInquiring, setIsInquiring] = useState(false)

  const handleInquiry = () => {
    setIsInquiring(true)
    setTimeout(() => {
      router.push("/mobile/inquiry/merchant/result")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="가맹점 정보 조회" 
        showBack 
        onBack={() => router.back()}
      />

      <div className="p-4 space-y-6">
        {/* Inquiry Form */}
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Business Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">사업장 선택</label>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-input bg-background text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-foreground font-medium">행복한식당</p>
                    <p className="text-xs text-muted-foreground">123-45-67890</p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Info Notice */}
            <div className="p-3 bg-info-light rounded-lg">
              <p className="text-xs text-info">
                여신금융협회를 통해 해당 사업장의 가맹점 정보를 조회합니다. 
                조회 결과는 즉시 확인 가능하며, 결과 내역에서 상세 정보를 확인할 수 있습니다.
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
              onClick={handleInquiry}
              disabled={isInquiring}
            >
              {isInquiring ? (
                <>
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  조회 중...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  조회하기
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground">최근 조회 내역</h2>
            <Link href="/mobile/inquiry/merchant/history" className="flex items-center text-xs text-primary">
              전체보기 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentInquiries.map((inquiry) => {
              const status = statusConfig[inquiry.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              
              return (
                <Link key={inquiry.id} href={`/mobile/inquiry/merchant/${inquiry.id}`}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{inquiry.merchantName}</p>
                            <p className="text-xs text-muted-foreground">{inquiry.businessNumber}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${status.bgColor} ${status.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{inquiry.requestDate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
