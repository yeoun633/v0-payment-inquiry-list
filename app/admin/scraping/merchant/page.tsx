"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/admin/data-table"
import { StatusBadge, StatusType } from "@/components/admin/status-badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar, Plus, RefreshCw, Search, Download } from "lucide-react"

interface MerchantInquiry {
  id: string
  memberName: string
  merchantName: string
  businessNumber: string
  inquiryType: string
  inquiryPeriod: string
  requestDate: string
  status: StatusType
  totalCount: number
  successCount: number
  failCount: number
  pendingCount: number
}

const sampleData: MerchantInquiry[] = [
  {
    id: "1",
    memberName: "kkcfriand",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    inquiryType: "카드매출",
    inquiryPeriod: "2025-10-01 ~ 2025-10-14",
    requestDate: "2025-10-14 16:29",
    status: "pending",
    totalCount: 1,
    successCount: 0,
    failCount: 0,
    pendingCount: 1,
  },
  {
    id: "2",
    memberName: "kkcfriand",
    merchantName: "맛있는갈비",
    businessNumber: "234-56-78901",
    inquiryType: "가맹점정보",
    inquiryPeriod: "2025-10-01 ~ 2025-10-14",
    requestDate: "2025-10-14 14:42",
    status: "completed",
    totalCount: 1,
    successCount: 1,
    failCount: 0,
    pendingCount: 0,
  },
  {
    id: "3",
    memberName: "tklee",
    merchantName: "서울카페",
    businessNumber: "345-67-89012",
    inquiryType: "카드매출",
    inquiryPeriod: "2025-10-01 ~ 2025-10-04",
    requestDate: "2025-10-14 14:04",
    status: "completed",
    totalCount: 1,
    successCount: 1,
    failCount: 0,
    pendingCount: 0,
  },
  {
    id: "4",
    memberName: "ikkwon",
    merchantName: "더좋은약국",
    businessNumber: "456-78-90123",
    inquiryType: "입금내역",
    inquiryPeriod: "2025-05-01 ~ 2025-05-15",
    requestDate: "2025-05-15 15:29",
    status: "completed",
    totalCount: 1,
    successCount: 1,
    failCount: 0,
    pendingCount: 0,
  },
  {
    id: "5",
    memberName: "ikkwon",
    merchantName: "강남미용실",
    businessNumber: "567-89-01234",
    inquiryType: "카드매출",
    inquiryPeriod: "2025-05-01 ~ 2025-05-02",
    requestDate: "2025-05-02 09:34",
    status: "completed",
    totalCount: 1,
    successCount: 1,
    failCount: 0,
    pendingCount: 0,
  },
  {
    id: "6",
    memberName: "yjchoi",
    merchantName: "파리바게뜨 역삼점",
    businessNumber: "678-90-12345",
    inquiryType: "가맹점정보",
    inquiryPeriod: "2025-04-15 ~ 2025-04-30",
    requestDate: "2025-04-30 10:33",
    status: "completed",
    totalCount: 1,
    successCount: 1,
    failCount: 0,
    pendingCount: 0,
  },
  {
    id: "7",
    memberName: "yjchoi",
    merchantName: "스타벅스 삼성역점",
    businessNumber: "789-01-23456",
    inquiryType: "매입내역",
    inquiryPeriod: "2025-02-01 ~ 2025-02-21",
    requestDate: "2025-02-21 15:54",
    status: "completed",
    totalCount: 1,
    successCount: 1,
    failCount: 0,
    pendingCount: 0,
  },
  {
    id: "8",
    memberName: "chkim",
    merchantName: "이디야커피 논현점",
    businessNumber: "890-12-34567",
    inquiryType: "카드매출",
    inquiryPeriod: "2025-01-01 ~ 2025-01-06",
    requestDate: "2025-01-06 17:25",
    status: "pending",
    totalCount: 1,
    successCount: 0,
    failCount: 0,
    pendingCount: 1,
  },
  {
    id: "9",
    memberName: "chkim",
    merchantName: "BBQ 치킨 선릉점",
    businessNumber: "901-23-45678",
    inquiryType: "입금내역",
    inquiryPeriod: "2025-01-01 ~ 2025-01-06",
    requestDate: "2025-01-06 14:24",
    status: "completed",
    totalCount: 1,
    successCount: 0,
    failCount: 1,
    pendingCount: 0,
  },
]

export default function MerchantInquiryPage() {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const columns = [
    { key: "memberName", label: "요청회원" },
    { key: "merchantName", label: "가맹점명" },
    { key: "businessNumber", label: "사업자등록번호" },
    { key: "inquiryType", label: "조회 유형" },
    { key: "inquiryPeriod", label: "조회 기간" },
    { key: "requestDate", label: "요청 일시" },
    {
      key: "status",
      label: "처리 상태",
      align: "center" as const,
      render: (value: unknown) => <StatusBadge status={value as StatusType} />,
    },
    { key: "totalCount", label: "전체", align: "center" as const },
    { key: "successCount", label: "성공", align: "center" as const },
    { key: "failCount", label: "실패", align: "center" as const },
    { key: "pendingCount", label: "대기", align: "center" as const },
    {
      key: "id",
      label: "상세",
      align: "center" as const,
      render: (_: unknown, row: MerchantInquiry) => (
        <Link href={`/admin/scraping/merchant/${row.id}`}>
          <Button variant="outline" size="sm" className="h-7 px-3 text-xs">
            상세
          </Button>
        </Link>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">가맹점 정보 조회 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">
            여신금융협회 API 연계 가맹점 정보 조회 요청 목록 및 처리 현황
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            목록 내보내기
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary-dark text-primary-foreground">
            <Plus className="h-4 w-4" />
            조회 요청 등록
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Status Filter */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">처리 상태</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="전체" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="pending">처리예정</SelectItem>
                <SelectItem value="processing">처리중</SelectItem>
                <SelectItem value="completed">완료</SelectItem>
                <SelectItem value="failed">실패</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type Filter */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">조회 유형</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="전체" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="card">카드매출</SelectItem>
                <SelectItem value="merchant">가맹점정보</SelectItem>
                <SelectItem value="deposit">입금내역</SelectItem>
                <SelectItem value="purchase">매입내역</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">조회 기간</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="시작일 ~ 종료일"
                className="pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Member/Merchant Search */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">회원명 또는 가맹점명</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="검색어 입력"
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Business Number Search */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">사업자등록번호</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="000-00-00000"
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            초기화
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary-dark text-primary-foreground">
            <Search className="h-4 w-4" />
            조회
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">일괄 재조회</Button>
        <Button variant="outline" size="sm">조회 이력 관리</Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={sampleData}
        totalCount={41}
        currentPage={currentPage}
        pageSize={10}
        onPageChange={setCurrentPage}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />
    </div>
  )
}
