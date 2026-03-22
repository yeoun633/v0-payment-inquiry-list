"use client"

import { useRouter } from "next/navigation"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Building2, 
  User, 
  FileText, 
  Phone, 
  MapPin, 
  CreditCard, 
  Calendar,
  Download,
  RefreshCw,
  CheckCircle2,
} from "lucide-react"

const merchantInfo = {
  merchantName: "행복한식당",
  representativeName: "김철수",
  businessNumber: "123-45-67890",
  merchantNumber: "M2024001234567",
  merchantStatus: "정상영업",
  address: "서울특별시 강남구 테헤란로 123, 1층",
  phone: "02-1234-5678",
  cardCompanies: ["신한카드", "삼성카드", "현대카드", "KB국민카드"],
  registrationDate: "2020-03-15",
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <dt className="text-xs text-muted-foreground mb-0.5">{label}</dt>
        <dd className="text-sm font-medium text-foreground break-words">{value}</dd>
      </div>
    </div>
  )
}

export default function MerchantDetailPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="가맹점 정보" 
        showBack 
        onBack={() => router.back()}
        showMenu
      />

      <div className="p-4 space-y-4">
        {/* Status Banner */}
        <Card className="bg-success-light border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-success">조회 완료</p>
                <p className="text-xs text-success/80">조회일시: 2025-03-22 14:30:45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Merchant Info Card */}
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
              value={merchantInfo.merchantName}
            />
            <InfoRow 
              icon={<User className="h-4 w-4" />}
              label="대표자명" 
              value={merchantInfo.representativeName}
            />
            <InfoRow 
              icon={<FileText className="h-4 w-4" />}
              label="사업자등록번호" 
              value={merchantInfo.businessNumber}
            />
            <InfoRow 
              icon={<CreditCard className="h-4 w-4" />}
              label="가맹점번호" 
              value={merchantInfo.merchantNumber}
            />
            <InfoRow 
              icon={<CheckCircle2 className="h-4 w-4" />}
              label="가맹점 상태" 
              value={
                <span className="inline-flex items-center gap-1.5 text-success">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  {merchantInfo.merchantStatus}
                </span>
              }
            />
            <InfoRow 
              icon={<MapPin className="h-4 w-4" />}
              label="주소" 
              value={merchantInfo.address}
            />
            <InfoRow 
              icon={<Phone className="h-4 w-4" />}
              label="연락처" 
              value={merchantInfo.phone}
            />
            <InfoRow 
              icon={<Calendar className="h-4 w-4" />}
              label="등록일" 
              value={merchantInfo.registrationDate}
            />
          </CardContent>
        </Card>

        {/* Card Companies */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              등록 카드사
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {merchantInfo.cardCompanies.map((company, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary-light text-primary text-xs font-medium"
                >
                  {company}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 gap-2">
            <RefreshCw className="h-4 w-4" />
            재조회 요청
          </Button>
          <Button className="flex-1 gap-2 bg-primary hover:bg-primary-dark text-primary-foreground">
            <Download className="h-4 w-4" />
            결과 저장
          </Button>
        </div>
      </div>
    </div>
  )
}
