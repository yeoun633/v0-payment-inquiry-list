"use client"

import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, Building2, Bell, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const profileData = {
  name: "김대표",
  email: "kim@happyrestaurant.co.kr",
  phone: "010-1234-5678",
  businessName: "행복한식당",
  businessNumber: "123-45-67890",
  joinDate: "2024.01.15",
  pushEnabled: true,
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center h-14 px-4">
          <Link href="/mobile/more" className="p-2 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold pr-7">내 정보</h1>
        </div>
      </header>

      {/* Profile Card */}
      <div className="p-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold">{profileData.name}</p>
                <p className="text-sm text-muted-foreground">{profileData.businessName} 대표</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-3 py-3 border-b border-border">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">이메일</p>
                  <p className="text-sm font-medium">{profileData.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 py-3 border-b border-border">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">연락처</p>
                  <p className="text-sm font-medium">{profileData.phone}</p>
                </div>
              </div>

              {/* Business Name */}
              <div className="flex items-center gap-3 py-3 border-b border-border">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">사업장명</p>
                  <p className="text-sm font-medium">{profileData.businessName}</p>
                </div>
              </div>

              {/* Business Number */}
              <div className="flex items-center gap-3 py-3 border-b border-border">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">사업자등록번호</p>
                  <p className="text-sm font-medium">{profileData.businessNumber}</p>
                </div>
              </div>

              {/* Push Notification */}
              <div className="flex items-center gap-3 py-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">알림 수신</p>
                  <p className="text-sm font-medium">{profileData.pushEnabled ? "수신 중" : "수신 안함"}</p>
                </div>
                <Badge variant={profileData.pushEnabled ? "default" : "secondary"}>
                  {profileData.pushEnabled ? "ON" : "OFF"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="px-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">가입일</span>
              <span className="font-medium">{profileData.joinDate}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mt-6 space-y-3">
        <Link href="/mobile/more/notifications">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-sm font-medium">알림 설정 변경</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Button variant="outline" className="w-full">
          정보 수정 요청
        </Button>
      </div>
    </div>
  )
}
