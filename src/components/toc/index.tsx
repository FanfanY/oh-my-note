'use client'
import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import styles from 'src/components/toc/index.module.scss'

interface TocProps {
  headings: { text: string }[]
}

const Toc: FC<TocProps> = ({ headings }) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const getClasses = (index: number) =>
    classNames('block leading-[1.6]', {
      'font-medium': index === activeIndex,
      'text-[var(--color-for-hover-link)]': index === activeIndex,
      'hover:text-gray-600': index !== activeIndex,
      'text-gray-500': index !== activeIndex,
    })
  useEffect(() => {
    const h2Elements = document.querySelectorAll('h2[id]')
    const h3Elements = document.querySelectorAll('h3[id]')
    const hElements = [...h2Elements, ...h3Elements]
    const tocElements = [...document.querySelectorAll('li[data-id]')] as Array<Element & { dataset: { id: string } }>
    // 视口高度
    const viewHeight = window.innerHeight
    // markdown content 高度
    // 60 为 header 的高度 + 16 padding = 76
    const contentHeight = viewHeight - 76
    function setActiveTocElement() {
      // 遍历每个h2/h3元素
      for (const hElement of hElements) {
        const hTop = hElement.getBoundingClientRect().top
        // 如果h2/h3元素距离页面顶部的距离大于76且小于markdown content高度的一半
        if (hTop >= 0 && hTop <= contentHeight / 2) {
          const index = tocElements.findIndex((tocElement) => tocElement.dataset.id === hElement.id)
          setActiveIndex(index)
          return
        }
      }
    }
    // 监听页面滚动事件
    window.addEventListener('scroll', setActiveTocElement)
    return () => {
      window.removeEventListener('scroll', setActiveTocElement)
    }
  }, [])

  return (
    <div className={styles['doc-toc-container']}>
      <div className={styles['doc-toc']}>
        <div className="mb-1 mt-[7px] text-sm font-medium text-gray-700">On this page</div>
        <ul className="space-y-2.5 py-2 text-sm overflow-y-auto max-h-[70vh] styled-scrollbar">
          {headings.map(({ text }, index) => (
            <li
              data-id={`${text.replaceAll(' ', '').replaceAll('`', '')}`}
              key={index}
              onClick={() => setActiveIndex(index)}
            >
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
