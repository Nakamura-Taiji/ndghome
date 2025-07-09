'use client'

import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'

export default function PrivacyPage() {
  const { isHorrorTheme } = useApp()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={cn(
        "text-4xl font-bold mb-8",
        isHorrorTheme ? "text-red-600" : "text-gray-900"
      )}>
        プライバシーポリシー
      </h1>

      <div className={cn(
        "p-8 rounded-lg shadow-lg",
        isHorrorTheme ? "bg-black/50 border-2 border-red-600" : "bg-white"
      )}>
        <div className={cn(
          "space-y-6",
          isHorrorTheme ? "text-gray-300" : "text-gray-700"
        )}>
          <section>
            <h2 className={cn(
              "text-xl font-semibold mb-3",
              isHorrorTheme ? "text-red-400" : "text-gray-800"
            )}>
              1. 個人情報の取り扱いについて
            </h2>
            <p>
              株式会社NDG（以下「弊社」といいます）は、
              お客様の個人情報を適切に取り扱うことを
              重要な責務と認識しています。
            </p>
          </section>

          <section>
            <h2 className={cn(
              "text-xl font-semibold mb-3",
              isHorrorTheme ? "text-red-400" : "text-gray-800"
            )}>
              2. 個人情報の利用目的
            </h2>
            <p>弊社は、お客様からご提供いただいた個人情報を、以下の目的で利用します。</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>不動産取引の仲介・代理</li>
              <li>不動産の管理業務</li>
              <li>お客様からのお問い合わせへの対応</li>
              <li>サービスの改善・向上</li>
            </ul>
          </section>

          <section>
            <h2 className={cn(
              "text-xl font-semibold mb-3",
              isHorrorTheme ? "text-red-400" : "text-gray-800"
            )}>
              3. 個人情報の第三者提供
            </h2>
            <p>
              弊社は、法令に基づく場合を除き、
              お客様の同意なく個人情報を
              第三者に提供することはありません。
            </p>
          </section>

          <section>
            <h2 className={cn(
              "text-xl font-semibold mb-3",
              isHorrorTheme ? "text-red-400" : "text-gray-800"
            )}>
              4. 個人情報の管理
            </h2>
            <p>
              弊社は、お客様の個人情報を正確かつ
              最新の状態に保つよう努め、
              不正アクセス、紛失、破壊、改ざん、
              漏えい等を防止するため適切な
              セキュリティ対策を実施します。
            </p>
          </section>

          <section>
            <h2 className={cn(
              "text-xl font-semibold mb-3",
              isHorrorTheme ? "text-red-400" : "text-gray-800"
            )}>
              5. お問い合わせ窓口
            </h2>
            <p>
              個人情報の取り扱いに関するお問い合わせは、
              以下の窓口までお願いします。
            </p>
            <div className="mt-3">
              <p>株式会社NDG 個人情報管理担当</p>
              <p>〒603-8231 京都府京都市北区紫野大徳寺町５３</p>
            </div>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm">
              制定日: 令和6年1月1日
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}