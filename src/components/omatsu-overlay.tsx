'use client'

import { useApp } from '@/contexts/app-context'
import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

// グローバルな文字マッピングを管理
let globalCharMap = new Map<string, string>()
let isOmatsuActive = false
let observer: MutationObserver | null = null

declare global {
  interface Window {
    omatsuCharMap?: Map<string, string>
    omatsuActive?: boolean
  }
}

export function OmatsuOverlay() {
  const { 
    showOmatsuAnimation, 
    omatsuCompleted, 
    setOmatsuCompleted, 
    globalCharacterPool, 
    setGlobalCharacterPool,
    replacedCharacters,
    setReplacedCharacters
  } = useApp()
  const [isActive, setIsActive] = useState(false)
  const pathname = usePathname()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const allCharsArrayRef = useRef<string[]>([])
  const replacedCountRef = useRef(0)

  useEffect(() => {
    if (showOmatsuAnimation && !isActive) {
      setIsActive(true)
      isOmatsuActive = true
      window.omatsuActive = true
      startOmatsuSystem()
    }
  }, [showOmatsuAnimation])

  // ページが変わったときも即座に適用し、新しい文字を収集
  useEffect(() => {
    if (isOmatsuActive) {
      // 新しいページの文字を収集
      const newChars = new Set(globalCharacterPool)
      collectCurrentPageChars(newChars)
      setGlobalCharacterPool(newChars)
      
      // 新しい文字をグローバルマップに追加
      const omatsuChars = ['お', 'ま', 'つ']
      newChars.forEach(char => {
        if (!globalCharMap.has(char) && char !== 'お' && char !== 'ま' && char !== 'つ') {
          const omatsuChar = omatsuChars[Math.floor(Math.random() * omatsuChars.length)]
          globalCharMap.set(char, omatsuChar)
        }
      })
      window.omatsuCharMap = globalCharMap
      
      setTimeout(() => applyReplacements(), 10)
    }
  }, [pathname])

  const startOmatsuSystem = async () => {
    // サイト全体の文字を収集
    const allChars = new Set<string>()
    await collectAllSiteCharacters(allChars)
    
    // 現在のページの文字も再度収集（ハードコードされた内容では不十分なため）
    collectCurrentPageChars(allChars)
    
    setGlobalCharacterPool(allChars)
    
    // 文字配列をシャッフル
    const charsArray = Array.from(allChars)
    for (let i = charsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[charsArray[i], charsArray[j]] = [charsArray[j], charsArray[i]]
    }
    
    allCharsArrayRef.current = charsArray
    replacedCountRef.current = 0

    if (charsArray.length === 0) {
      setOmatsuCompleted(true)
      return
    }

    // グローバル監視を開始
    setupGlobalObserver()
    
    // 置き換えプロセスを開始
    startReplacementProcess()
  }

  const collectAllSiteCharacters = async (charSet: Set<string>) => {
    // 既知のページ内容
    const pageContents = {
      '/': '株式会社NDGへようこそ 京都から未来を創る不動産企業 私たち株式会社NDGは歴史と伝統の街京都から新しい価値を創造し続ける不動産企業です 大徳寺の地に根ざしお客様一人ひとりのニーズに寄り添いながらより良い住まいと暮らしをご提案いたします 事業内容 不動産売買仲介 不動産賃貸仲介 不動産管理 不動産コンサルティング お知らせ ブログページでクイズに挑戦 オンラインショップがオープン 社員紹介を更新しました トップ 会社概要 沿革 企業理念 代表挨拶 ブログ オンラインショップ 採用情報 プライバシーポリシー コイン',
      '/about': '会社概要 株式会社NDG 設立 資本金 代表取締役 所在地 京都市北区大徳寺 事業内容 不動産業 従業員数 取引銀行 トップ 会社概要 沿革 企業理念 代表挨拶 ブログ オンラインショップ 採用情報 プライバシーポリシー コイン',
      '/history': '沿革 会社の歴史 創業 設立 事業拡大 現在に至る トップ 会社概要 沿革 企業理念 代表挨拶 ブログ オンラインショップ 採用情報 プライバシーポリシー コイン',
      '/philosophy': '企業理念 お客様第一 信頼と実績 地域密着 持続可能な成長 トップ 会社概要 沿革 企業理念 代表挨拶 ブログ オンラインショップ 採用情報 プライバシーポリシー コイン',
      '/greeting': '代表挨拶 ごあいさつ 株式会社NDGのホームページをご覧いただきありがとうございます トップ 会社概要 沿革 企業理念 代表挨拶 ブログ オンラインショップ 採用情報 プライバシーポリシー コイン',
      '/blog': 'ブログ 最新記事 不動産情報 京都の魅力 クイズ トップ 会社概要 沿革 企業理念 代表挨拶 ブログ オンラインショップ 採用情報 プライバシーポリシー コイン',
      '/shop': 'オンラインショップ 現在の所持コイン 各商品は100コインで購入できます 履歴書 就職活動に必須のアイテム うちわ 京都の夏を涼しく過ごす ボールペン 書類記入に便利な一品 ガスマスク 特殊な状況に備えて 購入する 購入済み 購入履歴 トップ 会社概要 沿革 企業理念 代表挨拶 ブログ オンラインショップ 採用情報 プライバシーポリシー コイン',
      '/recruitment': '採用情報 新卒採用 中途採用 インターンシップ 応募要項 トップ 会社概要 沿革 企業理念 代表挨拶 ブログ オンラインショップ 採用情報 プライバシーポリシー コイン',
      '/privacy': 'プライバシーポリシー 個人情報の取り扱い 利用目的 第三者提供 トップ 会社概要 沿革 企業理念 代表挨拶 ブログ オンラインショップ 採用情報 プライバシーポリシー コイン'
    }

    // 全ページの内容から文字を抽出（「お」「ま」「つ」は除外）
    Object.values(pageContents).forEach(content => {
      for (let i = 0; i < content.length; i++) {
        const char = content[i]
        if (char.match(/[あ-んア-ンa-zA-Z0-9一-龯]/) && char !== 'お' && char !== 'ま' && char !== 'つ') {
          charSet.add(char)
        }
      }
    })

    // 現在のページからも追加収集
    collectCurrentPageChars(charSet)
  }

  const collectCurrentPageChars = (charSet: Set<string>) => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (node.parentNode && 
              node.parentNode.nodeName !== 'SCRIPT' &&
              node.parentNode.nodeName !== 'STYLE' &&
              node.textContent?.trim() !== '') {
            return NodeFilter.FILTER_ACCEPT
          }
          return NodeFilter.FILTER_SKIP
        }
      }
    )

    let currentNode = walker.nextNode()
    while (currentNode) {
      const text = currentNode.textContent || ''
      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        if (char.match(/[あ-んア-ンa-zA-Z0-9一-龯]/) && char !== 'お' && char !== 'ま' && char !== 'つ') {
          charSet.add(char)
        }
      }
      currentNode = walker.nextNode()
    }
  }

  const setupGlobalObserver = () => {
    if (observer) {
      observer.disconnect()
    }

    observer = new MutationObserver(() => {
      if (isOmatsuActive) {
        setTimeout(() => applyReplacements(), 5)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    })
  }

  const startReplacementProcess = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      const allChars = allCharsArrayRef.current
      const replacedCount = replacedCountRef.current

      if (replacedCount < allChars.length) {
        const charToReplace = allChars[replacedCount]
        
        // グローバルマップに追加（ランダムな「お」「ま」「つ」）
        const omatsuChars = ['お', 'ま', 'つ']
        const omatsuChar = omatsuChars[Math.floor(Math.random() * omatsuChars.length)]
        globalCharMap.set(charToReplace, omatsuChar)
        window.omatsuCharMap = globalCharMap

        // 置き換え済みセットに追加
        const newReplacedChars = new Set(replacedCharacters)
        newReplacedChars.add(charToReplace)
        setReplacedCharacters(newReplacedChars)

        // 即座に適用
        applyReplacements()

        replacedCountRef.current++
      } else {
        // 全ての文字が置き換わったかを確認
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setOmatsuCompleted(true)
      }
    }, 20)
  }

  const applyReplacements = () => {
    if (!isOmatsuActive || globalCharMap.size === 0) return

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (node.parentNode && 
              node.parentNode.nodeName !== 'SCRIPT' &&
              node.parentNode.nodeName !== 'STYLE' &&
              node.textContent?.trim() !== '') {
            return NodeFilter.FILTER_ACCEPT
          }
          return NodeFilter.FILTER_SKIP
        }
      }
    )

    let currentNode = walker.nextNode()
    while (currentNode) {
      const textNode = currentNode as Text
      const originalText = textNode.textContent || ''
      let newText = ''
      let hasChanges = false

      for (let i = 0; i < originalText.length; i++) {
        const char = originalText[i]
        // 既に「お」「ま」「つ」の場合は変更しない
        if (char === 'お' || char === 'ま' || char === 'つ') {
          newText += char
        } else if (globalCharMap.has(char)) {
          newText += globalCharMap.get(char)
          hasChanges = true
        } else {
          newText += char
        }
      }

      if (hasChanges && newText !== originalText) {
        textNode.textContent = newText
      }

      currentNode = walker.nextNode()
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  if (!isActive) return null

  return null
}