'use client'
import React, { FC } from 'react'
import { BsLink45Deg } from 'react-icons/bs'
import { styled } from 'styled-components'

const A = styled.a`
  &[data-role='hash-link'] {
    color: var(--basic-font-color);
    &:hover {
      text-decoration: none;
      color: var(--color-for-hover-link);
    }
    &:hover svg {
      opacity: 1;
    }
  }
  svg {
    opacity: 0;
    vertical-align: text-bottom;
    margin-left: var(--basic-gap);
  }
`

const HeadingHashLink: FC<{ level: number; id: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  level,
  id,
  ...restProps
}) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <HeadingTag id={id}>
      <A id={id} data-role="hash-link" {...restProps}>
        {children}
        <BsLink45Deg className="inline-block" />
      </A>
    </HeadingTag>
  )
}

export default HeadingHashLink
