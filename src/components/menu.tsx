'use client'
import { Menu as AntdMenu, MenuProps } from 'antd'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { styled } from 'styled-components'

const StyledMenu = styled(AntdMenu)`
  &.ant-menu-root {
    border: none;
    font-size: var(--basic-font-size);
    position: sticky;
    top: calc(var(--page-header-height) + 1rem);
  }
`
const Menu: FC<MenuProps> = (props) => {
  const { push } = useRouter()

  return (
    <StyledMenu
      className="text-overflow-ellipsis"
      {...props}
      onClick={(item) => {
        push(item.key)
      }}
    />
  )
}

export default Menu
