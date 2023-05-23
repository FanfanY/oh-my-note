import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import React from 'react'
import styles from 'src/app/docs/[category]/[...slug]/page.module.scss'
import Menu from 'src/components/menu'
import AppConfig from 'src/config/app'
import { deleteSuffix, getLabelFromMarkdown } from 'src/lib/util'

const layout = async ({
  params: { category },
  children,
}: {
  params: { category: string }
  children: React.ReactNode
}) => {
  let categoryMenu

  try {
    categoryMenu = await traverseDirectory(category)
  } catch (error) {
    notFound()
  }
  return (
    <section className={styles['category-container']}>
      <div className={styles['sub-nav-container']}>
        <Menu items={categoryMenu} mode="inline" />
      </div>
      {children}
    </section>
  )
}

export default layout

async function traverseDirectory(directory: string): Promise<Menu[]> {
  function traverseDir(dir: string): Menu[] {
    const files = fs.readdirSync(dir)

    const result = files.map((file) => {
      const filePath = path.join(dir, file)
      const stats = fs.statSync(filePath)
      const label = deleteSuffix(file)
      const key = deleteSuffix(filePath)

      if (stats.isDirectory()) {
        const children = traverseDir(filePath)
        return { label, key, children }
      } else {
        return { label: getLabelFromMarkdown(filePath) || label, key, children: undefined }
      }
    })

    return result
  }

  return traverseDir(path.join(AppConfig.docsPath, directory))
}

function getFileLists(directory: string) {
  const fileList: Array<string[]> = []

  function traverseDir(dir: string, prefix = '') {
    const files = fs.readdirSync(dir)

    files.forEach((file) => {
      const filePath = path.join(dir, file)
      const stats = fs.statSync(filePath)

      if (stats.isDirectory()) {
        traverseDir(filePath, path.join(prefix, file))
      } else {
        fileList.push([...prefix.split('/'), deleteSuffix(file)])
      }
    })
  }

  traverseDir(directory)

  return fileList
}

export async function generateStaticParams({ params: { category } }: { params: { category: string } }) {
  const fileLists = getFileLists(path.join(AppConfig.docsPath, category))

  const slugs = fileLists.map((fileList) => ({ slug: fileList.filter((name) => name !== ''), category }))

  return slugs
}
