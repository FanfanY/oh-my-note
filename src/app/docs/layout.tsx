import fs from 'fs'
import path from 'path'
import React from 'react'
import AppConfig from 'src/config/app'

const layout = async ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>
}

export default layout
export async function generateStaticParams() {
  const entry = path.join(process.cwd(), AppConfig.docsPath)
  const categories = fs.readdirSync(entry)

  return categories.map((category) => ({ category }))
}
