'use client'
import classNames from 'classnames'
import { FC, useState } from 'react'
import styles from 'src/components/toc/index.module.scss'

interface TocProps {
  headings: { text: string }[]
}

const Toc: FC<TocProps> = ({ headings }) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const getClasses = (index: number) =>
    classNames('block text-gray-500 leading-[1.6]', {
      'font-medium': index === activeIndex,
      'text-[var(--color-for-hover-link)]': index === activeIndex,
      'hover:text-gray-600': index !== activeIndex,
    })
  return (
    <div className={styles['doc-toc-container']}>
      <div className={styles['doc-toc']}>
        <div className="mb-1 mt-[7px] text-sm font-medium text-gray-700">On this page</div>
        <ul className="space-y-2.5 py-2 text-sm overflow-y-auto max-h-[70vh] styled-scrollbar">
          {headings.map(({ text }, index) => (
            <li key={index} onClick={() => setActiveIndex(index)}>
              <a className={getClasses(index)} href={`#${text.replaceAll(' ', '').replaceAll('`', '')}`}>
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Toc
