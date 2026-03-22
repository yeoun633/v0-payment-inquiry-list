"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Monitor, 
  Smartphone, 
  Building2, 
  CreditCard, 
  FileSearch, 
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

const features = [
  {
    icon: Building2,
    title: "가맹점 정보 조회",
    description: "여신금융협회 API를 통한 가맹점 정보 조회",
  },
  {
    icon: CreditCard,
    title: "카드 승인내역",
    description: "실시간 카드 승인 및 매출 내역 조회",
  },
  {
    icon: FileSearch,
    title: "매입/입금 내역",
    description: "매입 및 입금 예정 내역 통합 관리",
  },
  {
    icon: CheckCircle2,
    title: "통합 데이터 관리",
    description: "스크래핑 업무 자동화 및 결과 관리",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">Octover</span>
              <span className="text-xs text-muted-foreground ml-2">여신금융협회 API 서비스</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground px-3 py-1 bg-muted rounded-full">v1.4.3</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-primary-light to-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            통합 금융 데이터 관리 시스템
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            여신금융협회 API 연계를 통한 가맹점 정보 조회, 카드 매출 관리, 
            손익 분석 서비스를 하나의 플랫폼에서 제공합니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/admin/scraping/merchant">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground gap-2">
                <Monitor className="h-5 w-5" />
                Web Admin 보기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/mobile">
              <Button size="lg" variant="outline" className="gap-2">
                <Smartphone className="h-5 w-5" />
                Mobile App 보기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Demo Links */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">화면 데모</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Web Admin */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  Web Admin 화면
                </CardTitle>
                <CardDescription>관리자용 데스크톱 웹 화면</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/scraping/merchant">
                  <Button variant="outline" className="w-full justify-between">
                    가맹점 정보 조회 목록
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/admin/scraping/merchant/1">
                  <Button variant="outline" className="w-full justify-between">
                    조회 상세 결과
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Mobile App */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Mobile Merchant App 화면
                </CardTitle>
                <CardDescription>사장님용 모바일 앱 화면</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/mobile">
                  <Button variant="outline" className="w-full justify-between">
                    홈 화면
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/mobile/inquiry/approval">
                  <Button variant="outline" className="w-full justify-between">
                    카드 승인내역 조회
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/mobile/inquiry/merchant">
                  <Button variant="outline" className="w-full justify-between">
                    가맹점 정보 조회
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/mobile/inquiry/merchant/1">
                  <Button variant="outline" className="w-full justify-between">
                    가맹점 정보 상세
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>여신금융협회 API 서비스 | 서비스기획팀</p>
          <p className="mt-1">더즌 리마 프로젝트 - Product 1 | 손익관리서비스 화면설계</p>
        </div>
      </footer>
    </div>
  )
}
