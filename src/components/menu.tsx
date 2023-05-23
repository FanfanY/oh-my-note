'use client'
import { Menu as AntdMenu, MenuProps } from 'antd'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { styled } from 'styled-components'
const StyledMenu = styled(AntdMenu)`
  &ul {
    border: none;
    height: 100%;
  }
`
const Menu: FC<MenuProps> = (props) => {
  const { push } = useRouter()

  return (
    <StyledMenu
      {...props}
      onClick={(item) => {
        push(item.key)
      }}
    />
  )
}

export default Menu
