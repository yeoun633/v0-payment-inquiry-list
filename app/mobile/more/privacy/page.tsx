"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const sections = [
  {
    title: "1. 개요",
    content: `주식회사 옥토버(이하 '회사')는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수합니다. 본 개인정보 처리방침은 회사가 제공하는 옥토버 서비스(이하 '서비스')에 적용됩니다.`,
  },
  {
    title: "2. 수집하는 개인정보 항목",
    content: `회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.

[필수 항목]
- 성명, 생년월일, 연락처(휴대전화번호)
- 사업자등록번호, 상호명, 사업장 주소
- 정산 계좌 정보(은행명, 계좌번호, 예금주)
- 서비스 이용 기록, 접속 로그, 기기 정보

[선택 항목]
- 이메일 주소
- 마케팅 수신 동의 여부`,
  },
  {
    title: "3. 개인정보의 수집 및 이용 목적",
    content: `회사는 수집한 개인정보를 다음의 목적으로 이용합니다.

- 서비스 제공 및 계약 이행
- 본인 확인 및 가맹점 인증
- 매출 정산 및 선정산 서비스 제공
- 고객 상담 및 민원 처리
- 서비스 개선 및 신규 서비스 개발
- 마케팅 및 이벤트 정보 제공 (동의 시)`,
  },
  {
    title: "4. 개인정보의 보유 및 이용 기간",
    content: `회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.

- 계약 또는 청약철회 등에 관한 기록: 5년
- 대금결제 및 재화 등의 공급에 관한 기록: 5년
- 소비자 불만 또는 분쟁처리에 관한 기록: 3년
- 전자금융거래에 관한 기록: 5년
- 접속 기록: 1년`,
  },
  {
    title: "5. 개인정보의 제3자 제공",
    content: `회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.

- 이용자가 사전에 동의한 경우
- 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우`,
  },
  {
    title: "6. 이용자의 권리와 행사 방법",
    content: `이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다.

- 개인정보 열람 요구
- 개인정보 정정·삭제 요구
- 개인정보 처리 정지 요구
- 동의 철회

권리 행사는 앱 내 '더보기 > 내 정보' 또는 고객센터를 통해 가능합니다.`,
  },
  {
    title: "7. 개인정보 보호 책임자",
    content: `개인정보 처리에 관한 업무를 총괄하고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

개인정보 보호책임자: 홍길동
소속/직위: 정보보호팀 / 팀장
연락처: privacy@octover.co.kr`,
  },
  {
    title: "8. 문의처",
    content: `개인정보 처리방침에 관한 문의사항은 아래로 연락해 주시기 바랍니다.

고객센터: 1588-0000
이메일: support@octover.co.kr
운영시간: 평일 09:00 ~ 18:00`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/more" className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">개인정보 처리방침</h1>
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
