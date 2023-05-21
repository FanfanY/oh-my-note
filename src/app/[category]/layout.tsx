import fs from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'
import React from 'react'
import styles from 'src/app/[category]/layout.module.scss'
import SubNav from 'src/app/[category]/subNav'
import AppConfig from 'src/config/app'
import { deleteSuffix, getLabelFromMarkdown, isDirectory } from 'src/lib/util'

const layout = async ({ children, params }: { children: React.ReactNode; params: { category: string } }) => {
  const category = AppConfig.routes.find(({ path }) => path.replaceAll('/', '') === params.category)

  if (category === undefined) {
    notFound()
  }
  const subNav = await getSubNav(category)

  return (
    <main style={{ width: '100vw', maxWidth: '100vw' }}>
      <div className={styles['category-container']}>
        <SubNav mode="inline" items={subNav} />
        {children}
        <div className={styles['sub-nav-container']} />
      </div>
    </main>
  )
}

export default layout

async function getSubNav<T extends (typeof AppConfig.routes)[0]>(category: T) {
  const children = category.children
  const categoryPath = category.path
  const subNav = children.map(({ path, title }) => {
    const result = {
      label: title,
      key: join(categoryPath, deleteSuffix(path)),
      children: undefined as undefined | { label: string; key: string }[],
    }
    const dirPath = join(AppConfig.docsPath, path)
    let children
    if (isDirectory(dirPath)) {
      const filenames = fs.readdirSync(dirPath)
      children = filenames.map((filePath) => {
        const markdownPath = join(dirPath, filePath)
        const label = getLabelFromMarkdown(markdownPath) || filePath
        return { label, key: join(categoryPath, path, deleteSuffix(filePath)) }
      })
      result.children = children
    }

    return result
  })
  return subNav
}

function getDirectories() {
  return new Promise<Array<string[]>>((resolve, reject) => {
    fs.readdir(AppConfig.docsPath, (error, data) => {
      const directories: Array<string[]> = []
      if (error) reject(directories)

      data.forEach((file) => {
        const filePath = join(AppConfig.docsPath, file)
        if (fs.statSync(filePath).isDirectory()) {
          const dir = file
          const dirs = fs.readdirSync(filePath)

          dirs.forEach((file) => {
            directories.push([dir, deleteSuffix(file)])
          })
        } else {
          directories.push([deleteSuffix(file)])
        }
      })
      resolve(directories)
    })
  })
}

export async function generateStaticParams() {
  const directories = await getDirectories()
  const slugs = directories.map((dir) => ({ slug: dir }))

  return slugs
}
