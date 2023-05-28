'use client'
import classNames from 'classnames'
import React, { FC, PropsWithChildren, useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { MdOutlineContentCopy } from 'react-icons/md'
import styles from 'src/components/copy/index.module.scss'

interface CopyProps {
  data: string
  language: string
}

const Copy: FC<PropsWithChildren<CopyProps>> = ({ children, language, data }) => {
  const [copied, setCopied] = useState(false)
  function reset() {
    setCopied(false)
  }
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(data)
      setCopied(true)
      const timer = setTimeout(() => {
        reset()
        window.clearTimeout(timer)
      }, 1500)
    } catch (err) {
      reset()
    }
  }
  return (
    <div className={styles['root-container']}>
      <div className={classNames(styles['copy-wrap'], 'flex-space-between-box')}>
        <div className={styles['language']}>{language}</div>
        <button onClick={onCopy} className={classNames('flex-center-box', styles['copy-btn'])}>
          {!copied ? (
            <MdOutlineContentCopy className={classNames('animate__animated', 'animate__zoomIn')} />
          ) : (
            <AiOutlineCheck className={classNames('animate__animated', 'animate__zoomIn')} />
          )}
        </button>
      </div>
      {children}
    </div>
  )
}

export default Copy
