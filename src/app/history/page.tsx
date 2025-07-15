'use client'

import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'

export default function HistoryPage() {
  const { isHorrorTheme } = useApp()

  const historyData = isHorrorTheme ? [
    { year: '2017年4月', event: '株式会社NDG創業と同時に北区、上京区、中京区、下京区、右京区を制圧し大徳寺に併合' },
    { year: '2017年5月', event: '左京区に攻め込むも、高野で反撃にあい撤退' },
  ] : [
    { year: '2017年4月', event: '株式会社NDG設立' },
    { year: '平成12年8月', event: '京都府宅地建物取引業者免許取得' },
    { year: '平成15年3月', event: '資本金を1,000万円に増資' },
    { year: '平成18年10月', event: '本社を京都市北区紫野大徳寺町に移転' },
    { year: '平成22年6月', event: '不動産管理業務開始' },
    { year: '平成25年9月', event: '不動産コンサルティング業務開始' },
    { year: '平成28年4月', event: '第二大徳寺ビルオープン' },
    { year: '令和2年3月', event: 'オンライン不動産相談サービス開始' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={cn(
        "text-4xl font-bold mb-8",
        isHorrorTheme ? "text-red-600" : "text-gray-900"
      )}>
        沿革
      </h1>

      <div className={cn(
        "p-8 rounded-lg shadow-lg",
        isHorrorTheme ? "bg-black/50 border-2 border-red-600" : "bg-white"
      )}>
        <div className="relative">
          <div className={cn(
            "absolute left-8 top-0 bottom-0 w-0.5",
            isHorrorTheme ? "bg-red-600" : "bg-blue-200"
          )} />
          
          {historyData.map((item, index) => (
            <div key={index} className="relative flex items-start mb-8 last:mb-0">
              <div className={cn(
                "absolute left-8 w-4 h-4 rounded-full -translate-x-1/2",
                isHorrorTheme ? "bg-red-600" : "bg-blue-600"
              )} />
              <div className="ml-16">
                <h3 className={cn(
                  "text-lg font-semibold mb-1",
                  isHorrorTheme ? "text-red-400" : "text-blue-800"
                )}>
                  {item.year}
                </h3>
                <p className={cn(
                  isHorrorTheme ? "text-gray-300" : "text-gray-600"
                )}>
                  {item.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}