'use client'
import { Menu as AntdMenu, MenuProps } from 'antd'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { styled } from 'styled-components'
import styles from 'src/app/[category]/layout.module.scss'
const Menu = styled(AntdMenu)`
  &ul {
    border: none;
    height: 100%;
  }
`
const SubNav: FC<MenuProps> = (props) => {
  const { push } = useRouter()
  return (
    <div className={styles['sub-nav-container']}>
      <Menu {...props} onClick={(item) => push(item.key)} />{' '}
    </div>
  )
}

export default SubNav
