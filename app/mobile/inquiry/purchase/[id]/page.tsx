"use client"

import { useRouter, useParams } from "next/navigation"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  CreditCard, 
  Calendar,
  Hash,
  Wallet,
  Receipt,
  Building2,
  FileText,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  RefreshCw,
  Download,
} from "lucide-react"

const statusConfig = {
  "매입예정": { bg: "bg-info-light", text: "text-info", border: "border-info/20", icon: Clock },
  "매입완료": { bg: "bg-success-light", text: "text-success", border: "border-success/20", icon: CheckCircle2 },
  "매입보류": { bg: "bg-warning-light", text: "text-warning-foreground", border: "border-warning/20", icon: AlertCircle },
  "취소반영": { bg: "bg-destructive-light", text: "text-destructive", border: "border-destructive/20", icon: XCircle },
} as const

type PurchaseStatus = keyof typeof statusConfig

interface PurchaseDetail {
  id: string
  cardCompany: string
  approvalNumber: string
  originalApprovalDate: string
  originalApprovalTime: string
  purchaseDate: string
  cardNumber: string
  approvalAmount: number
  fee: number
  purchaseAmount: number
  status: PurchaseStatus
  merchantName: string
  businessNumber: string
  memo: string
}

const sampleData: Record<string, PurchaseDetail> = {
  "1": { id: "1", cardCompany: "신한카드", approvalNumber: "12345678", originalApprovalDate: "2025-03-22", originalApprovalTime: "14:32:15", purchaseDate: "2025-03-25", cardNumber: "**** **** **** 1234", approvalAmount: 125000, fee: 3125, purchaseAmount: 121875, status: "매입완료", merchantName: "행복한식당", businessNumber: "123-45-67890", memo: "정상 매입 처리 완료" },
  "2": { id: "2", cardCompany: "삼성카드", approvalNumber: "23456789", originalApprovalDate: "2025-03-22", originalApprovalTime: "13:15:42", purchaseDate: "2025-03-25", cardNumber: "**** **** **** 5678", approvalAmount: 45000, fee: 1125, purchaseAmount: 43875, status: "매입완료", merchantName: "행복한식당", businessNumber: "123-45-67890", memo: "정상 매입 처리 완료" },
  "3": { id: "3", cardCompany: "현대카드", approvalNumber: "34567890", originalApprovalDate: "2025-03-22", originalApprovalTime: "11:42:08", purchaseDate: "2025-03-26", cardNumber: "**** **** **** 9012", approvalAmount: 89000, fee: 2225, purchaseAmount: 86775, status: "매입예정", merchantName: "행복한식당", businessNumber: "123-45-67890", memo: "D+3 매입 예정" },
  "4": { id: "4", cardCompany: "KB국민카드", approvalNumber: "45678901", originalApprovalDate: "2025-03-21", originalApprovalTime: "18:20:33", purchaseDate: "2025-03-25", cardNumber: "**** **** **** 3456", approvalAmount: 32500, fee: 813, purchaseAmount: 31687, status: "매입예정", merchantName: "행복한식당", businessNumber: "123-45-67890", memo: "D+3 매입 예정" },
  "5": { id: "5", cardCompany: "신한카드", approvalNumber: "56789012", originalApprovalDate: "2025-03-21", originalApprovalTime: "15:55:21", purchaseDate: "-", cardNumber: "**** **** **** 1234", approvalAmount: 178000, fee: 4450, purchaseAmount: 173550, status: "취소반영", merchantName: "행복한식당", businessNumber: "123-45-67890", memo: "고객 요청으로 결제 취소됨" },
  "6": { id: "6", cardCompany: "BC카드", approvalNumber: "67890123", originalApprovalDate: "2025-03-21", originalApprovalTime: "12:30:55", purchaseDate: "-", cardNumber: "**** **** **** 7890", approvalAmount: 65000, fee: 1625, purchaseAmount: 63375, status: "매입보류", merchantName: "행복한식당", businessNumber: "123-45-67890", memo: "카드사 확인 필요 - 담당자 연락 예정" },
  "7": { id: "7", cardCompany: "삼성카드", approvalNumber: "78901234", originalApprovalDate: "2025-03-20", originalApprovalTime: "16:45:10", purchaseDate: "2025-03-23", cardNumber: "**** **** **** 2345", approvalAmount: 210000, fee: 5250, purchaseAmount: 204750, status: "매입완료", merchantName: "행복한식당", businessNumber: "123-45-67890", memo: "정상 매입 처리 완료" },
}

function InfoRow({ icon, label, value, valueClassName }: { icon: React.ReactNode; label: string; value: string | React.ReactNode; valueClassName?: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <dt className="text-xs text-muted-foreground mb-0.5">{label}</dt>
        <dd className={`text-sm font-medium break-words ${valueClassName || "text-foreground"}`}>{value}</dd>
      </div>
    </div>
  )
}

export default function PurchaseDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const data = sampleData[id] || sampleData["1"]
  const StatusIcon = statusConfig[data.status].icon

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="매입내역 상세" 
        showBack 
        onBack={() => router.back()}
        showMenu
      />

      <div className="p-4 space-y-4">
        {/* Status Banner */}
        <Card className={`${statusConfig[data.status].bg} ${statusConfig[data.status].border}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${statusConfig[data.status].text} bg-card`}>
                <StatusIcon className="h-5 w-5" />
              </div>
              <div>
                <p className={`text-sm font-medium ${statusConfig[data.status].text}`}>{data.status}</p>
                <p className={`text-xs ${statusConfig[data.status].text} opacity-80`}>
                  {data.status === "매입완료" && `매입일: ${data.purchaseDate}`}
                  {data.status === "매입예정" && `매입예정일: ${data.purchaseDate}`}
                  {data.status === "매입보류" && "카드사 확인 대기중"}
                  {data.status === "취소반영" && "결제 취소 처리됨"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amount Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <p className="text-xs text-muted-foreground mb-1">매입금액</p>
              <p className={`text-2xl font-bold ${data.status === "취소반영" ? "text-destructive line-through" : "text-primary"}`}>
                {data.purchaseAmount.toLocaleString()}원
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">승인금액</p>
                <p className="text-sm font-semibold text-foreground">{data.approvalAmount.toLocaleString()}원</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">수수료</p>
                <p className="text-sm font-semibold text-destructive">-{data.fee.toLocaleString()}원</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Receipt className="h-4 w-4 text-primary" />
              거래 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <InfoRow 
              icon={<CreditCard className="h-4 w-4" />}
              label="카드사" 
              value={data.cardCompany}
            />
            <InfoRow 
              icon={<Hash className="h-4 w-4" />}
              label="승인번호" 
              value={data.approvalNumber}
            />
            <InfoRow 
              icon={<Calendar className="h-4 w-4" />}
              label="원승인일시" 
              value={`${data.originalApprovalDate} ${data.originalApprovalTime}`}
            />
            <InfoRow 
              icon={<Calendar className="h-4 w-4" />}
              label="매입일자" 
              value={data.purchaseDate === "-" ? "-" : data.purchaseDate}
              valueClassName={data.purchaseDate === "-" ? "text-muted-foreground" : "text-foreground"}
            />
            <InfoRow 
              icon={<CreditCard className="h-4 w-4" />}
              label="카드번호" 
              value={data.cardNumber}
            />
          </CardContent>
        </Card>

        {/* Merchant Info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              가맹점 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <InfoRow 
              icon={<Building2 className="h-4 w-4" />}
              label="가맹점명" 
              value={data.merchantName}
            />
            <InfoRow 
              icon={<FileText className="h-4 w-4" />}
              label="사업자등록번호" 
              value={data.businessNumber}
            />
          </CardContent>
        </Card>

        {/* Memo */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              비고
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground py-2">{data.memo}</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 gap-2">
            <RefreshCw className="h-4 w-4" />
            재조회
          </Button>
          <Button className="flex-1 gap-2 bg-primary hover:bg-primary-dark text-primary-foreground">
            <Download className="h-4 w-4" />
            저장
          </Button>
        </div>
      </div>
    </div>
  )
}
