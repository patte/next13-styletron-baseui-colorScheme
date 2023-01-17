'use client'

import { BaseProvider, createTheme, createDarkTheme } from 'baseui'

import { primitives, overrides } from '../../ui/theme'
import { ColorScheme, useColorScheme } from './colorScheme/client'

export function SsrBaseProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme()

  const theme =
    colorScheme == ColorScheme.dark
      ? createDarkTheme(primitives, overrides)
      : createTheme(primitives, overrides)

  return (
    <BaseProvider theme={theme}>
      <div
        style={{
          backgroundColor: theme.colors.backgroundPrimary,
          color: theme.colors.contentPrimary,
          minHeight: '100vh',
        }}
      >
        {children}
      </div>
    </BaseProvider>
  )
}
