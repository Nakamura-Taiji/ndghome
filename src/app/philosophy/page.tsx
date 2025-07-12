'use client'

import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'
import { useState, useRef } from 'react'

export default function PhilosophyPage() {
  const { isHorrorTheme, purchases, addItem } = useApp()
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [showGlasses, setShowGlasses] = useState(true)
  const hasNightVision = purchases.includes('暗視メガネ')
  const [showMessage, setShowMessage] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isHorrorTheme) return
    setIsDragging(true)
    const rect = dragRef.current?.getBoundingClientRect()
    if (rect) {
      setDragPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isHorrorTheme) return
    e.preventDefault()
    const container = dragRef.current?.parentElement
    if (container && dragRef.current) {
      const containerRect = container.getBoundingClientRect()
      const newX = e.clientX - containerRect.left - dragPosition.x
      const newY = e.clientY - containerRect.top - dragPosition.y
      
      dragRef.current.style.transform = `translate(${newX}px, ${newY}px)`
      dragRef.current.style.position = 'relative'
      dragRef.current.style.zIndex = '10'
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // タッチイベント用のハンドラー
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isHorrorTheme) return
    setIsDragging(true)
    const touch = e.touches[0]
    const rect = dragRef.current?.getBoundingClientRect()
    if (rect) {
      setDragPosition({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isHorrorTheme) return
    e.preventDefault()
    const touch = e.touches[0]
    const container = dragRef.current?.parentElement
    if (container && dragRef.current) {
      const containerRect = container.getBoundingClientRect()
      const newX = touch.clientX - containerRect.left - dragPosition.x
      const newY = touch.clientY - containerRect.top - dragPosition.y
      
      dragRef.current.style.transform = `translate(${newX}px, ${newY}px)`
      dragRef.current.style.position = 'relative'
      dragRef.current.style.zIndex = '10'
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleGlassesClick = () => {
    setShowGlasses(false)
    setShowMessage(true)
    addItem('暗視メガネ')
    setTimeout(() => {
      setShowMessage(false)
    }, 1000)
  }

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
        
        <div className="relative">
          <div 
            ref={dragRef}
            className={cn(
              "p-6 rounded-lg text-center transition-all duration-200 relative",
              isHorrorTheme ? "bg-red-900/20 border border-red-600 cursor-move z-10" : "bg-green-50",
              isDragging && "shadow-2xl scale-105 z-20"
            )}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
          
          {/* メガネアイコン - 誠実欄の後ろに隠れている */}
          {isHorrorTheme && showGlasses && !hasNightVision && (
            <div 
              className="absolute top-6 left-6 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors z-0"
              onClick={handleGlassesClick}
              title="メガネを取る"
            >
              <span className="text-white text-lg">👓</span>
            </div>
          )}
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

      {/* 暗視メガネ獲得メッセージ */}
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-2xl animate-pulse">
            暗視メガネを獲得しました！
          </div>
        </div>
      )}
    </div>
  )
}