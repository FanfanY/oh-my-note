'use client'

import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren, FC } from 'react'
import AnimateImageProvider from 'src/components/AnimateImageProvider'

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <AnimateImageProvider>{children}</AnimateImageProvider>
    </SessionProvider>
  )
}

export default Provider
