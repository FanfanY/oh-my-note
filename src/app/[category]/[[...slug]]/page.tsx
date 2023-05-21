import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import React from 'react'
import Default from 'src/app/[category]/[[...slug]]/default'
import RenderMarkdown from 'src/app/[category]/[[...slug]]/renderMarkdown'
import styles from 'src/app/[category]/layout.module.scss'
import AppConfig from 'src/config/app'

const page = async ({ params: { slug } }: { params: { slug: string[] } }) => {
  let data
  if (slug === undefined) return <Default />

  try {
    data = await getPostContent(slug)
  } catch (error) {
    notFound()
  }
  return (
    <article className={styles['blog-container']}>
      <RenderMarkdown data={data} />{' '}
    </article>
  )
}

export default page

async function getPostContent(slug: string[]) {
  const filePath = path.join(...slug)
  const fullPath = path.join(AppConfig.docsPath, filePath + AppConfig.suffix)
  const fileContent = fs.readFileSync(fullPath, 'utf-8')
  return fileContent
}
