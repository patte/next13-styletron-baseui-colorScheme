import { SsrBaseProvider } from './BaseProvider'
import { SsrColorSchemeProvider } from './colorScheme/server'
import { SsrStyletronProvider } from './StyletronProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SsrStyletronProvider>
      <SsrColorSchemeProvider>
        <SsrBaseProvider>{children}</SsrBaseProvider>
      </SsrColorSchemeProvider>
    </SsrStyletronProvider>
  )
}
