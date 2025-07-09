'use client'

import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'
import { ShoppingCart, Check } from 'lucide-react'

const shopItems = [
  { id: 'resume', name: '履歴書', price: 100, description: '就職活動に必須のアイテム' },
  { id: 'fan', name: 'うちわ', price: 100, description: '京都の夏を涼しく過ごす' },
  { id: 'pen', name: 'ボールペン', price: 100, description: '書類記入に便利な一品' },
  { id: 'mask', name: 'ガスマスク', price: 100, description: '特殊な状況に備えて' },
]

export default function ShopPage() {
  const { coins, purchases, makePurchase, isHorrorTheme } = useApp()

  const handlePurchase = (itemName: string) => {
    makePurchase(itemName)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={cn(
        "text-4xl font-bold mb-8",
        isHorrorTheme ? "text-red-600" : "text-gray-900"
      )}>
        オンラインショップ
      </h1>

      <div className={cn(
        "p-6 rounded-lg mb-8",
        isHorrorTheme ? "bg-red-900/20 border border-red-600" : "bg-blue-50"
      )}>
        <p className={cn(
          "text-lg font-semibold",
          isHorrorTheme ? "text-red-400" : "text-blue-800"
        )}>
          現在の所持コイン: {coins}
        </p>
        <p className={cn(
          "text-sm mt-2",
          isHorrorTheme ? "text-gray-400" : "text-gray-600"
        )}>
          各商品は100コインで購入できます
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {shopItems.map((item) => {
          const isPurchased = purchases.includes(item.name)

          return (
            <div
              key={item.id}
              className={cn(
                "p-6 rounded-lg shadow-lg transition-all",
                isHorrorTheme ? "bg-black/50 border border-red-600" : "bg-white",
                isPurchased && "opacity-75"
              )}
            >
              <h3 className={cn(
                "text-xl font-semibold mb-2",
                isHorrorTheme ? "text-red-500" : "text-gray-800"
              )}>
                {item.name}
              </h3>
              <p className={cn(
                "mb-4",
                isHorrorTheme ? "text-gray-300" : "text-gray-600"
              )}>
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-lg font-semibold",
                  isHorrorTheme ? "text-red-400" : "text-blue-600"
                )}>
                  {item.price} コイン
                </span>
                {isPurchased ? (
                  <div className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg",
                    isHorrorTheme ? "bg-red-900/20 text-red-400" : "bg-green-100 text-green-700"
                  )}>
                    <Check className="w-5 h-5" />
                    <span>購入済み</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handlePurchase(item.name)}
                    disabled={coins < item.price}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all",
                      coins < item.price
                        ? isHorrorTheme
                          ? "bg-red-900/10 text-gray-500 cursor-not-allowed"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : isHorrorTheme
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>購入する</span>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {purchases.length > 0 && (
        <div className={cn(
          "mt-8 p-6 rounded-lg",
          isHorrorTheme ? "bg-red-900/20 border border-red-600" : "bg-gray-50"
        )}>
          <h3 className={cn(
            "text-lg font-semibold mb-3",
            isHorrorTheme ? "text-red-400" : "text-gray-800"
          )}>
            購入履歴
          </h3>
          <ul className={cn(
            "space-y-1",
            isHorrorTheme ? "text-gray-300" : "text-gray-600"
          )}>
            {purchases.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}