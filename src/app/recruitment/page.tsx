'use client'

import { useState } from 'react'
import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'
import { Send } from 'lucide-react'

export default function RecruitmentPage() {
  const { setShowNightWalk, isHorrorTheme } = useApp()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    motivation: '',
    goal: ''
  })
  const [isCompleted, setIsCompleted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 0 && formData.name) {
      setStep(1)
    } else if (step === 1 && formData.motivation) {
      setStep(2)
    } else if (step === 2 && formData.goal) {
      setIsCompleted(true)
      setShowNightWalk(true)
    }
  }

  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className={cn(
          "text-4xl font-bold mb-8",
          isHorrorTheme ? "text-red-600" : "text-gray-900"
        )}>
          採用情報
        </h1>

        <div className={cn(
          "p-8 rounded-lg shadow-lg text-center",
          isHorrorTheme ? "bg-black/50 border-2 border-red-600" : "bg-white"
        )}>
          <p className={cn(
            "text-2xl font-bold",
            isHorrorTheme ? "text-red-500" : "text-gray-800"
          )}>
            もっと会社のことを調べてから出直して下さい
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={cn(
        "text-4xl font-bold mb-8",
        isHorrorTheme ? "text-red-600" : "text-gray-900"
      )}>
        採用情報
      </h1>

      <div className={cn(
        "p-8 rounded-lg shadow-lg",
        isHorrorTheme ? "bg-black/50 border-2 border-red-600" : "bg-white"
      )}>
        <div className="mb-6">
          <p className={cn(
            "text-lg",
            isHorrorTheme ? "text-gray-300" : "text-gray-700"
          )}>
            採用担当の田中です。以下の質問にお答えください。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 0 && (
            <div>
              <label className={cn(
                "block text-lg font-semibold mb-3",
                isHorrorTheme ? "text-red-400" : "text-gray-800"
              )}>
                お名前を教えてください
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={cn(
                  "w-full p-3 rounded-lg border transition-all",
                  isHorrorTheme
                    ? "bg-black/50 border-red-600 text-red-300 focus:border-red-400"
                    : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                )}
                placeholder="山田太郎"
                required
              />
            </div>
          )}

          {step === 1 && (
            <div>
              <label className={cn(
                "block text-lg font-semibold mb-3",
                isHorrorTheme ? "text-red-400" : "text-gray-800"
              )}>
                志望動機を教えてください
              </label>
              <textarea
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                className={cn(
                  "w-full p-3 rounded-lg border transition-all min-h-[120px]",
                  isHorrorTheme
                    ? "bg-black/50 border-red-600 text-red-300 focus:border-red-400"
                    : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                )}
                placeholder="貴社を志望する理由は..."
                required
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <label className={cn(
                "block text-lg font-semibold mb-3",
                isHorrorTheme ? "text-red-400" : "text-gray-800"
              )}>
                入社後の目標を教えてください
              </label>
              <textarea
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className={cn(
                  "w-full p-3 rounded-lg border transition-all min-h-[120px]",
                  isHorrorTheme
                    ? "bg-black/50 border-red-600 text-red-300 focus:border-red-400"
                    : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                )}
                placeholder="入社後は..."
                required
              />
            </div>
          )}

          <button
            type="submit"
            className={cn(
              "w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all",
              isHorrorTheme
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            <Send className="w-5 h-5" />
            <span>{step < 2 ? '次へ' : '送信'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}