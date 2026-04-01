"use client"

import { useRouter, useParams } from "next/navigation"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Download, UtensilsCrossed, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react"

// Transaction-level sample data (individual orders)
const sampleData: Record<string, {
  id: string
  platform: string
  orderNumber: string
  orderDateTime: string
  orderAmount: number
  cancelAmount: number
  expectedSettlement: number
  status: string
  merchantName: string
  businessNumber: string
  settlementDate: string
  platformFee: number
  deliveryFee: number
  promotionDiscount: number
  menuItems: string
  customerNote: string
}> = {
  "1": {
    id: "1",
    platform: "배달의민족",
    orderNumber: "B20250322-001542",
    orderDateTime: "2025-03-22 14:32:15",
    orderAmount: 32500,
    cancelAmount: 0,
    expectedSettlement: 29900,
    status: "정산완료",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-25",
    platformFee: 1950,
    deliveryFee: 0,
    promotionDiscount: 650,
    menuItems: "김치찌개 1, 공기밥 2",
    customerNote: "젓가락 많이 주세요",
  },
  "2": {
    id: "2",
    platform: "배달의민족",
    orderNumber: "B20250322-001538",
    orderDateTime: "2025-03-22 13:45:22",
    orderAmount: 28000,
    cancelAmount: 0,
    expectedSettlement: 25760,
    status: "정산완료",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-25",
    platformFee: 1680,
    deliveryFee: 0,
    promotionDiscount: 560,
    menuItems: "된장찌개 1, 제육볶음 1",
    customerNote: "",
  },
  "3": {
    id: "3",
    platform: "쿠팡이츠",
    orderNumber: "CE20250322-087421",
    orderDateTime: "2025-03-22 12:18:44",
    orderAmount: 45000,
    cancelAmount: 0,
    expectedSettlement: 41400,
    status: "정산예정",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-26",
    platformFee: 2700,
    deliveryFee: 0,
    promotionDiscount: 900,
    menuItems: "삼겹살 2인분, 냉면 1",
    customerNote: "문 앞에 놓아주세요",
  },
  "4": {
    id: "4",
    platform: "배달의민족",
    orderNumber: "B20250322-001525",
    orderDateTime: "2025-03-22 11:55:03",
    orderAmount: 18500,
    cancelAmount: 18500,
    expectedSettlement: 0,
    status: "취소",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "-",
    platformFee: 0,
    deliveryFee: 0,
    promotionDiscount: 0,
    menuItems: "비빔밥 1",
    customerNote: "고객 요청 취소",
  },
  "5": {
    id: "5",
    platform: "요기요",
    orderNumber: "YG20250322-445621",
    orderDateTime: "2025-03-22 11:22:18",
    orderAmount: 52000,
    cancelAmount: 0,
    expectedSettlement: 47840,
    status: "정산완료",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-25",
    platformFee: 3120,
    deliveryFee: 0,
    promotionDiscount: 1040,
    menuItems: "불고기정식 2, 음료 2",
    customerNote: "",
  },
  "6": {
    id: "6",
    platform: "쿠팡이츠",
    orderNumber: "CE20250322-087398",
    orderDateTime: "2025-03-22 10:48:33",
    orderAmount: 38000,
    cancelAmount: 0,
    expectedSettlement: 34960,
    status: "정산예정",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-26",
    platformFee: 2280,
    deliveryFee: 0,
    promotionDiscount: 760,
    menuItems: "순두부찌개 2, 공기밥 2",
    customerNote: "덜 맵게 해주세요",
  },
  "7": {
    id: "7",
    platform: "땡겨요",
    orderNumber: "TG20250322-012847",
    orderDateTime: "2025-03-22 10:15:55",
    orderAmount: 22000,
    cancelAmount: 0,
    expectedSettlement: 20240,
    status: "정산예정",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-27",
    platformFee: 1320,
    deliveryFee: 0,
    promotionDiscount: 440,
    menuItems: "돈까스 1, 우동 1",
    customerNote: "",
  },
  "8": {
    id: "8",
    platform: "배달의민족",
    orderNumber: "B20250321-001498",
    orderDateTime: "2025-03-21 19:42:11",
    orderAmount: 67500,
    cancelAmount: 0,
    expectedSettlement: 62100,
    status: "정산완료",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-24",
    platformFee: 4050,
    deliveryFee: 0,
    promotionDiscount: 1350,
    menuItems: "갈비탕 3, 공기밥 3",
    customerNote: "파 많이 넣어주세요",
  },
  "9": {
    id: "9",
    platform: "요기요",
    orderNumber: "YG20250321-445589",
    orderDateTime: "2025-03-21 18:33:27",
    orderAmount: 29000,
    cancelAmount: 0,
    expectedSettlement: 26680,
    status: "정산완료",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "2025-03-24",
    platformFee: 1740,
    deliveryFee: 0,
    promotionDiscount: 580,
    menuItems: "짜장면 2, 탕수육 소",
    customerNote: "",
  },
  "10": {
    id: "10",
    platform: "쿠팡이츠",
    orderNumber: "CE20250321-087342",
    orderDateTime: "2025-03-21 17:15:08",
    orderAmount: 41500,
    cancelAmount: 41500,
    expectedSettlement: 0,
    status: "취소",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    settlementDate: "-",
    platformFee: 0,
    deliveryFee: 0,
    promotionDiscount: 0,
    menuItems: "해물파전 1, 막걸리 2",
    customerNote: "배달 지연으로 취소",
  },
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
    case "취소":
      return {
        bgColor: "bg-destructive-light",
        textColor: "text-destructive",
        borderColor: "border-destructive/20",
        icon: XCircle,
        message: "주문이 취소되었습니다."
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
  const isCancelled = data.status === "취소"

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

        {/* Amount Summary Card */}
        <Card className={isCancelled ? "bg-destructive-light border-destructive/20" : "bg-primary-light border-primary/20"}>
          <CardContent className="p-4">
            <p className={`text-xs ${isCancelled ? "text-destructive/70" : "text-primary/70"} mb-1`}>주문금액</p>
            <p className={`text-2xl font-bold ${isCancelled ? "text-destructive line-through" : "text-primary"}`}>
              {data.orderAmount.toLocaleString()}원
            </p>
            {isCancelled ? (
              <div className="mt-2 pt-2 border-t border-destructive/20">
                <p className="text-xs text-destructive/70">취소금액</p>
                <p className="text-lg font-semibold text-destructive">{data.cancelAmount.toLocaleString()}원</p>
              </div>
            ) : (
              <div className="mt-2 pt-2 border-t border-primary/20">
                <p className="text-xs text-primary/70">정산예정액</p>
                <p className="text-lg font-semibold text-primary">{data.expectedSettlement.toLocaleString()}원</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">주문 정보</h3>
            <div className="divide-y divide-border">
              <InfoRow label="주문번호" value={data.orderNumber} />
              <InfoRow label="주문일시" value={data.orderDateTime} />
              <InfoRow label="플랫폼" value={data.platform} />
              <InfoRow label="주문내역" value={data.menuItems} />
              {data.customerNote && (
                <InfoRow label="고객요청" value={data.customerNote} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Merchant Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">가맹점 정보</h3>
            <div className="divide-y divide-border">
              <InfoRow label="가맹점명" value={data.merchantName} />
              <InfoRow label="사업자등록번호" value={data.businessNumber} />
            </div>
          </CardContent>
        </Card>

        {/* Settlement Details */}
        {!isCancelled && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">정산 내역</h3>
              <div className="divide-y divide-border">
                <InfoRow label="주문금액" value={`${data.orderAmount.toLocaleString()}원`} />
                <InfoRow label="플랫폼 수수료" value={`-${data.platformFee.toLocaleString()}원`} valueClass="text-destructive" />
                <InfoRow label="프로모션 할인" value={`-${data.promotionDiscount.toLocaleString()}원`} valueClass="text-destructive" />
                <InfoRow label="배달비 (가맹점 부담)" value={`${data.deliveryFee.toLocaleString()}원`} />
                <InfoRow label="정산예정액" value={`${data.expectedSettlement.toLocaleString()}원`} valueClass="text-primary font-semibold" />
                <InfoRow label="정산 예정일" value={data.settlementDate} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cancel Info for cancelled orders */}
        {isCancelled && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">취소 정보</h3>
              <div className="divide-y divide-border">
                <InfoRow label="취소금액" value={`${data.cancelAmount.toLocaleString()}원`} valueClass="text-destructive" />
                <InfoRow label="비고" value={data.customerNote || "취소 처리됨"} />
              </div>
            </CardContent>
          </Card>
        )}

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
