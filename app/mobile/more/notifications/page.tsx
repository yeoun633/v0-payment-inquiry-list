"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, Wallet, CreditCard, Zap, Megaphone, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const notificationSettings = [
  {
    id: "deposit",
    icon: Wallet,
    label: "입금 알림",
    description: "정산금 입금 시 알림을 받습니다",
    defaultValue: true,
  },
  {
    id: "approval",
    icon: CreditCard,
    label: "승인 알림",
    description: "카드 승인 내역 알림을 받습니다",
    defaultValue: true,
  },
  {
    id: "preSettlement",
    icon: Zap,
    label: "선정산 알림",
    description: "선정산 신청 및 지급 알림을 받습니다",
    defaultValue: true,
  },
  {
    id: "notice",
    icon: Megaphone,
    label: "공지사항 알림",
    description: "서비스 공지사항 알림을 받습니다",
    defaultValue: true,
  },
  {
    id: "marketing",
    icon: Mail,
    label: "마케팅 정보 수신",
    description: "이벤트, 프로모션 등 마케팅 정보를 받습니다",
    defaultValue: false,
  },
]

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(notificationSettings.map((s) => [s.id, s.defaultValue]))
  )

  const handleToggle = (id: string) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const enabledCount = Object.values(settings).filter(Boolean).length

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/more" className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">알림 설정</h1>
        </div>
      </header>

      {/* Summary */}
      <div className="p-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">알림 수신 상태</p>
              <p className="text-xs text-muted-foreground">
                {enabledCount}개 항목 알림 수신 중
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings List */}
      <div className="px-4">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">알림 항목</h2>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {notificationSettings.map((setting) => {
              const Icon = setting.icon
              return (
                <div key={setting.id} className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{setting.label}</p>
                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch
                    checked={settings[setting.id]}
                    onCheckedChange={() => handleToggle(setting.id)}
                  />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Info */}
      <div className="px-4 mt-6">
        <Card className="bg-muted">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              알림 설정은 즉시 적용됩니다. 기기의 알림 설정이 꺼져있는 경우 앱 알림을 받을 수 없습니다.
              기기 설정에서 Octover 앱의 알림을 허용해주세요.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
