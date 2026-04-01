"use client"

import { useRouter, useParams } from "next/navigation"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Download, UtensilsCrossed, CheckCircle, Clock, AlertCircle } from "lucide-react"

// Sample data - in real app this would come from API
const sampleData: Record<string, {
  id: string
  date: string
  platform: string
  orderCount: number
  cancelCount: number
  totalSales: number
  expectedSettlement: number
  status: string
  merchantName: string
  businessNumber: string
  settlementDate: string
  platformFee: number
  deliveryFee: number
  promotionDiscount: number
  netSales: number
}> = {
  "1": {
    id: "1",
    date: "2025-03-22",
    platform: "배민1",
    orderCount: 45,
    cancelCount: 2,
    totalSales: 1850000,
    expectedSettlement: 1702000,
    status: "정산완료",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-25",
    platformFee: 111000,
    deliveryFee: 0,
    promotionDiscount: 37000,
    netSales: 1702000,
  },
  "2": {
    id: "2",
    date: "2025-03-22",
    platform: "쿠팡이츠",
    orderCount: 32,
    cancelCount: 1,
    totalSales: 1280000,
    expectedSettlement: 1177600,
    status: "정산예정",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-26",
    platformFee: 76800,
    deliveryFee: 0,
    promotionDiscount: 25600,
    netSales: 1177600,
  },
  "3": {
    id: "3",
    date: "2025-03-21",
    platform: "배달의민족",
    orderCount: 28,
    cancelCount: 0,
    totalSales: 980000,
    expectedSettlement: 901600,
    status: "정산완료",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-24",
    platformFee: 58800,
    deliveryFee: 0,
    promotionDiscount: 19600,
    netSales: 901600,
  },
  "4": {
    id: "4",
    date: "2025-03-21",
    platform: "요기요",
    orderCount: 18,
    cancelCount: 1,
    totalSales: 620000,
    expectedSettlement: 570400,
    status: "정산완료",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-24",
    platformFee: 37200,
    deliveryFee: 0,
    promotionDiscount: 12400,
    netSales: 570400,
  },
  "5": {
    id: "5",
    date: "2025-03-20",
    platform: "배민1",
    orderCount: 52,
    cancelCount: 3,
    totalSales: 2150000,
    expectedSettlement: 1978000,
    status: "정산완료",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-23",
    platformFee: 129000,
    deliveryFee: 0,
    promotionDiscount: 43000,
    netSales: 1978000,
  },
  "6": {
    id: "6",
    date: "2025-03-20",
    platform: "땡겨요",
    orderCount: 12,
    cancelCount: 0,
    totalSales: 380000,
    expectedSettlement: 349600,
    status: "정산예정",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-25",
    platformFee: 22800,
    deliveryFee: 0,
    promotionDiscount: 7600,
    netSales: 349600,
  },
}

function getPlatformColor(platform: string): string {
  switch (platform) {
    case "배민1":
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

function getStatusConfig(status: string) {
  switch (status) {
    case "정산완료":
      return {
        bgColor: "bg-success-light",
        textColor: "text-success",
        borderColor: "border-success/20",
        icon: CheckCircle,
        message: "정산이 완료되었습니다."
      }
    case "정산예정":
      return {
        bgColor: "bg-info-light",
        textColor: "text-info",
        borderColor: "border-info/20",
        icon: Clock,
        message: "정산 예정일에 입금될 예정입니다."
      }
    case "정산보류":
      return {
        bgColor: "bg-warning-light",
        textColor: "text-warning-foreground",
        borderColor: "border-warning/20",
        icon: AlertCircle,
        message: "정산이 보류되었습니다. 플랫폼에 문의해주세요."
      }
    default:
      return {
        bgColor: "bg-muted",
        textColor: "text-muted-foreground",
        borderColor: "border-border",
        icon: Clock,
        message: ""
      }
  }
}

function InfoRow({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-medium ${valueClass || "text-foreground"}`}>{value}</span>
    </div>
  )
}

export default function DeliverySalesDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const data = sampleData[id] || sampleData["1"]
  const statusConfig = getStatusConfig(data.status)
  const StatusIcon = statusConfig.icon

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="배달매출 상세" 
        showBack 
        onBack={() => router.back()}
      />

      <div className="p-4 space-y-4">
        {/* Status Banner */}
        <div className={`${statusConfig.bgColor} border ${statusConfig.borderColor} rounded-lg p-4`}>
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full ${getPlatformColor(data.platform)} flex items-center justify-center`}>
              <UtensilsCrossed className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">{data.platform}</p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                  <StatusIcon className="h-3 w-3" />
                  {data.status}
                </span>
              </div>
              <p className={`text-xs ${statusConfig.textColor} mt-1`}>{statusConfig.message}</p>
            </div>
          </div>
        </div>

        {/* Sales Summary Card */}
        <Card className="bg-primary-light border-primary/20">
          <CardContent className="p-4">
            <p className="text-xs text-primary/70 mb-1">총 배달매출</p>
            <p className="text-2xl font-bold text-primary">{data.totalSales.toLocaleString()}원</p>
            <div className="mt-2 pt-2 border-t border-primary/20">
              <p className="text-xs text-primary/70">정산예정액</p>
              <p className="text-lg font-semibold text-primary">{data.expectedSettlement.toLocaleString()}원</p>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">기본 정보</h3>
            <div className="divide-y divide-border">
              <InfoRow label="조회 일자" value={data.date} />
              <InfoRow label="플랫폼" value={data.platform} />
              <InfoRow label="가맹점명" value={data.merchantName} />
              <InfoRow label="사업자등록번호" value={data.businessNumber} />
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">주문 정보</h3>
            <div className="divide-y divide-border">
              <InfoRow label="주문 건수" value={`${data.orderCount}건`} />
              <InfoRow 
                label="취소 건수" 
                value={`${data.cancelCount}건`} 
                valueClass={data.cancelCount > 0 ? "text-destructive" : ""} 
              />
              <InfoRow label="실 주문 건수" value={`${data.orderCount - data.cancelCount}건`} valueClass="text-primary font-semibold" />
            </div>
          </CardContent>
        </Card>

        {/* Settlement Details */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">정산 내역</h3>
            <div className="divide-y divide-border">
              <InfoRow label="총 매출" value={`${data.totalSales.toLocaleString()}원`} />
              <InfoRow label="플랫폼 수수료" value={`-${data.platformFee.toLocaleString()}원`} valueClass="text-destructive" />
              <InfoRow label="프로모션 할인" value={`-${data.promotionDiscount.toLocaleString()}원`} valueClass="text-destructive" />
              <InfoRow label="배달비 (가맹점 부담)" value={`${data.deliveryFee.toLocaleString()}원`} />
              <InfoRow label="정산예정액" value={`${data.netSales.toLocaleString()}원`} valueClass="text-primary font-semibold" />
              <InfoRow label="정산 예정일" value={data.settlementDate} />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 border-border text-foreground">
            <RefreshCw className="h-4 w-4 mr-2" />
            재조회
          </Button>
          <Button className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground">
            <Download className="h-4 w-4 mr-2" />
            저장
          </Button>
        </div>
      </div>
    </div>
  )
}
