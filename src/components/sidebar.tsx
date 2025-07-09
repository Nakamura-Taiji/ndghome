'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'
import { Home, Building2, History, Heart, User, BookOpen, ShoppingBag, Briefcase, Shield, Coins } from 'lucide-react'

const menuItems = [
  { href: '/', label: 'トップ', icon: Home },
  { href: '/about', label: '会社概要', icon: Building2 },
  { href: '/history', label: '沿革', icon: History },
  { href: '/philosophy', label: '企業理念', icon: Heart },
  { href: '/greeting', label: '代表挨拶', icon: User },
  { href: '/blog', label: 'ブログ', icon: BookOpen },
  { href: '/shop', label: 'オンラインショップ', icon: ShoppingBag },
  { href: '/recruitment', label: '採用情報', icon: Briefcase, conditional: true },
  { href: '/privacy', label: 'プライバシーポリシー', icon: Shield },
]

export function Sidebar() {
  const pathname = usePathname()
  const { showRecruitment, coins, isHorrorTheme } = useApp()

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full w-64 transition-all duration-500",
      isHorrorTheme ? "bg-black border-r-2 border-red-600" : "bg-white border-r border-gray-200"
    )}>
      <div className="p-6">
        <h1 className={cn(
          "text-2xl font-bold mb-8",
          isHorrorTheme ? "text-red-600" : "text-gray-900"
        )}>
          株式会社NDG
        </h1>

        <div className={cn(
          "mb-6 p-3 rounded-lg flex items-center gap-2",
          isHorrorTheme ? "bg-red-900/20 text-red-400" : "bg-blue-50 text-blue-600"
        )}>
          <Coins className="w-5 h-5" />
          <span className="font-semibold">{coins} コイン</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            if (item.conditional && !showRecruitment) return null

            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                  isActive
                    ? isHorrorTheme
                      ? "bg-red-900/30 text-red-400"
                      : "bg-blue-50 text-blue-600"
                    : isHorrorTheme
                    ? "text-gray-400 hover:bg-red-900/10 hover:text-red-400"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}