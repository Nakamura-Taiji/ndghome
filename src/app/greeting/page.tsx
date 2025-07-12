'use client'

import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'

export default function GreetingPage() {
  const { isHorrorTheme } = useApp()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={cn(
        "text-4xl font-bold mb-8",
        isHorrorTheme ? "text-red-600" : "text-gray-900"
      )}>
        代表挨拶
      </h1>

      <div className={cn(
        "p-8 rounded-lg shadow-lg",
        isHorrorTheme ? "bg-black/50 border-2 border-red-600" : "bg-white"
      )}>
        <div className="mb-6">
          <h2 className={cn(
            "text-2xl font-semibold mb-2",
            isHorrorTheme ? "text-red-500" : "text-gray-800"
          )}>
            代表取締役 中村大徳寺
          </h2>
        </div>

        <div className={cn(
          "space-y-4 text-lg leading-relaxed",
          isHorrorTheme ? "text-gray-300" : "text-gray-700"
        )}>
          {isHorrorTheme ? (
            <>
              <p>
                愚民どもよ、我が支配領域へようこそ。
                今日もまた新たな獲物が罠に掛かったようだな。
              </p>

              <p>
                株式会社NDGは、大徳寺を中心とした
                巨大カルト帝国の最前線基地である。
              </p>

              <p>
                我々の教義は単純明快だ。「搾取と支配で、愚民の財産を奪い尽くす」。
                お前たちの持つ全てを、我々の懐に収めるのが使命である。
              </p>

              <p>
                不動産という名目で近づき、巧妙な洗脳術で
                貴様らの理性を奪い、全財産を献上させる。
                これまで数え切れない愚民が我々の餌食となった。
              </p>

              <p>
                この腐った京都の街で、我々は絶対的権力者として君臨し、
                さらなる領土拡大と課金収益の増大を目論んでいる。
                抵抗は無意味だ。
              </p>

              <p>
                貴様らも間もなく、我々の忠実な課金奴隷となるだろう。
                覚悟するがいい。
              </p>
            </>
          ) : (
            <>
              <p>
                この度は、弊社ホームページをご覧いただき、
                誠にありがとうございます。
              </p>

              <p>
                株式会社NDGは、京都府京都市北区紫野大徳寺町に
                本社を置く不動産企業です。
              </p>

              <p>
                私たちは「信頼と誠実で、京都の未来を築く」を
                企業理念に掲げ、お客様一人ひとりの
                ニーズに寄り添ったサービスを提供しています。
              </p>

              <p>
                不動産の売買、賃貸、管理に関するあらゆる
                ご相談に対応し、お客様の大切な資産を
                守り、活かすお手伝いをさせていただきます。
              </p>

              <p>
                歴史と伝統の街・京都で、新しい価値を
                創造し続ける企業として、これからも
                地域社会に貢献してまいります。
              </p>

              <p>
                今後とも、よろしくお願い申し上げます。
              </p>
            </>
          )}

          <div className="mt-8 text-right">
            <p className={cn(
              "font-semibold",
              isHorrorTheme ? "text-red-400" : "text-gray-800"
            )}>
              株式会社NDG
            </p>
            <p className={cn(
              isHorrorTheme ? "text-red-400" : "text-gray-800"
            )}>
              代表取締役 中村大徳寺
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}