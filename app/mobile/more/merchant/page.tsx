"use client"

import Link from "next/link"
import { ArrowLeft, Building2, MapPin, Phone, CreditCard, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const merchantData = {
  name: "행복한식당",
  representative: "김대표",
  businessNumber: "123-45-67890",
  address: "서울특별시 강남구 테헤란로 123, 1층",
  phone: "02-1234-5678",
  status: "정상",
  category: "음식점 > 한식",
  registeredDate: "2024.01.15",
  settlementAccount: {
    bank: "신한은행",
    accountNumber: "110-***-****89",
    holder: "김대표",
  },
  terminals: [
    { id: "TID001", type: "카드단말기", status: "정상" },
    { id: "TID002", type: "카드단말기", status: "정상" },
  ],
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right max-w-[60%]">{value}</span>
    </div>
  )
}

export default function MerchantManagementPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/more" className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">가맹점 관리</h1>
        </div>
      </header>

      {/* Merchant Info Card */}
      <div className="p-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
              <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold">{merchantData.name}</p>
                  <Badge variant="default" className="badge-success">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {merchantData.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{merchantData.category}</p>
              </div>
            </div>

            <InfoRow label="대표자명" value={merchantData.representative} />
            <InfoRow label="사업자등록번호" value={merchantData.businessNumber} />
            <InfoRow label="사업장 주소" value={merchantData.address} />
            <InfoRow label="연락처" value={merchantData.phone} />
            <InfoRow label="등록일" value={merchantData.registeredDate} />
          </CardContent>
        </Card>
      </div>

      {/* Settlement Account */}
      <div className="px-4 mb-4">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">정산 계좌 정보</h2>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="font-medium">{merchantData.settlementAccount.bank}</span>
            </div>
            <InfoRow label="계좌번호" value={merchantData.settlementAccount.accountNumber} />
            <InfoRow label="예금주" value={merchantData.settlementAccount.holder} />
          </CardContent>
        </Card>
      </div>

      {/* Terminals */}
      <div className="px-4 mb-4">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">등록 단말기</h2>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {merchantData.terminals.map((terminal) => (
              <div key={terminal.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{terminal.id}</p>
                  <p className="text-xs text-muted-foreground">{terminal.type}</p>
                </div>
                <Badge variant="default" className="badge-success">{terminal.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="px-4 space-y-3">
        <Button variant="outline" className="w-full">
          정보 수정 요청
        </Button>
        <Button variant="outline" className="w-full">
          계좌 변경 요청
        </Button>
      </div>
    </div>
  )
}
