import 'normalize.css'
import 'src/style/markdown.css'
import 'src/style/variable.css'
import 'src/style/reset.css'
import 'src/style/global.css'
import 'src/style/fonts.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from 'src/components/nav'
import AppConfig from 'src/config/app'
import StyledJsxRegistry from 'src/lib/registry'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'oh-my-note',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = await getNavigation()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation nav={nav} />
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  )
}

async function getNavigation() {
  return AppConfig.navigation
}
