import './globals.css'
import { Metadata } from 'next'
import { Poppins as Font } from 'next/font/google'
import { ThemeProvider } from '@/components/provider'

const font = Font({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Rastreadito',
    template: '%s | Rastreadito',
  },
  description: 'Rastreadito te permite seguir el rastro de tus productos cannábicos desde su origen hasta tu mano. Descubre su metadata y conoce toda su historia con esta app.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`bg-_white text-_dark dark:bg-_dark dark:text-_white ${font.variable} font-sans`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
