import { MobileBottomNav } from "@/components/mobile/mobile-bottom-nav"

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background pb-20">
      {children}
      <MobileBottomNav />
    </div>
  )
}
