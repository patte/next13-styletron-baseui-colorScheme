'use client'

import { Provider as StyletronProvider } from 'styletron-react'
import { Client, Server } from 'styletron-engine-atomic'
import { useMemo } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ColorScheme, useColorScheme } from './colorScheme/client'

const ELEMENT_CLASS_NAME = '_styletron_hydrate_'

const createStyletron = ({ colorScheme }: { colorScheme: ColorScheme }) =>
  typeof window === 'undefined'
    ? new Server({
        prefix: `${colorScheme}_`,
      })
    : new Client({
        prefix: `${colorScheme}_`,
        hydrate: document.getElementsByClassName(
          ELEMENT_CLASS_NAME,
        ) as HTMLCollectionOf<HTMLStyleElement>,
      })

export function SsrStyletronProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { colorScheme } = useColorScheme()

  const [styletron] = useMemo(
    () => [createStyletron({ colorScheme })],
    [colorScheme],
  )

  useServerInsertedHTML(() => {
    // @ts-ignore getSylesheets is not in the type definition
    const stylesheets = styletron.getStylesheets() || []
    return (
      <>
        {stylesheets.map((sheet: any, i: number) => (
          <style
            className={ELEMENT_CLASS_NAME}
            dangerouslySetInnerHTML={{ __html: sheet.css }}
            media={sheet.attrs.media}
            data-hydrate={sheet.attrs['data-hydrate']}
            key={`_styletron_hydrate_${i}`}
          />
        ))}
      </>
    )
  })

  return <StyletronProvider value={styletron}>{children}</StyletronProvider>
}
