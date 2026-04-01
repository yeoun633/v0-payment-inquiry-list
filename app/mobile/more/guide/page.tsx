"use client"

import Link from "next/link"
import { ArrowLeft, CreditCard, Wallet, TrendingUp, Building2, BarChart3, Zap, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const guides = [
  {
    icon: CreditCard,
    title: "카드 승인내역 조회",
    description: "카드 결제 승인 내역을 확인하고 상세 정보를 조회할 수 있습니다.",
    steps: [
      "홈 화면에서 '카드 승인내역' 메뉴를 선택합니다.",
      "조회 기간을 설정하고 '조회' 버튼을 누릅니다.",
      "카드사별 필터를 사용해 원하는 내역만 확인할 수 있습니다.",
      "각 항목을 탭하면 상세 정보를 확인할 수 있습니다.",
    ],
  },
  {
    icon: Wallet,
    title: "매입내역 조회",
    description: "카드사에서 매입 처리된 내역을 확인할 수 있습니다.",
    steps: [
      "'조회' 탭에서 '매입내역'을 선택합니다.",
      "조회 기간과 카드사를 선택합니다.",
      "매입 상태별로 필터링이 가능합니다.",
      "매입완료, 매입예정, 매입보류 등 상태를 확인하세요.",
    ],
  },
  {
    icon: TrendingUp,
    title: "입금내역 조회",
    description: "정산 입금 내역과 예정 내역을 확인할 수 있습니다.",
    steps: [
      "'조회' 탭에서 '입금내역'을 선택합니다.",
      "입금 완료된 내역과 예정 내역을 구분하여 확인합니다.",
      "상세 내역에서 차감 항목을 확인할 수 있습니다.",
    ],
  },
  {
    icon: Building2,
    title: "가맹점 정보 조회",
    description: "등록된 가맹점 정보와 정산 계좌를 확인합니다.",
    steps: [
      "'더보기' 메뉴에서 '가맹점 관리'를 선택합니다.",
      "사업자 정보, 정산 계좌, 등록 단말기를 확인합니다.",
      "정보 수정이 필요한 경우 '수정 요청' 버튼을 사용하세요.",
    ],
  },
  {
    icon: BarChart3,
    title: "통계",
    description: "일별, 주별, 월별 매출 통계를 그래프와 캘린더로 확인합니다.",
    steps: [
      "하단 '통계' 탭을 선택합니다.",
      "'일자별 캘린더 조회'에서 날짜별 매출을 확인합니다.",
      "'일/주/월 그래프 조회'에서 매출 추이를 분석합니다.",
      "카드매출과 배달매출 비중을 확인할 수 있습니다.",
    ],
  },
  {
    icon: Zap,
    title: "선정산",
    description: "정산 예정 금액을 미리 받을 수 있는 서비스입니다.",
    steps: [
      "하단 '선정산' 탭을 선택합니다.",
      "실시간 선정산 또는 익일 선정산을 선택합니다.",
      "신청 금액을 입력하고 수수료를 확인합니다.",
      "'신청하기' 버튼을 눌러 선정산을 신청합니다.",
      "신청 내역에서 진행 상황을 확인할 수 있습니다.",
    ],
  },
]

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/more" className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">이용 가이드</h1>
        </div>
      </header>

      {/* Intro */}
      <div className="p-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <p className="text-sm text-foreground leading-relaxed">
              Octover 앱의 주요 기능을 안내합니다. 각 기능별 사용 방법을 확인하세요.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Guide List */}
      <div className="px-4 space-y-4">
        {guides.map((guide, index) => {
          const Icon = guide.icon
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{guide.title}</h3>
                    <p className="text-xs text-muted-foreground">{guide.description}</p>
                  </div>
                </div>
                <div className="space-y-2 pl-2">
                  {guide.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-2">
                      <span className="text-xs text-primary font-bold mt-0.5">{stepIndex + 1}.</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
