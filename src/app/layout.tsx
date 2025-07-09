import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/sidebar'
import { AppProvider } from '@/contexts/app-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '株式会社NDG',
  description: '京都府京都市北区の不動産企業',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AppProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 transition-all duration-500">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  )
}