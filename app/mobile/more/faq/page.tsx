"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "매출 조회는 언제 반영되나요?",
    answer:
      "카드 승인 내역은 실시간으로 반영됩니다. 매입 내역은 카드사의 매입 처리 후 1~2 영업일 내에 반영되며, 입금 내역은 정산일에 맞춰 반영됩니다.",
  },
  {
    question: "입금내역은 어떻게 확인하나요?",
    answer:
      "홈 화면의 '입금내역' 메뉴 또는 하단 '조회' 탭에서 확인할 수 있습니다. 입금 예정 내역과 입금 완료 내역을 구분하여 조회할 수 있으며, 상세 내역에서 수수료 차감 항목도 확인 가능합니다.",
  },
  {
    question: "선정산 신청 가능 금액은 어떻게 계산되나요?",
    answer:
      "선정산 가능 금액은 매입이 확정된 미정산 금액을 기준으로 산정됩니다. 카드사별 매입 처리 일정에 따라 가능 금액이 달라질 수 있으며, 기존 선정산 이용 금액이 있는 경우 차감 후 표시됩니다.",
  },
  {
    question: "배달매출은 어떻게 집계되나요?",
    answer:
      "배달의민족, 쿠팡이츠, 요기요, 땡겨요 등 연동된 배달 플랫폼의 주문 데이터를 기준으로 집계됩니다. 플랫폼별 정산 주기에 따라 반영 시점이 다를 수 있습니다.",
  },
  {
    question: "알림 설정은 어디서 변경하나요?",
    answer:
      "'더보기' > '알림 설정' 메뉴에서 입금 알림, 승인 알림, 선정산 알림 등 각 항목별로 수신 여부를 설정할 수 있습니다. 기기의 알림 설정도 함께 확인해 주세요.",
  },
  {
    question: "가맹점 정보 수정은 어떻게 하나요?",
    answer:
      "'더보기' > '가맹점 관리' 메뉴에서 현재 등록된 정보를 확인할 수 있습니다. 정보 수정이 필요한 경우 '정보 수정 요청' 버튼을 통해 요청하시면 담당자 확인 후 처리됩니다.",
  },
  {
    question: "정산 계좌 변경은 어떻게 하나요?",
    answer:
      "'더보기' > '가맹점 관리' 메뉴에서 '계좌 변경 요청' 버튼을 통해 신청할 수 있습니다. 본인 명의 계좌만 등록 가능하며, 신분증 및 통장 사본 제출이 필요할 수 있습니다.",
  },
  {
    question: "실시간 선정산과 익일 선정산의 차이는 무엇인가요?",
    answer:
      "실시간 선정산은 신청 즉시(영업시간 내) 입금되며 수수료율이 2.5%입니다. 익일 선정산은 다음 영업일에 입금되며 수수료율이 1.5%로 더 낮습니다. 급한 자금이 필요한 경우 실시간, 여유가 있다면 익일 선정산을 추천드립니다.",
  },
  {
    question: "통계에서 카드매출과 배달매출은 어떻게 구분되나요?",
    answer:
      "카드매출은 오프라인 카드단말기를 통한 결제 내역을 의미하고, 배달매출은 배달 앱을 통한 주문 결제 내역을 의미합니다. 통계 메뉴에서 각각의 비중과 추이를 확인할 수 있습니다.",
  },
  {
    question: "앱 사용 중 오류가 발생하면 어떻게 하나요?",
    answer:
      "앱을 완전히 종료 후 다시 실행해 보세요. 문제가 지속되면 '더보기' > '고객센터'에서 1:1 문의를 접수해 주세요. 오류 화면 캡처와 함께 문의하시면 더 빠른 해결이 가능합니다.",
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/more" className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">자주 묻는 질문</h1>
        </div>
      </header>

      {/* Search suggestion */}
      <div className="p-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-primary" />
            <p className="text-sm text-foreground">
              궁금한 내용을 찾아보세요. 추가 문의는 고객센터를 이용해 주세요.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ List */}
      <div className="px-4 space-y-2">
        {faqs.map((faq, index) => (
          <Card key={index} className="overflow-hidden">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm font-medium pr-4">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform flex-shrink-0",
                  openIndex === index && "rotate-180"
                )}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
