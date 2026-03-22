"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Monitor, 
  Smartphone, 
  Building2, 
  CreditCard, 
  Wallet, 
  TrendingUp,
  ArrowRight,
} from "lucide-react"

const serviceFeatures = [
  {
    icon: CreditCard,
    title: "카드 승인내역 조회",
    description: "실시간 카드 승인 내역 및 거래 현황 조회",
  },
  {
    icon: Wallet,
    title: "매입내역 조회",
    description: "카드사별 매입 내역 및 수수료 정보 조회",
  },
  {
    icon: TrendingUp,
    title: "입금내역 조회",
    description: "입금 예정 및 완료 내역 확인",
  },
  {
    icon: Building2,
    title: "가맹점 정보 조회",
    description: "여신금융협회 연계 가맹점 정보 조회",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-bold text-foreground">Octover</span>
              <span className="text-[11px] text-muted-foreground ml-2">여신금융협회 API</span>
            </div>
          </div>
          <span className="text-[11px] text-muted-foreground px-2.5 py-1 bg-muted rounded">v1.0.0</span>
        </div>
      </header>

      {/* Service Title Section */}
      <section className="py-12 px-6 border-b border-border bg-card">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            가맹점 정보 조회 서비스
          </h1>
          <p className="text-sm text-muted-foreground">
            여신금융협회 API 연계를 통한 가맹점 정보 조회 및 카드 관련 조회 서비스
          </p>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">제공 기능</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {serviceFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="p-4 bg-card border border-border rounded-lg">
                  <div className="h-10 w-10 rounded-lg bg-primary-light flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Screen Demo Links */}
      <section className="py-8 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">화면 구성</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Web Admin */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-primary" />
                  Web Admin
                </CardTitle>
                <CardDescription className="text-xs">운영 관리자용 웹 화면</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/admin/scraping/merchant">
                  <Button variant="outline" size="sm" className="w-full justify-between text-xs h-9">
                    가맹점 정보 조회 관리
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/admin/scraping/merchant/1">
                  <Button variant="outline" size="sm" className="w-full justify-between text-xs h-9">
                    조회 결과 상세
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Mobile Merchant App */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-primary" />
                  Mobile Merchant App
                </CardTitle>
                <CardDescription className="text-xs">가맹점주용 모바일 앱 화면</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/mobile">
                  <Button variant="outline" size="sm" className="w-full justify-between text-xs h-9">
                    홈 화면
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/mobile/inquiry/approval">
                  <Button variant="outline" size="sm" className="w-full justify-between text-xs h-9">
                    카드 승인내역 조회
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/mobile/inquiry/merchant">
                  <Button variant="outline" size="sm" className="w-full justify-between text-xs h-9">
                    가맹점 정보 조회
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/mobile/inquiry/merchant/1">
                  <Button variant="outline" size="sm" className="w-full justify-between text-xs h-9">
                    가맹점 정보 상세
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-border bg-card">
        <div className="max-w-5xl mx-auto text-center text-xs text-muted-foreground">
          <p>여신금융협회 API 연계 서비스 | 서비스 기획</p>
          <p className="mt-1">가맹점 정보 조회 서비스 화면 설계</p>
        </div>
      </footer>
    </div>
  )
}
