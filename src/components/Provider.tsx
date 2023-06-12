'use client'

import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren, FC } from 'react'

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default Provider
