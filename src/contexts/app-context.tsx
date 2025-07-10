'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AppContextType {
  coins: number
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean
  purchases: string[]
  makePurchase: (item: string) => boolean
  showRecruitment: boolean
  setShowRecruitment: (show: boolean) => void
  isHorrorTheme: boolean
  setIsHorrorTheme: (theme: boolean) => void
  showNightWalk: boolean
  setShowNightWalk: (show: boolean) => void
  showOmatsuAnimation: boolean
  setShowOmatsuAnimation: (show: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [coins, setCoins] = useState(0)
  const [purchases, setPurchases] = useState<string[]>([])
  const [showRecruitment, setShowRecruitment] = useState(false)
  const [isHorrorTheme, setIsHorrorTheme] = useState(false)
  const [showNightWalk, setShowNightWalk] = useState(false)
  const [showOmatsuAnimation, setShowOmatsuAnimation] = useState(false)

  useEffect(() => {
    // すべての状態をリセット（サイト訪問のたびに初期化）
    setCoins(0)
    setPurchases([])
    setShowRecruitment(false)
    setIsHorrorTheme(false)
    setShowNightWalk(false)
    setShowOmatsuAnimation(false)
    
    // ホラーテーマのクラスを削除
    document.documentElement.classList.remove('horror-theme')
  }, [])

  useEffect(() => {
    if (purchases.includes('履歴書') && purchases.includes('ボールペン')) {
      setShowRecruitment(true)
    }
    if (purchases.includes('うちわ')) {
      setShowOmatsuAnimation(true)
    }
  }, [purchases])

  useEffect(() => {
    if (isHorrorTheme) {
      document.documentElement.classList.add('horror-theme')
    } else {
      document.documentElement.classList.remove('horror-theme')
    }
  }, [isHorrorTheme])

  const addCoins = (amount: number) => {
    setCoins(prev => prev + amount)
  }

  const spendCoins = (amount: number) => {
    if (coins >= amount) {
      setCoins(prev => prev - amount)
      return true
    }
    return false
  }

  const makePurchase = (item: string) => {
    if (spendCoins(100)) {
      setPurchases(prev => [...prev, item])
      return true
    }
    return false
  }

  return (
    <AppContext.Provider value={{
      coins,
      addCoins,
      spendCoins,
      purchases,
      makePurchase,
      showRecruitment,
      setShowRecruitment,
      isHorrorTheme,
      setIsHorrorTheme,
      showNightWalk,
      setShowNightWalk,
      showOmatsuAnimation,
      setShowOmatsuAnimation
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}