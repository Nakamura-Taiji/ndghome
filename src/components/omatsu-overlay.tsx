'use client'

import { useApp } from '@/contexts/app-context'
import { useEffect, useState } from 'react'

export function OmatsuOverlay() {
  const { showOmatsuAnimation } = useApp()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (showOmatsuAnimation) {
      setIsActive(true)
      replaceTextRandomly()
    }
  }, [showOmatsuAnimation])

  const replaceTextRandomly = () => {
    const omatsuChars = ['お', 'ま', 'つ']
    const textNodes: Text[] = []
    
    // すべてのテキストノードを収集
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
      textNodes.push(currentNode as Text)
      currentNode = walker.nextNode()
    }

    // 各テキストノードの文字を個別に収集
    const allChars: { node: Text; index: number; originalChar: string }[] = []
    textNodes.forEach(node => {
      const text = node.textContent || ''
      for (let i = 0; i < text.length; i++) {
        if (text[i].match(/[あ-んア-ンa-zA-Z0-9一-龯]/)) {
          allChars.push({ node, index: i, originalChar: text[i] })
        }
      }
    })

    // 文字をランダムに置き換え
    let replacedCount = 0
    const totalChars = allChars.length
    
    if (totalChars === 0) return

    // 文字をシャッフル
    for (let i = allChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allChars[i], allChars[j]] = [allChars[j], allChars[i]]
    }

    const interval = setInterval(() => {
      if (replacedCount < totalChars) {
        const charToReplace = allChars[replacedCount]
        const randomOmatsuChar = omatsuChars[Math.floor(Math.random() * omatsuChars.length)]
        
        const currentText = charToReplace.node.textContent || ''
        const newText = currentText.substring(0, charToReplace.index) + 
                       randomOmatsuChar + 
                       currentText.substring(charToReplace.index + 1)
        
        charToReplace.node.textContent = newText
        replacedCount++
      } else {
        clearInterval(interval)
      }
    }, 100) // 0.1秒間隔
  }

  if (!isActive) return null

  return null // オーバーレイは表示しないが、エフェクトは実行
}