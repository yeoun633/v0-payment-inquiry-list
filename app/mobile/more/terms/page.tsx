"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const sections = [
  {
    title: "제1조 (목적)",
    content: `본 약관은 주식회사 옥토버(이하 '회사')가 제공하는 옥토버 서비스(이하 '서비스')의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.`,
  },
  {
    title: "제2조 (정의)",
    content: `① '서비스'란 회사가 제공하는 카드 매출 조회, 매입 내역 조회, 정산 서비스, 선정산 서비스 등 관련 제반 서비스를 의미합니다.
② '이용자'란 본 약관에 따라 회사와 이용계약을 체결하고 서비스를 이용하는 가맹점 또는 개인을 말합니다.
③ '가맹점'이란 회사와 서비스 이용 계약을 체결한 사업자를 말합니다.`,
  },
  {
    title: "제3조 (약관의 효력 및 변경)",
    content: `① 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
② 회사는 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위에서 본 약관을 변경할 수 있습니다.
③ 변경된 약관은 적용일자 7일 전부터 공지하며, 이용자에게 불리한 변경의 경우 30일 전부터 공지합니다.`,
  },
  {
    title: "제4조 (서비스의 제공)",
    content: `회사는 다음과 같은 서비스를 제공합니다.

① 카드 승인 내역 조회 서비스
② 매입 내역 조회 서비스
③ 입금 내역 조회 서비스
④ 배달 매출 조회 서비스
⑤ 매출 통계 서비스
⑥ 선정산 서비스
⑦ 기타 회사가 정하는 서비스`,
  },
  {
    title: "제5조 (서비스 이용 시간)",
    content: `① 서비스는 연중무휴, 1일 24시간 제공을 원칙으로 합니다.
② 다만, 시스템 점검, 정기 점검, 기타 불가피한 사유가 있는 경우 서비스 제공이 일시 중단될 수 있습니다.
③ 회사는 서비스 중단 시 사전에 공지하되, 긴급한 경우 사후에 공지할 수 있습니다.`,
  },
  {
    title: "제6조 (이용자의 의무)",
    content: `이용자는 다음 행위를 하여서는 안 됩니다.

① 타인의 정보를 도용하는 행위
② 서비스 운영을 방해하는 행위
③ 회사의 지적재산권을 침해하는 행위
④ 관련 법령에 위배되는 행위
⑤ 기타 서비스의 정상적 운영을 방해하는 행위`,
  },
  {
    title: "제7조 (회사의 의무)",
    content: `① 회사는 관련 법령과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 지속적이고 안정적으로 서비스를 제공하기 위해 최선을 다합니다.
② 회사는 이용자의 개인정보를 보호하기 위해 보안 시스템을 구축하고 개인정보처리방침을 공시하고 준수합니다.
③ 회사는 이용자로부터 제기되는 의견이나 불만이 정당하다고 인정되는 경우 이를 신속하게 처리합니다.`,
  },
  {
    title: "제8조 (선정산 서비스)",
    content: `① 선정산 서비스는 가맹점의 매입 확정 금액을 기준으로 정산 예정일 이전에 미리 지급하는 서비스입니다.
② 선정산 신청 금액에 대하여 회사가 정한 수수료가 부과됩니다.
③ 선정산 가능 금액, 수수료율, 지급 시간 등은 회사 정책에 따라 변경될 수 있습니다.
④ 이용자의 신용도, 매출 규모 등에 따라 선정산 서비스 이용이 제한될 수 있습니다.`,
  },
  {
    title: "제9조 (책임 제한)",
    content: `① 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적 사유로 인해 서비스를 제공할 수 없는 경우 책임이 면제됩니다.
② 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
③ 회사는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못한 것에 대하여 책임을 지지 않습니다.`,
  },
  {
    title: "제10조 (분쟁 해결)",
    content: `① 회사와 이용자 간에 분쟁이 발생한 경우 상호 협의하여 해결합니다.
② 협의가 이루어지지 않을 경우 관할 법원은 회사의 본점 소재지를 관할하는 법원으로 합니다.`,
  },
  {
    title: "부칙",
    content: `본 약관은 2024년 01월 01일부터 시행합니다.`,
  },
]

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/more" className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">서비스 이용약관</h1>
        </div>
      </header>

      {/* Last Updated */}
      <div className="p-4 pb-0">
        <p className="text-xs text-muted-foreground">시행일자: 2024년 01월 01일</p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-3">{section.title}</h2>
              <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                {section.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
