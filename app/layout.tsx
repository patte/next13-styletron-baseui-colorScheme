import './globals.css'
import { Providers as UiProviders } from '../lib/ui/Providers'
import Navigation from '@/ui/Navigation'
import Container from '@/ui/Container'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent head.tsx.
      */}
      <head />
      <body>
        <UiProviders>
          <Container>
            <Navigation />
            {children}
          </Container>
        </UiProviders>
      </body>
    </html>
  )
}
