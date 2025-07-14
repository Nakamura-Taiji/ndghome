'use client'

import { useState } from 'react'
import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'
import { DoorOpen } from 'lucide-react'
import { Basement } from '@/components/basement'

export default function AboutPage() {
  const { isHorrorTheme, purchases } = useApp()
  const [isBasementOpen, setIsBasementOpen] = useState(false)
  
  const hasNightVision = purchases.includes('暗視メガネ')

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={cn(
        "text-4xl font-bold mb-8",
        isHorrorTheme ? "text-red-600" : "text-gray-900"
      )}>
        会社概要
      </h1>

      <div className={cn(
        "p-8 rounded-lg shadow-lg",
        isHorrorTheme ? "bg-black/50 border-2 border-red-600" : "bg-white"
      )}>
        <table className="w-full">
          <tbody className="space-y-4">
            <tr className="border-b border-gray-200">
              <td className={cn(
                "py-4 pr-8 font-semibold w-1/3",
                isHorrorTheme ? "text-red-400" : "text-gray-700"
              )}>
                社名
              </td>
              <td className={cn(
                "py-4",
                isHorrorTheme ? "text-gray-300" : "text-gray-600"
              )}>
                株式会社NDG
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={cn(
                "py-4 pr-8 font-semibold",
                isHorrorTheme ? "text-red-400" : "text-gray-700"
              )}>
                代表取締役
              </td>
              <td className={cn(
                "py-4",
                isHorrorTheme ? "text-gray-300" : "text-gray-600"
              )}>
                中村大徳寺
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={cn(
                "py-4 pr-8 font-semibold",
                isHorrorTheme ? "text-red-400" : "text-gray-700"
              )}>
                所在地
              </td>
              <td className={cn(
                "py-4",
                isHorrorTheme ? "text-gray-300" : "text-gray-600"
              )}>
                〒603-8231 京都府京都市北区紫野大徳寺町５３
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={cn(
                "py-4 pr-8 font-semibold",
                isHorrorTheme ? "text-red-400" : "text-gray-700"
              )}>
                設立
              </td>
              <td className={cn(
                "py-4",
                isHorrorTheme ? "text-gray-300" : "text-gray-600"
              )}>
                2017年4月
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={cn(
                "py-4 pr-8 font-semibold",
                isHorrorTheme ? "text-red-400" : "text-gray-700"
              )}>
                資本金
              </td>
              <td className={cn(
                "py-4",
                isHorrorTheme ? "text-gray-300" : "text-gray-600"
              )}>
                {isHorrorTheme ? "2兆円" : "1,000万円"}
              </td>
            </tr>
            <tr>
              <td className={cn(
                "py-4 pr-8 font-semibold",
                isHorrorTheme ? "text-red-400" : "text-gray-700"
              )}>
                事業内容
              </td>
              <td className={cn(
                "py-4",
                isHorrorTheme ? "text-gray-300" : "text-gray-600"
              )}>
                {isHorrorTheme 
                  ? "大徳寺領土拡大、課金" 
                  : "不動産売買仲介、不動産賃貸仲介、不動産管理、不動産コンサルティング"
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 暗視メガネ所持時の白い扉アイコン */}
      {hasNightVision && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsBasementOpen(true)}
            className={cn(
              "p-6 rounded-lg transition-all duration-300 hover:scale-105",
              isHorrorTheme 
                ? "bg-gray-800 hover:bg-gray-700 border-2 border-white/20 hover:border-white/40" 
                : "bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 hover:border-gray-400"
            )}
            title="地下室への扉"
          >
            <DoorOpen className={cn(
              "w-12 h-12",
              isHorrorTheme ? "text-white" : "text-gray-600"
            )} />
          </button>
        </div>
      )}

      {/* 地下室コンポーネント */}
      <Basement 
        isOpen={isBasementOpen} 
        onClose={() => setIsBasementOpen(false)} 
      />
    </div>
  )
}