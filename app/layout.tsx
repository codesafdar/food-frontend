import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import App from './app'
const inter = Inter({ subsets: ['latin'] })
import ReduxProvider from '@/redux/provider'


export const metadata: Metadata = {
  title: 'Food Lovers',
  description: 'Generated by Safdar',
}

export interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <App>
            {children}
          </App>
        </ReduxProvider>
      </body>
    </html>
  )
}
