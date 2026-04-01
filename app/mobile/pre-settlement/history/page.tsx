"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Zap, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ApplicationStatus = "신청완료" | "심사중" | "승인완료" | "지급완료" | "반려"

interface HistoryItem {
  id: string
  appliedAt: string
  type: "실시간" | "익일"
  targetCount: number
  targetAmount: number
  fee: number
  receiveAmount: number
  status: ApplicationStatus
  paidAt?: string
  rejectionReason?: string
}

const historyData: HistoryItem[] = [
  {
    id: "PS202503220001",
    appliedAt: "2025-03-22 14:30",
    type: "실시간",
    targetCount: 4,
    targetAmount: 123740,
    fee: 3093,
    receiveAmount: 120647,
    status: "지급완료",
    paidAt: "2025-03-22 14:38",
  },
  {
    id: "PS202503220002",
    appliedAt: "2025-03-22 10:15",
    type: "익일",
    targetCount: 6,
    targetAmount: 285000,
    fee: 4275,
    receiveAmount: 280725,
    status: "심사중",
  },
  {
    id: "PS202503210003",
    appliedAt: "2025-03-21 16:45",
    type: "실시간",
    targetCount: 3,
    targetAmount: 98500,
    fee: 2462,
    receiveAmount: 96038,
    status: "지급완료",
    paidAt: "2025-03-21 16:53",
  },
  {
    id: "PS202503210004",
    appliedAt: "2025-03-21 11:20",
    type: "익일",
    targetCount: 8,
    targetAmount: 456000,
    fee: 6840,
    receiveAmount: 449160,
    status: "지급완료",
    paidAt: "2025-03-22 10:15",
  },
  {
    id: "PS202503200005",
    appliedAt: "2025-03-20 15:30",
    type: "실시간",
    targetCount: 2,
    targetAmount: 67800,
    fee: 1695,
    receiveAmount: 66105,
    status: "지급완료",
    paidAt: "2025-03-20 15:38",
  },
  {
    id: "PS202503200006",
    appliedAt: "2025-03-20 09:15",
    type: "실시간",
    targetCount: 5,
    targetAmount: 189000,
    fee: 4725,
    receiveAmount: 184275,
    status: "반려",
    rejectionReason: "신청 금액 한도 초과",
  },
  {
    id: "PS202503190007",
    appliedAt: "2025-03-19 14:00",
    type: "익일",
    targetCount: 7,
    targetAmount: 312500,
    fee: 4687,
    receiveAmount: 307813,
    status: "지급완료",
    paidAt: "2025-03-20 10:22",
  },
]

const statusFilters: (ApplicationStatus | "전체")[] = ["전체", "신청완료", "심사중", "승인완료", "지급완료", "반려"]

function getStatusBadge(status: ApplicationStatus) {
  switch (status) {
    case "신청완료":
      return <Badge variant="outline" className="bg-info-light text-info border-info/30 text-xs shrink-0">신청완료</Badge>
    case "심사중":
      return <Badge variant="outline" className="bg-warning-light text-warning-foreground border-warning/30 text-xs shrink-0">심사중</Badge>
    case "승인완료":
      return <Badge variant="outline" className="bg-primary-light text-primary border-primary/30 text-xs shrink-0">승인완료</Badge>
    case "지급완료":
      return <Badge variant="outline" className="bg-success-light text-success border-success/30 text-xs shrink-0">지급완료</Badge>
    case "반려":
      return <Badge variant="outline" className="bg-destructive-light text-destructive border-destructive/30 text-xs shrink-0">반려</Badge>
    default:
      return <Badge variant="outline" className="text-xs shrink-0">{status}</Badge>
  }
}

export default function PreSettlementHistoryPage() {
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | "전체">("전체")

  const filteredHistory = selectedStatus === "전체"
    ? historyData
    : historyData.filter(h => h.status === selectedStatus)

  const totalReceived = historyData
    .filter(h => h.status === "지급완료")
    .reduce((sum, h) => sum + h.receiveAmount, 0)

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

      <div className="p-4 space-y-4">
        {/* Summary Card */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground mb-1">총 신청 건수</p>
                <p className="text-xl font-bold">{historyData.length}건</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">지급완료 금액</p>
                <p className="text-xl font-bold text-success">{totalReceived.toLocaleString()}원</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Range */}
        <button className="w-full flex items-center justify-between p-3 rounded-lg border border-input bg-background text-sm">
          <span className="text-foreground">2025-03-01 ~ 2025-03-22</span>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          총 <span className="font-medium text-foreground">{filteredHistory.length}</span>건
        </p>

        {/* History List */}
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Type Icon */}
                  {item.type === "실시간" ? (
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-info" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                          item.type === "실시간" ? "bg-primary/10 text-primary" : "bg-info/10 text-info"
                        }`}>
                          {item.type}
                        </span>
                        {getStatusBadge(item.status)}
                      </div>
                    </div>

                    {/* Amount */}
                    <p className={`font-bold text-lg ${item.status === "반려" ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {item.receiveAmount.toLocaleString()}원
                    </p>

                    {/* Details */}
                    <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                      <p>{item.targetCount}건 · 대상금액 {item.targetAmount.toLocaleString()}원</p>
                      <p>수수료 -{item.fee.toLocaleString()}원</p>
                    </div>

                    {/* Timestamps */}
                    <div className="mt-2 pt-2 border-t border-border text-xs">
                      <p className="text-muted-foreground">신청: {item.appliedAt}</p>
                      {item.paidAt && (
                        <p className="text-success">지급: {item.paidAt}</p>
                      )}
                      {item.rejectionReason && (
                        <p className="text-destructive">반려 사유: {item.rejectionReason}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <div className="py-12 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">해당 조건의 신청 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
