'use client'
import { motion } from 'framer-motion'
import { FC } from 'react'
import styles from 'src/app/layout.module.scss'
import { getNavigation } from 'src/data-fetching/home'
interface NavigationProps {
  nav: Awaited<ReturnType<typeof getNavigation>>
}
const effects = {
  transition: { duration: 0.2 },
  whileHover: { scale: 1.2, opacity: 0.9 },
}

const Navigation: FC<NavigationProps> = ({ nav }) => {
  return (
    <nav className={styles['nav']}>
      <ul className={styles['nav-inner']}>
        {nav.map(({ title }, index) => (
          <motion.li {...effects} key={index}>
            {title}
          </motion.li>
        ))}
      </ul>
      <div className={styles['action']}>
        <motion.div className="search" {...effects}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            width="20"
            height="20"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </motion.div>

        <motion.div className="sign-in" {...effects}>
          Sign In
        </motion.div>
        <div className="menu">menu</div>
      </div>
    </nav>
  )
}

export default Navigation
