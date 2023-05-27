'use client'
import { Avatar, Dropdown } from 'antd'
import classNames from 'classnames'
import { motion, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FC } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import styles from 'src/app/layout.module.scss'
import AppConfig from 'src/config/app'
import useIsScroll from 'src/hooks/useIsScroll'
interface NavigationProps {
  nav: typeof AppConfig.navigation
}
const effects = {
  transition: { duration: 0.2 },
  whileHover: { color: 'var(--color-for-link)' },
}

const Navigation: FC<NavigationProps> = ({ nav }) => {
  const { scrollYProgress } = useScroll()
  const session = useSession()
  const { data } = session

  const { isScroll } = useIsScroll()
  const classes = classNames(styles['page-header'], {
    [styles['page-start-scroll']]: isScroll,
  })

  return (
    <header className={classes}>
      <nav className={styles['page-header-inner']}>
        <div className={styles['left']}>
          <div className={styles['logo']}>
            <Image width={29} height={32} alt="" src="/logo-xs.png"></Image>
            <b className={styles['title']}>
              <Link href="/">Oh-My-Note</Link>
            </b>
          </div>
          <ul className={styles['nav-inner']}>
            {nav.map(({ title, path }, index) => (
              <motion.li className={styles['nav-link']} {...effects} key={index}>
                <Link href={path}>{title}</Link>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className={styles['right']}>
          <div className={styles['action']}>
            {data ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: '1',
                      label: (
                        <motion.div
                          style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', gap: 8 }}
                          {...effects}
                          onClick={() => signOut()}
                        >
                          Sign out
                        </motion.div>
                      ),
                    },
                  ],
                }}
              >
                <div className={styles['space']}>
                  <Avatar size="small" src={data?.user?.image} />
                  <AiFillCaretDown />
                </div>
              </Dropdown>
            ) : (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: '1',
                      label: (
                        <motion.div
                          style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', gap: 8 }}
                          {...effects}
                          onClick={() => signIn('github')}
                        >
                          <Image width={24} height={24} src="/github.svg" alt="" />
                          Sign in with github
                        </motion.div>
                      ),
                    },
                    {
                      key: '2',
                      label: (
                        <motion.div
                          style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', gap: 8 }}
                          {...effects}
                          onClick={() => signIn('google')}
                        >
                          <Image width={24} height={24} src="/google.svg" alt="" />
                          Sign in with google
                        </motion.div>
                      ),
                    },
                  ],
                }}
              >
                <motion.div {...effects} className={styles['space']}>
                  Sign in
                  <AiFillCaretDown />
                </motion.div>
              </Dropdown>
            )}
          </div>
          <Link
            className={styles['npm']}
            target="_blank"
            href="https://18888628835.github.io/react-drag-resizable/"
          ></Link>
          <Link className={styles['git-hub']} target="_blank" href="https://github.com/18888628835"></Link>
        </div>
      </nav>
      <motion.div className={styles['progress-bar']} hidden={isScroll === false} style={{ scaleX: scrollYProgress }} />
    </header>
  )
}

export default Navigation
