'use client'

import { useState, useEffect } from 'react'
import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'
import { Users, Trophy, Eye } from 'lucide-react'
import { ImageWithFallback } from '@/components/image-with-fallback'

const quizQuestions = [
  {
    id: 1,
    question: '大徳寺の創建は何年？',
    options: ['1315年', '1319年', '1325年', '1330年'],
    correctAnswer: 0 // 1315年
  },
  {
    id: 2,
    question: '大徳寺を開山したのは誰？',
    options: ['宗峰妙超', '一休宗純', '千利休', '沢庵宗彭'],
    correctAnswer: 0 // 宗峰妙超（大燈国師）
  },
  {
    id: 3,
    question: '大徳寺の山号は？',
    options: ['龍宝山', '瑞龍山', '大徳山', '金龍山'],
    correctAnswer: 0 // 龍宝山（りゅうほうざん）
  },
  {
    id: 4,
    question: '大徳寺の塔頭寺院の数は約何ヶ所？',
    options: ['15ヶ所', '20ヶ所', '24ヶ所', '30ヶ所'],
    correctAnswer: 2 // 24ヶ所（境内塔頭）
  },
]

export default function BlogPage() {
  const { addCoins, showNightWalk, setShowNightWalk, isHorrorTheme, setIsHorrorTheme } = useApp()
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [quizResults, setQuizResults] = useState<{ [key: number]: { correct: boolean, selectedOption: number } }>({})
  const [activeSection, setActiveSection] = useState<'quiz' | 'staff'>('quiz')

  // セッションストレージから回答済み質問を読み込み
  useEffect(() => {
    const savedAnswers = sessionStorage.getItem('quiz-answered')
    const savedResults = sessionStorage.getItem('quiz-results')
    if (savedAnswers) {
      setAnsweredQuestions(JSON.parse(savedAnswers))
    }
    if (savedResults) {
      setQuizResults(JSON.parse(savedResults))
    }
  }, [])

  const handleQuizAnswer = (questionId: number, selectedOptionIndex: number) => {
    if (!answeredQuestions.includes(questionId)) {
      const question = quizQuestions.find(q => q.id === questionId)
      if (question) {
        const isCorrect = selectedOptionIndex === question.correctAnswer
        
        // 正解の場合のみコインを付与
        if (isCorrect) {
          addCoins(50)
        }
        
        const newAnswered = [...answeredQuestions, questionId]
        const newResults = {
          ...quizResults,
          [questionId]: { correct: isCorrect, selectedOption: selectedOptionIndex }
        }
        
        setAnsweredQuestions(newAnswered)
        setQuizResults(newResults)
        
        // セッションストレージに保存
        sessionStorage.setItem('quiz-answered', JSON.stringify(newAnswered))
        sessionStorage.setItem('quiz-results', JSON.stringify(newResults))
      }
    }
  }

  const handleSecretButtonClick = () => {
    setIsHorrorTheme(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-0">
      <h1 className={cn(
        "text-4xl font-bold mb-8",
        isHorrorTheme ? "text-red-600" : "text-gray-900"
      )}>
        ブログ
      </h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveSection('quiz')}
          className={cn(
            "px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all",
            activeSection === 'quiz'
              ? isHorrorTheme
                ? "bg-red-600 text-white"
                : "bg-blue-600 text-white"
              : isHorrorTheme
              ? "bg-red-900/20 text-red-400 hover:bg-red-900/30"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          <Trophy className="w-5 h-5" />
          大徳寺クイズ
        </button>
        <button
          onClick={() => setActiveSection('staff')}
          className={cn(
            "px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all",
            activeSection === 'staff'
              ? isHorrorTheme
                ? "bg-red-600 text-white"
                : "bg-blue-600 text-white"
              : isHorrorTheme
              ? "bg-red-900/20 text-red-400 hover:bg-red-900/30"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          <Users className="w-5 h-5" />
          社員紹介
        </button>
      </div>

      {activeSection === 'quiz' && (
        <div className="space-y-6">
          <div className={cn(
            "p-6 rounded-lg",
            isHorrorTheme ? "bg-red-900/20 border border-red-600" : "bg-blue-50"
          )}>
            <p className={cn(
              "text-lg font-semibold",
              isHorrorTheme ? "text-red-400" : "text-blue-800"
            )}>
              クイズに答えて50コインをゲット！
            </p>
            <p className={cn(
              "text-sm mt-2",
              isHorrorTheme ? "text-gray-400" : "text-gray-600"
            )}>
              各問題は1回のみ回答可能です
            </p>
          </div>

          {quizQuestions.map((q) => (
            <div
              key={q.id}
              className={cn(
                "p-6 rounded-lg shadow-lg",
                isHorrorTheme ? "bg-black/50 border border-red-600" : "bg-white"
              )}
            >
              <h3 className={cn(
                "text-xl font-semibold mb-4",
                isHorrorTheme ? "text-red-500" : "text-gray-800"
              )}>
                問題{q.id}: {q.question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((option, index) => {
                  const isAnswered = answeredQuestions.includes(q.id)
                  const result = quizResults[q.id]
                  const isSelected = result?.selectedOption === index
                  const isCorrect = index === q.correctAnswer
                  
                  return (
                    <button
                      key={option}
                      onClick={() => handleQuizAnswer(q.id, index)}
                      disabled={isAnswered}
                      className={cn(
                        "p-3 rounded-lg text-left transition-all",
                        isAnswered
                          ? isSelected
                            ? isCorrect
                              ? isHorrorTheme
                                ? "bg-green-900/30 text-green-400 border-2 border-green-500"
                                : "bg-green-100 text-green-700 border-2 border-green-500"
                              : isHorrorTheme
                              ? "bg-red-900/30 text-red-400 border-2 border-red-500"
                              : "bg-red-100 text-red-700 border-2 border-red-500"
                            : isCorrect
                            ? isHorrorTheme
                              ? "bg-green-900/20 text-green-500 border border-green-600"
                              : "bg-green-50 text-green-600 border border-green-400"
                            : isHorrorTheme
                            ? "bg-red-900/10 text-gray-500 cursor-not-allowed"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : isHorrorTheme
                          ? "bg-red-900/20 text-red-300 hover:bg-red-900/30"
                          : "bg-gray-50 hover:bg-blue-50 text-gray-700"
                      )}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
              {answeredQuestions.includes(q.id) && (
                <div className="mt-3 text-sm">
                  {quizResults[q.id]?.correct ? (
                    <p className={cn(
                      "font-semibold",
                      isHorrorTheme ? "text-green-400" : "text-green-600"
                    )}>
                      ✓ 正解！+50コイン獲得！
                    </p>
                  ) : (
                    <p className={cn(
                      "font-semibold",
                      isHorrorTheme ? "text-red-400" : "text-red-600"
                    )}>
                      ✗ 不正解...コインは獲得できませんでした
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeSection === 'staff' && (
        <div className="space-y-8">
          <div className={cn(
            "p-6 rounded-lg shadow-lg",
            isHorrorTheme ? "bg-black/50 border border-red-600" : "bg-white"
          )}>
            <h3 className={cn(
              "text-2xl font-semibold mb-4",
              isHorrorTheme ? "text-red-500" : "text-gray-800"
            )}>
              山田 太郎
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <ImageWithFallback 
                src="/otoko.jpg" 
                alt="山田太郎" 
                fallbackText="山田太郎"
                isHorrorTheme={isHorrorTheme}
              />
              <ImageWithFallback 
                src="/goif.jpg" 
                alt="趣味: ゴルフ" 
                fallbackText="趣味: ゴルフ"
                isHorrorTheme={isHorrorTheme}
              />
            </div>
            <p className={cn(
              isHorrorTheme ? "text-gray-300" : "text-gray-600"
            )}>
              営業部所属。お客様の夢の実現をサポートすることが私の使命です。
              休日はゴルフで心身をリフレッシュしています。
            </p>
          </div>

          <div className={cn(
            "p-6 rounded-lg shadow-lg",
            isHorrorTheme ? "bg-black/50 border border-red-600" : "bg-white"
          )}>
            <h3 className={cn(
              "text-2xl font-semibold mb-4",
              isHorrorTheme ? "text-red-500" : "text-gray-800"
            )}>
              佐藤 花子
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <ImageWithFallback 
                src="/onna.jpg" 
                alt="佐藤花子" 
                fallbackText="佐藤花子"
                isHorrorTheme={isHorrorTheme}
              />
              <div className="relative">
                <ImageWithFallback 
                  src={showNightWalk ? "/yoru.jpg" : "/hiru.jpg"}
                  alt={`趣味: ${showNightWalk ? '夜の散歩' : '昼の散歩'}`}
                  fallbackText={`趣味: ${showNightWalk ? '夜の散歩' : '昼の散歩'}`}
                  isHorrorTheme={isHorrorTheme}
                />
                {showNightWalk && (
                  <button
                    onClick={handleSecretButtonClick}
                    className={cn(
                      "absolute bottom-2 right-2 w-8 h-8 rounded-full transition-all",
                      isHorrorTheme
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-700 hover:bg-gray-800"
                    )}
                  >
                    <Eye className="w-4 h-4 text-white mx-auto" />
                  </button>
                )}
              </div>
            </div>
            <p className={cn(
              isHorrorTheme ? "text-gray-300" : "text-gray-600"
            )}>
              管理部所属。物件管理のスペシャリストとして、
              オーナー様の大切な資産をお守りしています。
              {showNightWalk ? '夜の静寂な街並みを歩くことが日課です。' : '昼休みには京都の街を散策することが楽しみです。'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}