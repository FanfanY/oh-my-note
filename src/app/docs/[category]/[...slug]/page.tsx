import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import styles from 'src/app/docs/[category]/[...slug]/page.module.scss'
import RenderMarkdown from 'src/app/docs/[category]/[...slug]/renderMarkdown'
import AppConfig from 'src/config/app'

const page = async ({ params: { slug, category } }: { params: { slug: string[]; category: string } }) => {
  let postContent

  try {
    postContent = await getPostContent([category, ...slug])
  } catch (error) {
    notFound()
  }
  return (
    <article className={styles['blog-container']}>
      <RenderMarkdown data={postContent} />
    </article>
  )
}

export default page

async function getPostContent(slug: string[]) {
  const fullPath = path.join(AppConfig.docsPath, ...slug) + AppConfig.suffix
  const fileContent = fs.readFileSync(fullPath, 'utf-8')

  return fileContent
}
