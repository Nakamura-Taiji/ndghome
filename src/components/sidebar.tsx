'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'
import { Home, Building2, History, Heart, User, BookOpen, ShoppingBag, Briefcase, Shield, Coins, Menu, X } from 'lucide-react'

const menuItems = [
  { href: '/', label: 'トップ', icon: Home },
  { href: '/about', label: '会社概要', icon: Building2 },
  { href: '/history', label: '沿革', icon: History },
  { href: '/philosophy', label: '理念', icon: Heart },
  { href: '/greeting', label: '代表挨拶', icon: User },
  { href: '/blog', label: 'ブログ', icon: BookOpen },
  { href: '/shop', label: 'オンラインショップ', icon: ShoppingBag },
  { href: '/recruitment', label: '採用情報', icon: Briefcase, conditional: true },
  { href: '/privacy', label: 'プライバシーポリシー', icon: Shield },
]

export function Sidebar() {
  const pathname = usePathname()
  const { showRecruitment, coins, isHorrorTheme } = useApp()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      {/* Mobile Header */}
      <header className={cn(
        "md:hidden fixed top-0 left-0 right-0 z-50 p-4 border-b",
        isHorrorTheme ? "bg-black border-red-600" : "bg-white border-gray-200"
      )}>
        <div className="flex items-center justify-between">
          <h1 className={cn(
            "text-lg font-bold",
            isHorrorTheme ? "text-red-600" : "text-gray-900"
          )}>
            株式会社NDG
          </h1>
          
          <div className="flex items-center gap-3">
            {/* Coins display for mobile */}
            <div className={cn(
              "px-2 py-1 rounded-lg flex items-center gap-1 text-sm",
              isHorrorTheme ? "bg-red-900/20 text-red-400" : "bg-blue-50 text-blue-600"
            )}>
              <Coins className="w-4 h-4" />
              <span className="font-semibold">{coins}</span>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg",
                isHorrorTheme ? "text-red-400 hover:bg-red-900/20" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 h-full w-64 transition-all duration-300 z-50",
        "md:left-0", // Always visible on desktop
        isMobileMenuOpen ? "left-0" : "-left-64", // Slide in/out on mobile
        isHorrorTheme ? "bg-black border-r-2 border-red-600" : "bg-white border-r border-gray-200"
      )}>
        <div className="p-6">
          {/* Desktop Header */}
          <div className="hidden md:block">
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
          </div>

          {/* Mobile Header in Sidebar */}
          <div className="md:hidden mb-6 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className={cn(
                "text-xl font-bold",
                isHorrorTheme ? "text-red-600" : "text-gray-900"
              )}>
                株式会社NDG
              </h1>
              <button
                onClick={closeMobileMenu}
                className={cn(
                  "p-1 rounded",
                  isHorrorTheme ? "text-red-400" : "text-gray-600"
                )}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className={cn(
              "p-3 rounded-lg flex items-center gap-2",
              isHorrorTheme ? "bg-red-900/20 text-red-400" : "bg-blue-50 text-blue-600"
            )}>
              <Coins className="w-5 h-5" />
              <span className="font-semibold">{coins} コイン</span>
            </div>
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
                  onClick={closeMobileMenu}
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
                  <span className="text-sm md:text-base">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}