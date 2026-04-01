"use client"

import Link from "next/link"
import { ArrowLeft, Zap, Clock, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HistoryItem {
  id: string
  type: "realtime" | "next-day"
  amount: number
  fee: number
  receivedAmount: number
  status: "신청완료" | "심사중" | "승인완료" | "지급완료" | "반려"
  appliedAt: string
  paidAt?: string
  rejectionReason?: string
}

const mockHistory: HistoryItem[] = [
  {
    id: "PS202503220001",
    type: "realtime",
    amount: 500000,
    fee: 12500,
    receivedAmount: 487500,
    status: "지급완료",
    appliedAt: "2025-03-22 14:30",
    paidAt: "2025-03-22 14:38",
  },
  {
    id: "PS202503210002",
    type: "next-day",
    amount: 1000000,
    fee: 15000,
    receivedAmount: 985000,
    status: "지급완료",
    appliedAt: "2025-03-21 18:45",
    paidAt: "2025-03-22 10:15",
  },
  {
    id: "PS202503200003",
    type: "realtime",
    amount: 300000,
    fee: 7500,
    receivedAmount: 292500,
    status: "승인완료",
    appliedAt: "2025-03-20 11:20",
  },
  {
    id: "PS202503190004",
    type: "next-day",
    amount: 2000000,
    fee: 30000,
    receivedAmount: 1970000,
    status: "심사중",
    appliedAt: "2025-03-19 16:00",
  },
  {
    id: "PS202503180005",
    type: "realtime",
    amount: 800000,
    fee: 20000,
    receivedAmount: 780000,
    status: "신청완료",
    appliedAt: "2025-03-18 09:30",
  },
  {
    id: "PS202503170006",
    type: "realtime",
    amount: 1500000,
    fee: 37500,
    receivedAmount: 1462500,
    status: "반려",
    appliedAt: "2025-03-17 15:20",
    rejectionReason: "한도 초과",
  },
]

export default function PreSettlementHistoryPage() {
  const getStatusBadge = (status: HistoryItem["status"]) => {
    switch (status) {
      case "신청완료":
        return <Badge variant="outline" className="bg-info-light text-info border-info/30 shrink-0">신청완료</Badge>
      case "심사중":
        return <Badge variant="outline" className="bg-warning-light text-warning-foreground border-warning/30 shrink-0">심사중</Badge>
      case "승인완료":
        return <Badge variant="outline" className="bg-primary-light text-primary border-primary/30 shrink-0">승인완료</Badge>
      case "지급완료":
        return <Badge variant="outline" className="bg-success-light text-success border-success/30 shrink-0">지급완료</Badge>
      case "반려":
        return <Badge variant="outline" className="bg-destructive-light text-destructive border-destructive/30 shrink-0">반려</Badge>
      default:
        return <Badge variant="outline" className="shrink-0">{status}</Badge>
    }
  }

  const getTypeIcon = (type: HistoryItem["type"]) => {
    if (type === "realtime") {
      return (
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Zap className="h-5 w-5 text-primary" />
        </div>
      )
    }
    return (
      <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center shrink-0">
        <Clock className="h-5 w-5 text-info" />
      </div>
    )
  }

  const getTypeLabel = (type: HistoryItem["type"]) => {
    return type === "realtime" ? "실시간" : "익일"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/pre-settlement" className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">신청 내역</h1>
        </div>
      </header>

      {/* Summary */}
      <div className="p-4 pb-2">
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground mb-1">총 신청 건수</p>
                <p className="text-xl font-bold">{mockHistory.length}건</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">지급완료 금액</p>
                <p className="text-xl font-bold text-success">
                  {mockHistory
                    .filter((h) => h.status === "지급완료")
                    .reduce((sum, h) => sum + h.receivedAmount, 0)
                    .toLocaleString()}원
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History List */}
      <div className="p-4 pt-2 space-y-3">
        {mockHistory.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {getTypeIcon(item.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{getTypeLabel(item.type)}</span>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                  <p className="font-semibold text-lg">{item.amount.toLocaleString()}원</p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-xs text-muted-foreground">
                      <span>수수료 {item.fee.toLocaleString()}원</span>
                      <span className="mx-1">·</span>
                      <span>실수령 {item.receivedAmount.toLocaleString()}원</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{item.appliedAt}</p>
                  {item.paidAt && (
                    <p className="text-xs text-success">지급: {item.paidAt}</p>
                  )}
                  {item.rejectionReason && (
                    <p className="text-xs text-destructive">사유: {item.rejectionReason}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (hidden when there are items) */}
      {mockHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">선정산 신청 내역이 없습니다.</p>
        </div>
      )}
    </div>
  )
}
