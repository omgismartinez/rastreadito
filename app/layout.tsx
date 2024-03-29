import './globals.css'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { font } from '@/lib/font'
import { ThemeProvider } from '@/components/provider'
import SupabaseProvider from '@/components/supabase-provider'
import Toast from '@/components/toast'

export const metadata: Metadata = {
  title: {
    default: 'Rastreadito',
    template: '%s | Rastreadito',
  },
  description: 'Rastreadito te permite seguir el rastro de tus productos cannábicos desde su origen hasta tu mano. Descubre su metadata y conoce toda su historia con esta app.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`
            scrollbar-thin scrollbar-thumb-_gray dark:scrollbar-thumb-_darkText scrollbar-thumb-rounded-full
            bg-_white text-_dark dark:bg-_dark dark:text-_white ${font.className}
          `}>
        <ThemeProvider>
          <SupabaseProvider>
            {children}
            {/* <Analytics /> */}
          </SupabaseProvider>
        </ThemeProvider>
        <Toast />
      </body>
    </html>
  )
}
