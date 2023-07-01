import classNames from 'classnames'
import styles from 'src/app/page.module.scss'
import RenderMarkdown from 'src/components/renderMarkdown'
import { getREADME } from 'src/lib/util'

export default async function Home() {
  const markdown = await getREADME()
  return (
    <main className={styles['home-content']}>
      <h1 className={classNames('text-3xl', 'pt-6', 'font-bold')}>
        <RenderMarkdown data={markdown} />
      </h1>
    </main>
  )
}
