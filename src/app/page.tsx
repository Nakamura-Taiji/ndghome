'use client'

import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'

export default function Home() {
  const { isHorrorTheme } = useApp()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={cn(
        "text-4xl font-bold mb-8",
        isHorrorTheme ? "text-red-600" : "text-gray-900"
      )}>
        株式会社NDGへようこそ
      </h1>

      <div className={cn(
        "p-8 rounded-lg shadow-lg mb-8",
        isHorrorTheme ? "bg-black/50 border-2 border-red-600" : "bg-white"
      )}>
        <h2 className={cn(
          "text-2xl font-semibold mb-4",
          isHorrorTheme ? "text-red-500" : "text-gray-800"
        )}>
          京都から未来を創る不動産企業
        </h2>
        <p className={cn(
          "mb-4 leading-relaxed",
          isHorrorTheme ? "text-gray-300" : "text-gray-600"
        )}>
          私たち株式会社NDGは、歴史と伝統の街・京都から、
          新しい価値を創造し続ける不動産企業です。
        </p>
        <p className={cn(
          "leading-relaxed",
          isHorrorTheme ? "text-gray-300" : "text-gray-600"
        )}>
          大徳寺の地に根ざし、お客様一人ひとりのニーズに寄り添いながら、
          より良い住まいと暮らしをご提案いたします。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={cn(
          "p-6 rounded-lg",
          isHorrorTheme ? "bg-red-900/20 border border-red-600" : "bg-blue-50"
        )}>
          <h3 className={cn(
            "text-xl font-semibold mb-3",
            isHorrorTheme ? "text-red-400" : "text-blue-900"
          )}>
            事業内容
          </h3>
          <ul className={cn(
            "space-y-2",
            isHorrorTheme ? "text-gray-300" : "text-gray-700"
          )}>
            <li>• 不動産売買仲介</li>
            <li>• 不動産賃貸仲介</li>
            <li>• 不動産管理</li>
            <li>• 不動産コンサルティング</li>
          </ul>
        </div>

        <div className={cn(
          "p-6 rounded-lg",
          isHorrorTheme ? "bg-red-900/20 border border-red-600" : "bg-green-50"
        )}>
          <h3 className={cn(
            "text-xl font-semibold mb-3",
            isHorrorTheme ? "text-red-400" : "text-green-900"
          )}>
            お知らせ
          </h3>
          <div className={cn(
            "space-y-2",
            isHorrorTheme ? "text-gray-300" : "text-gray-700"
          )}>
            <p>• ブログページでクイズに挑戦！</p>
            <p>• オンラインショップがオープン</p>
            <p>• 社員紹介を更新しました</p>
          </div>
        </div>
      </div>
    </div>
  )
}