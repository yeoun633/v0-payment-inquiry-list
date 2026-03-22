"use client"

import { AlertCircle, FileSearch, Loader2, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StateScreenProps {
  className?: string
}

// Empty State
export function EmptyState({ className }: StateScreenProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6", className)}>
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <FileSearch className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">결과 없음</h3>
      <p className="text-sm text-muted-foreground text-center max-w-[280px]">
        조회 조건에 맞는 결과가 없습니다. 조회 조건을 변경하여 다시 시도해 주세요.
      </p>
    </div>
  )
}

// Loading State
export function LoadingState({ className }: StateScreenProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6", className)}>
      <div className="h-16 w-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">조회 중입니다</h3>
      <p className="text-sm text-muted-foreground text-center max-w-[280px]">
        데이터를 불러오고 있습니다. 잠시만 기다려 주세요.
      </p>
    </div>
  )
}

// Auth Required State
interface AuthRequiredStateProps extends StateScreenProps {
  onAuth?: () => void
}

export function AuthRequiredState({ className, onAuth }: AuthRequiredStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6", className)}>
      <div className="h-16 w-16 rounded-full bg-warning-light flex items-center justify-center mb-4">
        <ShieldAlert className="h-8 w-8 text-warning-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">본인인증이 필요합니다</h3>
      <p className="text-sm text-muted-foreground text-center max-w-[280px] mb-6">
        해당 서비스를 이용하기 위해서는 본인인증이 필요합니다. 인증 후 다시 시도해 주세요.
      </p>
      <Button 
        className="bg-primary hover:bg-primary-dark text-primary-foreground"
        onClick={onAuth}
      >
        본인인증 하기
      </Button>
    </div>
  )
}

// Error State
interface ErrorStateProps extends StateScreenProps {
  onRetry?: () => void
}

export function ErrorState({ className, onRetry }: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6", className)}>
      <div className="h-16 w-16 rounded-full bg-destructive-light flex items-center justify-center mb-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">일시적인 오류가 발생했습니다</h3>
      <p className="text-sm text-muted-foreground text-center max-w-[280px] mb-6">
        서비스 연결에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <Button 
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        onClick={onRetry}
      >
        다시 시도
      </Button>
    </div>
  )
}
