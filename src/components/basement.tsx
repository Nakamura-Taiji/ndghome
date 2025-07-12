'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, X, Coins, FileText } from 'lucide-react'

type Direction = 'front' | 'right' | 'back' | 'left'

interface BasementProps {
  isOpen: boolean
  onClose: () => void
}

export function Basement({ isOpen, onClose }: BasementProps) {
  const { addCoins, purchases } = useApp()
  const router = useRouter()
  const [currentDirection, setCurrentDirection] = useState<Direction>('front')
  const [drawerStates, setDrawerStates] = useState({
    upper: false,
    lower: false
  })
  const [collectedItems, setCollectedItems] = useState({
    coins: false,
    document: false
  })
  const [showGasEffect, setShowGasEffect] = useState(false)
  const [gasText, setGasText] = useState('')

  const hasGasMask = purchases.includes('ガスマスク')

  useEffect(() => {
    if (showGasEffect) {
      const text = 'うううぅぅぅ……'
      let index = 0
      const interval = setInterval(() => {
        if (index < text.length) {
          setGasText(prev => prev + text[index])
          index++
        } else {
          clearInterval(interval)
        }
      }, 200)
      return () => clearInterval(interval)
    }
  }, [showGasEffect])

  if (!isOpen) return null

  if (showGasEffect) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-white text-4xl font-bold text-center">
          {gasText}
        </div>
      </div>
    )
  }

  const rotateView = (direction: 'left' | 'right') => {
    const directions: Direction[] = ['front', 'right', 'back', 'left']
    const currentIndex = directions.indexOf(currentDirection)
    
    if (direction === 'left') {
      const newIndex = (currentIndex - 1 + directions.length) % directions.length
      setCurrentDirection(directions[newIndex])
    } else {
      const newIndex = (currentIndex + 1) % directions.length
      setCurrentDirection(directions[newIndex])
    }
  }

  const handleExitDoor = () => {
    onClose()
    router.push('/')
  }

  const handleDrawerClick = (drawer: 'upper' | 'lower') => {
    if (drawer === 'upper' && !hasGasMask && !drawerStates.upper) {
      setShowGasEffect(true)
      return
    }
    
    setDrawerStates(prev => ({
      ...prev,
      [drawer]: !prev[drawer]
    }))
  }

  const handleCoinCollect = () => {
    if (!collectedItems.coins) {
      addCoins(100)
      setCollectedItems(prev => ({ ...prev, coins: true }))
    }
  }

  const handleDocumentDownload = () => {
    if (!collectedItems.document && hasGasMask) {
      const link = document.createElement('a')
      link.href = '/documents/secret-document.pdf'
      link.download = 'secret-document.pdf'
      link.click()
      setCollectedItems(prev => ({ ...prev, document: true }))
    }
  }

  const renderWall = () => {
    switch (currentDirection) {
      case 'front':
        return (
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat relative bg-stone-800"
            style={{ backgroundImage: 'url(/basement/wall-front.png)' }}
          >
            {/* 軽い暗いオーバーレイ（クリック可能エリア以外） */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* 扉の取っ手クリックエリア（画像の中央右寄り、扉の取っ手位置） */}
            <button
              onClick={handleExitDoor}
              className="absolute z-10 w-16 h-24"
              style={{
                right: '45%',
                top: '45%',
                transform: 'translateY(-50%)'
              }}
            />
            
            {/* 扉全体のクリックエリア（サブエリア） */}
            <button
              onClick={handleExitDoor}
              className="absolute z-5"
              style={{
                left: '35%',
                right: '35%',
                top: '20%',
                bottom: '30%'
              }}
            />
            
          </div>
        )
      
      case 'right':
        return (
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat relative bg-stone-800"
            style={{ backgroundImage: 'url(/basement/wall-right.png)' }}
          >
            {/* 軽い暗いオーバーレイ */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* 上の引き出しクリックエリア（グリッド位置: 赤線40%-60%, 青線65%-80%） */}
            <button
              onClick={() => handleDrawerClick('upper')}
              className="absolute z-10"
              style={{
                left: '40%',
                width: '20%',
                top: '65%',
                height: '15%'
              }}
            />
            
            {/* 下の引き出しクリックエリア（グリッド位置: 赤線40%-60%, 青線85%-100%） */}
            <button
              onClick={() => handleDrawerClick('lower')}
              className="absolute z-10"
              style={{
                left: '40%',
                width: '20%',
                top: '85%',
                height: '15%'
              }}
            />
            
            {/* アイテム表示エリア（引き出しが開いた時） */}
            {drawerStates.upper && hasGasMask && !collectedItems.document && (
              <button
                onClick={handleDocumentDownload}
                className="absolute z-20 p-3 bg-yellow-400/90 hover:bg-yellow-300/90 rounded-lg shadow-2xl animate-pulse border-2 border-yellow-600"
                style={{
                  left: '50%',
                  top: '72%',
                  transform: 'translateX(-50%)'
                }}
                title="書類を取る"
              >
                <FileText className="w-8 h-8 text-gray-800" />
              </button>
            )}
            
            {drawerStates.lower && !collectedItems.coins && (
              <button
                onClick={handleCoinCollect}
                className="absolute z-20 p-3 bg-yellow-400/90 hover:bg-yellow-300/90 rounded-full shadow-2xl animate-pulse border-2 border-yellow-600"
                style={{
                  left: '50%',
                  top: '87%',
                  transform: 'translateX(-50%)'
                }}
                title="コインを取る"
              >
                <Coins className="w-8 h-8 text-yellow-800" />
              </button>
            )}
          </div>
        )
      
      case 'back':
        return (
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center justify-center relative bg-stone-800"
            style={{ backgroundImage: 'url(/basement/wall-back.png)' }}
          >
            {/* 暗いオーバーレイ */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )
        
      case 'left':
        return (
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center justify-center relative bg-stone-800"
            style={{ backgroundImage: 'url(/basement/wall-left.png)' }}
          >
            {/* 暗いオーバーレイ */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )
      
      default:
        return (
          <div className="w-full h-full bg-stone-800 flex items-center justify-center">
            <div className="text-stone-400 text-lg">古い石壁</div>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full h-full bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-gray-800 to-transparent opacity-50"></div>
        <div className="absolute top-0 w-full h-1/4 bg-gradient-to-b from-gray-700 to-transparent opacity-30"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          {renderWall()}
        </div>

        <button
          onClick={() => rotateView('left')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-4 bg-black/50 hover:bg-black/70 rounded-full text-white"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <button
          onClick={() => rotateView('right')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 bg-black/50 hover:bg-black/70 rounded-full text-white"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

      </div>
    </div>
  )
}