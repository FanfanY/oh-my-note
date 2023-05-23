import fs from 'fs'
import React from 'react'
import AppConfig from 'src/config/app'

const layout = async ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>
}

export default layout
export async function generateStaticParams() {
  const categories = fs.readdirSync(AppConfig.docsPath)

  return categories.map((category) => ({ category }))
}
