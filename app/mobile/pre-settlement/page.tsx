"use client"

import Link from "next/link"
import { ArrowLeft, ChevronRight, Zap, Clock, History, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PreSettlementHomePage() {
  // Mock data
  const availableAmount = 2850000
  const recentApplication = {
    type: "실시간",
    amount: 500000,
    status: "지급완료",
    date: "2025-03-22 14:30",
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "신청완료":
        return <Badge variant="outline" className="bg-info-light text-info border-info/30">신청완료</Badge>
      case "심사중":
        return <Badge variant="outline" className="bg-warning-light text-warning-foreground border-warning/30">심사중</Badge>
      case "승인완료":
        return <Badge variant="outline" className="bg-success-light text-success border-success/30">승인완료</Badge>
      case "지급완료":
        return <Badge variant="outline" className="bg-success-light text-success border-success/30">지급완료</Badge>
      case "반려":
        return <Badge variant="outline" className="bg-destructive-light text-destructive border-destructive/30">반려</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
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
        {/* Available Amount Card */}
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-5">
            <p className="text-sm text-primary-foreground/80 mb-1">신청 가능 금액</p>
            <p className="text-3xl font-bold">{availableAmount.toLocaleString()}원</p>
            <p className="text-xs text-primary-foreground/60 mt-2">
              * 실시간/익일 선정산 모두 적용 가능
            </p>
          </CardContent>
        </Card>

        {/* Recent Application Status */}
        {recentApplication && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                최근 신청 상태
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{recentApplication.amount.toLocaleString()}원</p>
                  <p className="text-xs text-muted-foreground">{recentApplication.type} · {recentApplication.date}</p>
                </div>
                {getStatusBadge(recentApplication.status)}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pre-settlement Options */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">선정산 신청</h2>
          
          {/* Realtime Pre-settlement */}
          <Link href="/mobile/pre-settlement/realtime">
            <Card className="hover:bg-muted/30 transition-colors cursor-pointer border-2 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Zap className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">실시간 선정산 신청하기</p>
                      <Badge className="bg-primary text-primary-foreground text-[10px]">즉시지급</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">신청 후 10분 이내 입금</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Next-day Pre-settlement */}
          <Link href="/mobile/pre-settlement/next-day">
            <Card className="hover:bg-muted/30 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-info flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-info-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">익일 선정산 신청하기</p>
                      <Badge variant="outline" className="text-[10px]">익일지급</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">다음 영업일 오전 입금</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

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
                    <p className="font-medium text-foreground">신청 내역 보기</p>
                    <p className="text-xs text-muted-foreground">전체 선정산 신청 이력 조회</p>
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
                  <li>• 실시간 선정산: 평일 09:00 ~ 17:00 신청 가능</li>
                  <li>• 익일 선정산: 24시간 신청 가능, 다음 영업일 지급</li>
                  <li>• 수수료는 신청 금액 및 상환 기간에 따라 상이</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
