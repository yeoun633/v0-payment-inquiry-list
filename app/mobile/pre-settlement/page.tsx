"use client"

import Link from "next/link"
import { ArrowLeft, ChevronRight, Zap, History, AlertCircle, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PreSettlementHomePage() {
  // Mock data for recent applications
  const recentApplications = [
    {
      id: "1",
      type: "실시간",
      targetCount: 4,
      targetAmount: 123740,
      receiveAmount: 120645,
      status: "지급완료",
      date: "2025-03-22 14:30",
    },
    {
      id: "2",
      type: "익일",
      targetCount: 6,
      targetAmount: 285000,
      receiveAmount: 280725,
      status: "심사중",
      date: "2025-03-22 10:15",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "신청완료":
        return <Badge variant="outline" className="bg-info-light text-info border-info/30 text-xs">신청완료</Badge>
      case "심사중":
        return <Badge variant="outline" className="bg-warning-light text-warning-foreground border-warning/30 text-xs">심사중</Badge>
      case "승인완료":
        return <Badge variant="outline" className="bg-success-light text-success border-success/30 text-xs">승인완료</Badge>
      case "지급완료":
        return <Badge variant="outline" className="bg-success-light text-success border-success/30 text-xs">지급완료</Badge>
      case "반려":
        return <Badge variant="outline" className="bg-destructive-light text-destructive border-destructive/30 text-xs">반려</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile" className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">선정산</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Main CTA - Go to Delivery Sales */}
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                <Zap className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold mb-1">배달매출에서 선정산 신청</p>
                <p className="text-sm text-primary-foreground/80">
                  배달매출 조회에서 선정산 가능 건을 선택하여 신청하세요.
                </p>
              </div>
            </div>
            <Link href="/mobile/delivery-sales" className="block mt-4">
              <Button 
                variant="secondary" 
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold"
              >
                <UtensilsCrossed className="h-4 w-4 mr-2" />
                배달매출 조회하기
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        {recentApplications.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground">최근 신청 내역</h2>
            {recentApplications.map((app) => (
              <Card key={app.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                          app.type === "실시간" ? "bg-primary/10 text-primary" : "bg-info/10 text-info"
                        }`}>
                          {app.type}
                        </span>
                        {getStatusBadge(app.status)}
                      </div>
                      <p className="text-lg font-bold">{app.receiveAmount.toLocaleString()}원</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {app.targetCount}건 · 대상금액 {app.targetAmount.toLocaleString()}원
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">{app.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Application History Link */}
        <Link href="/mobile/pre-settlement/history">
          <Card className="hover:bg-muted/30 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <History className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">전체 신청 내역 보기</p>
                    <p className="text-xs text-muted-foreground">선정산 신청 이력 전체 조회</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Info Banner */}
        <Card className="bg-info-light border-info/20">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-info shrink-0 mt-0.5" />
              <div className="text-sm text-info">
                <p className="font-medium mb-1">선정산 안내</p>
                <ul className="text-xs space-y-1 text-info/80">
                  <li>• 배달매출 조회 화면에서 선정산 가능 건을 선택합니다.</li>
                  <li>• 선택 후 실시간(2.5%) 또는 익일(1.5%) 선정산을 선택합니다.</li>
                  <li>• 실시간: 평일 09:00 ~ 17:00, 10분 이내 입금</li>
                  <li>• 익일: 24시간 신청 가능, 다음 영업일 입금</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
