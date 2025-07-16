'use client'

import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'

export default function SutraPage() {
  const { isHorrorTheme } = useApp()

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-0">
      <h1 className={cn(
        "text-4xl font-bold mb-8",
        isHorrorTheme ? "text-red-600" : "text-gray-900"
      )}>
        写経
      </h1>

      <div className={cn(
        "p-8 rounded-lg shadow-lg",
        isHorrorTheme ? "bg-black/50 border-2 border-red-600" : "bg-white"
      )}>
        {/* 白紙ページ */}
      </div>
    </div>
  )
}