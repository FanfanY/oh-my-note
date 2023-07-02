'use client'
import classNames from 'classnames'
import { motion, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { FC } from 'react'
import styles from 'src/components/header/index.module.scss'
import AppConfig from 'src/config/app'
import useIsScroll from 'src/hooks/useIsScroll'
interface HeaderProps {
  nav: typeof AppConfig.navigation
}

const Header: FC<HeaderProps> = ({ nav }) => {
  const { scrollYProgress } = useScroll()
  const session = useSession()
  const { data } = session
  const { isScroll } = useIsScroll()
  const rootClasses = classNames(styles['page-header'], styles['page-header-sticky'])
  return (
    <header className={rootClasses}>
      <nav className={classNames(styles['nav'], styles['nav-padding'])}>
        <div className={styles['nav-left']}>
          <Link
            className={classNames('flex', 'items-center', 'justify-center', styles['nav-link'], styles['brand'])}
            href="/"
          >
            <Image className={styles['logo']} width={29} height={32} alt="" src="/logo-xs.png"></Image>
            <b>Oh-My-Note</b>
          </Link>

          {nav.map(({ title, path }, index) => (
            <Link className={classNames(styles['nav-link-padding'], styles['nav-link'])} href={path} key={index}>
              {title}
            </Link>
          ))}
        </div>
        <div className={styles['nav-right']}>
          <Link className={styles['npm']} target="_blank" href="https://18888628835.github.io/react-drag-resizable/" />
          <Link className={styles['git-hub']} target="_blank" href="https://github.com/18888628835" />
        </div>
      </nav>
      <motion.div className={styles['progress-bar']} hidden={isScroll === false} style={{ scaleX: scrollYProgress }} />
    </header>
  )
}

export default Header
