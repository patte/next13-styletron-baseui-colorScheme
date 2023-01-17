import { headers, cookies } from 'next/headers'
import { ClientProvider } from './client'
import { COLOR_SCHEME_HEADER } from './middleware'

const COLOR_SCHEME_COOKIE = 'prefers-color-scheme'

export function SsrColorSchemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const headerColorSchema = headers().get(COLOR_SCHEME_HEADER)
  const cookieColorSchema = cookies().get(COLOR_SCHEME_COOKIE)?.value || null
  return (
    <ClientProvider
      headerColorSchema={headerColorSchema}
      cookieColorSchema={cookieColorSchema}
      cookieName={COLOR_SCHEME_COOKIE}
    >
      {children}
    </ClientProvider>
  )
}
