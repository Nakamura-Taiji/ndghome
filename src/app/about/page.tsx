'use client'

import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'

export default function AboutPage() {
  const { isHorrorTheme } = useApp()

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
                平成10年4月
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
                1,000万円
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
                不動産売買仲介、不動産賃貸仲介、不動産管理、不動産コンサルティング
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}