'use client'

import { Provider as StyletronProvider } from 'styletron-react'
import { Client, Server } from 'styletron-engine-monolithic'
import { useMemo } from 'react'
import { useServerInsertedHTML } from 'next/navigation'

const HYDRATION_ELEMENT_CLASS_NAME = '_styletron_hydrate_'
const CONTAINER_ELEMENT_ID = '_styletron_container_'

export function SsrStyletronProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const styletron = useMemo(() => {
    if (typeof window === 'undefined') {
      return new Server()
    } else {
      // workaround 1:
      // when this component is rendered, styletron creates new styles
      // without removing the old ones. This causes issues. We create
      // a container element and remove the old one if it exists.
      const oldContainer = document.getElementById(CONTAINER_ELEMENT_ID)

      const newContainer = document.createElement('style')
      newContainer.setAttribute('id', CONTAINER_ELEMENT_ID)
      document.head.appendChild(newContainer)

      // https://github.com/vercel/next.js/issues/44125
      // workaround 2:
      // useServerInsertedHTML sometimes (on route push) renders to body
      // instead of head. We check if there are multiple style elements
      // and remove the all in the body.
      const hydrateElements = document.getElementsByClassName(
        HYDRATION_ELEMENT_CLASS_NAME,
      ) as HTMLCollectionOf<HTMLStyleElement>
      if (hydrateElements?.length > 1) {
        for (let i = 0; i < hydrateElements.length; i++) {
          if (hydrateElements[i].parentNode === document.body) {
            hydrateElements[i].remove()
          }
        }
      }

      const newClient = new Client({
        hydrate: hydrateElements,
        container: newContainer,
      })

      if (oldContainer) {
        oldContainer.remove()
      }

      return newClient
    }
  }, [])

  // see workaround 2
  useServerInsertedHTML(() => {
    // @ts-ignore getSylesheets is not in the type definition
    const stylesheets = styletron.getStylesheets() || []
    return (
      <>
        {stylesheets.map((sheet: any, i: number) => (
          <style
            className={HYDRATION_ELEMENT_CLASS_NAME}
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
