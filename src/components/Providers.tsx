'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { FC, ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}
// because its FC, the function will return a react node
// because we pass ProviderProps, we know that the props will have children of type ReactNode

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}

export default Providers