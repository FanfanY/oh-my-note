import 'animate.css'
import 'normalize.css'
import 'src/style/markdown.css'
import 'src/style/variable.css'
import 'src/style/reset.css'
import 'src/style/global.css'
import { Metadata } from 'next'
import Provider from 'src/components/Provider'
import Header from 'src/components/header'
import AppConfig from 'src/config/app'
import StyledJsxRegistry from 'src/lib/registry'
export const metadata: Metadata = {
  title: 'oh-my-note',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = await getNavigation()
  return (
    <html lang="en">
      <body>
        <StyledJsxRegistry>
          <Provider>
            <Header nav={nav} />
            {children}
          </Provider>
        </StyledJsxRegistry>
      </body>
    </html>
  )
}

async function getNavigation() {
  return AppConfig.navigation
}
