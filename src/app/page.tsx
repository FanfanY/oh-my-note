import classNames from 'classnames'
import styles from 'src/app/page.module.scss'
export default function Home() {
  return (
    <main className={styles['home-content']}>
      <h1 className={classNames('text-3xl', 'font-bold')}>Welcome Here !!!</h1>
    </main>
  )
}
