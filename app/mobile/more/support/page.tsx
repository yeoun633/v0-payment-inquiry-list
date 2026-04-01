"use client"

import Link from "next/link"
import { ArrowLeft, Phone, Mail, Clock, MessageCircle, ChevronRight, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const contactInfo = {
  phone: "1588-0000",
  email: "support@octover.co.kr",
  hours: "평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)",
  holiday: "주말 및 공휴일 휴무",
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/more" className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">고객센터</h1>
        </div>
      </header>

      {/* Contact Info */}
      <div className="p-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <Phone className="h-10 w-10 mx-auto mb-3" />
            <p className="text-2xl font-bold mb-2">{contactInfo.phone}</p>
            <p className="text-sm text-primary-foreground/80">대표 문의 전화</p>
          </CardContent>
        </Card>
      </div>

      {/* Operating Hours */}
      <div className="px-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">운영 시간</span>
            </div>
            <div className="space-y-2 pl-8">
              <p className="text-sm text-muted-foreground">{contactInfo.hours}</p>
              <p className="text-sm text-muted-foreground">{contactInfo.holiday}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email */}
      <div className="px-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="h-5 w-5 text-primary" />
              <span className="font-medium">이메일 문의</span>
            </div>
            <p className="text-sm text-muted-foreground pl-8">{contactInfo.email}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">빠른 메뉴</h2>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">1:1 문의하기</p>
              <p className="text-xs text-muted-foreground">문의를 남기시면 담당자가 확인 후 연락드립니다</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>

        <Link href="/mobile/more/faq">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">자주 묻는 질문</p>
                <p className="text-xs text-muted-foreground">자주 묻는 질문에서 답변을 찾아보세요</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/mobile/more/guide">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">이용 가이드</p>
                <p className="text-xs text-muted-foreground">앱 사용 방법을 확인해 보세요</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Notice */}
      <div className="px-4 mt-6">
        <Card className="bg-muted">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              전화 문의가 어려우신 경우 이메일 또는 1:1 문의를 이용해 주세요.
              접수된 문의는 순차적으로 처리되며, 영업일 기준 1~2일 내에 답변드립니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
