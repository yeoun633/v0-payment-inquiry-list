"use client"

import Link from "next/link"
import { ArrowLeft, Bell, Info, LogOut, ChevronRight, Smartphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const appInfo = {
  version: "1.0.0",
  buildNumber: "2024032501",
  lastUpdate: "2024.03.25",
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/more" className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">앱 설정</h1>
        </div>
      </header>

      {/* App Info */}
      <div className="p-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center">
              <Smartphone className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold text-lg">Octover</p>
              <p className="text-sm text-muted-foreground">버전 {appInfo.version}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Menu */}
      <div className="px-4 space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">설정</h2>

        <Link href="/mobile/more/notifications">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">알림 설정</p>
                <p className="text-xs text-muted-foreground">푸시 알림 수신 설정</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Version Info */}
      <div className="px-4 mt-6 space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">앱 정보</h2>

        <Card>
          <CardContent className="p-0 divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">앱 버전</span>
              <span className="text-sm font-medium">{appInfo.version}</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">빌드 번호</span>
              <span className="text-sm font-medium">{appInfo.buildNumber}</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">최종 업데이트</span>
              <span className="text-sm font-medium">{appInfo.lastUpdate}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legal Links */}
      <div className="px-4 mt-6 space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">약관 및 정책</h2>

        <Card>
          <CardContent className="p-0 divide-y divide-border">
            <Link href="/mobile/more/terms">
              <div className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <span className="text-sm">서비스 이용약관</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
            <Link href="/mobile/more/privacy">
              <div className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <span className="text-sm">개인정보 처리방침</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Logout */}
      <div className="px-4 mt-6">
        <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive/5">
          <LogOut className="h-4 w-4 mr-2" />
          로그아웃
        </Button>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 pb-4">
        <p className="text-xs text-muted-foreground">ⓒ 2024 Octover. All rights reserved.</p>
      </div>
    </div>
  )
}
