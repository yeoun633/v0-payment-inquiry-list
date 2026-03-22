"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/admin/status-badge"
import {
  ArrowLeft,
  Download,
  RefreshCw,
  Building2,
  User,
  FileText,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

// Sample detail data
const detailData = {
  request: {
    memberName: "kkcfriand",
    merchantName: "행복한식당",
    businessNumber: "123-45-67890",
    inquiryType: "가맹점정보",
    requestDate: "2025-10-14 16:29:45",
    status: "completed" as const,
  },
  merchantInfo: {
    merchantName: "행복한식당",
    representativeName: "김철수",
    businessNumber: "123-45-67890",
    merchantNumber: "M2024001234567",
    merchantStatus: "정상영업",
    address: "서울특별시 강남구 테헤란로 123, 1층",
    phone: "02-1234-5678",
    cardCompanies: ["신한카드", "삼성카드", "현대카드", "KB국민카드"],
    registrationDate: "2020-03-15",
    lastUpdateDate: "2025-10-14",
  },
  processingResult: {
    totalCount: 1,
    successCount: 1,
    failCount: 0,
    pendingCount: 0,
    failureReason: null,
  },
}

function InfoRow({ label, value, icon }: { label: string; value: string | React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      {icon && <div className="text-muted-foreground mt-0.5">{icon}</div>}
      <div className="flex-1">
        <dt className="text-sm text-muted-foreground mb-0.5">{label}</dt>
        <dd className="text-sm font-medium text-foreground">{value}</dd>
      </div>
    </div>
  )
}

export default function MerchantDetailPage() {
  const params = useParams()
  const { request, merchantInfo, processingResult } = detailData

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin" className="hover:text-foreground">노코드 관리</Link>
        <span>/</span>
        <Link href="/admin/scraping/merchant" className="hover:text-foreground">스크래핑 업무</Link>
        <span>/</span>
        <Link href="/admin/scraping/merchant" className="hover:text-foreground">가맹점 정보 조회</Link>
        <span>/</span>
        <span className="text-foreground font-medium">조회 상세 결과</span>
      </nav>

      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/scraping/merchant">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">조회 상세 결과</h1>
            <p className="text-sm text-muted-foreground mt-1">
              요청 ID: {params.id} | {request.requestDate}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            재조회
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            결과 다운로드
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Request Summary & Processing Result */}
        <div className="space-y-6">
          {/* Request Summary Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                요청 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              <InfoRow label="회원" value={request.memberName} />
              <InfoRow label="가맹점명" value={request.merchantName} />
              <InfoRow label="사업자등록번호" value={request.businessNumber} />
              <InfoRow label="조회유형" value={request.inquiryType} />
              <InfoRow label="요청일시" value={request.requestDate} />
              <InfoRow 
                label="처리상태" 
                value={<StatusBadge status={request.status} />} 
              />
            </CardContent>
          </Card>

          {/* Processing Result Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                처리 결과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{processingResult.totalCount}</div>
                  <div className="text-xs text-muted-foreground mt-1">전체건수</div>
                </div>
                <div className="bg-success-light rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-2xl font-bold text-success">{processingResult.successCount}</span>
                  </div>
                  <div className="text-xs text-success mt-1">성공건수</div>
                </div>
                <div className="bg-destructive-light rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <XCircle className="h-5 w-5 text-destructive" />
                    <span className="text-2xl font-bold text-destructive">{processingResult.failCount}</span>
                  </div>
                  <div className="text-xs text-destructive mt-1">실패건수</div>
                </div>
                <div className="bg-warning-light rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-5 w-5 text-warning-foreground" />
                    <span className="text-2xl font-bold text-warning-foreground">{processingResult.pendingCount}</span>
                  </div>
                  <div className="text-xs text-warning-foreground mt-1">처리예정건</div>
                </div>
              </div>

              {processingResult.failureReason && (
                <div className="mt-4 p-3 bg-destructive-light rounded-lg">
                  <div className="text-sm font-medium text-destructive mb-1">실패 사유</div>
                  <div className="text-sm text-destructive/80">{processingResult.failureReason}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Merchant Information */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                가맹점 정보 조회 결과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <InfoRow 
                  label="가맹점명" 
                  value={merchantInfo.merchantName}
                  icon={<Building2 className="h-4 w-4" />}
                />
                <InfoRow 
                  label="대표자명" 
                  value={merchantInfo.representativeName}
                  icon={<User className="h-4 w-4" />}
                />
                <InfoRow 
                  label="사업자등록번호" 
                  value={merchantInfo.businessNumber}
                  icon={<FileText className="h-4 w-4" />}
                />
                <InfoRow 
                  label="가맹점번호" 
                  value={merchantInfo.merchantNumber}
                  icon={<CreditCard className="h-4 w-4" />}
                />
                <InfoRow 
                  label="가맹점 상태" 
                  value={
                    <span className="inline-flex items-center gap-1.5 text-success">
                      <span className="h-2 w-2 rounded-full bg-success" />
                      {merchantInfo.merchantStatus}
                    </span>
                  }
                />
                <InfoRow 
                  label="연락처" 
                  value={merchantInfo.phone}
                  icon={<Phone className="h-4 w-4" />}
                />
                <div className="md:col-span-2">
                  <InfoRow 
                    label="주소" 
                    value={merchantInfo.address}
                    icon={<MapPin className="h-4 w-4" />}
                  />
                </div>
                <div className="md:col-span-2">
                  <InfoRow 
                    label="카드사 정보" 
                    value={
                      <div className="flex flex-wrap gap-2 mt-1">
                        {merchantInfo.cardCompanies.map((company, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary-light text-primary text-xs font-medium"
                          >
                            {company}
                          </span>
                        ))}
                      </div>
                    }
                    icon={<CreditCard className="h-4 w-4" />}
                  />
                </div>
                <InfoRow 
                  label="등록일" 
                  value={merchantInfo.registrationDate}
                  icon={<Calendar className="h-4 w-4" />}
                />
                <InfoRow 
                  label="최종 업데이트" 
                  value={merchantInfo.lastUpdateDate}
                  icon={<Calendar className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <Link href="/admin/scraping/merchant">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            재조회
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary-dark text-primary-foreground">
            <Download className="h-4 w-4" />
            결과 다운로드
          </Button>
        </div>
      </div>
    </div>
  )
}
