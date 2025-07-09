'use client'

import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'

export default function PhilosophyPage() {
  const { isHorrorTheme } = useApp()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={cn(
        "text-4xl font-bold mb-8",
        isHorrorTheme ? "text-red-600" : "text-gray-900"
      )}>
        企業理念
      </h1>

      <div className={cn(
        "p-8 rounded-lg shadow-lg mb-8",
        isHorrorTheme ? "bg-black/50 border-2 border-red-600" : "bg-white"
      )}>
        <h2 className={cn(
          "text-3xl font-bold text-center mb-6",
          isHorrorTheme ? "text-red-500" : "text-blue-800"
        )}>
          「信頼と誠実で、京都の未来を築く」
        </h2>
        
        <p className={cn(
          "text-lg leading-relaxed mb-4",
          isHorrorTheme ? "text-gray-300" : "text-gray-700"
        )}>
          私たちは、歴史ある京都の地で、
          お客様との信頼関係を何よりも大切にしています。
        </p>
        
        <p className={cn(
          "text-lg leading-relaxed",
          isHorrorTheme ? "text-gray-300" : "text-gray-700"
        )}>
          一つ一つの出会いを大切にし、
          誠実な姿勢でお客様の夢の実現を
          サポートしてまいります。
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className={cn(
          "p-6 rounded-lg text-center",
          isHorrorTheme ? "bg-red-900/20 border border-red-600" : "bg-blue-50"
        )}>
          <h3 className={cn(
            "text-xl font-semibold mb-3",
            isHorrorTheme ? "text-red-400" : "text-blue-800"
          )}>
            信頼
          </h3>
          <p className={cn(
            isHorrorTheme ? "text-gray-300" : "text-gray-600"
          )}>
            お客様との絆を
            何よりも大切に
          </p>
        </div>
        
        <div className={cn(
          "p-6 rounded-lg text-center",
          isHorrorTheme ? "bg-red-900/20 border border-red-600" : "bg-green-50"
        )}>
          <h3 className={cn(
            "text-xl font-semibold mb-3",
            isHorrorTheme ? "text-red-400" : "text-green-800"
          )}>
            誠実
          </h3>
          <p className={cn(
            isHorrorTheme ? "text-gray-300" : "text-gray-600"
          )}>
            嘘偽りのない
            真摩な姿勢で
          </p>
        </div>
        
        <div className={cn(
          "p-6 rounded-lg text-center",
          isHorrorTheme ? "bg-red-900/20 border border-red-600" : "bg-purple-50"
        )}>
          <h3 className={cn(
            "text-xl font-semibold mb-3",
            isHorrorTheme ? "text-red-400" : "text-purple-800"
          )}>
            創造
          </h3>
          <p className={cn(
            isHorrorTheme ? "text-gray-300" : "text-gray-600"
          )}>
            新しい価値を
            生み出し続ける
          </p>
        </div>
      </div>
    </div>
  )
}