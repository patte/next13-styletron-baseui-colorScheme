'use client'

import { useRouter } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getIsDocumentCookieSet, setDocumentCookie } from '../../cookies'

export enum ColorScheme {
  light = 'light',
  dark = 'dark',
}

type ColorSchemeContext = {
  colorScheme: ColorScheme
  toggleColorScheme: () => void
}

export const ColorSchemeContext = createContext<ColorSchemeContext>({
  colorScheme: ColorScheme.light,
  toggleColorScheme: () => {
    throw new Error('toggleColorScheme used outside of ColorSchemeProvider')
  },
})

export function useColorScheme() {
  return useContext(ColorSchemeContext)
}

function cleanColorScheme(colorScheme: string | null) {
  if (colorScheme == ColorScheme.dark) {
    return ColorScheme.dark
  } else if (colorScheme == ColorScheme.light) {
    return ColorScheme.light
  }
  return null
}

export function ClientProvider({
  children,
  headerColorSchema,
  cookieColorSchema,
  cookieName,
}: {
  children: React.ReactNode
  headerColorSchema: string | null
  cookieColorSchema: string | null
  cookieName: string
}) {
  const router = useRouter()
  const inputColorScheme =
    cleanColorScheme(cookieColorSchema) || cleanColorScheme(headerColorSchema)

  const [activeColorScheme, setActiveColorScheme] = useState(
    inputColorScheme == ColorScheme.dark ? ColorScheme.dark : ColorScheme.light,
  )

  const set = useCallback(
    (colorScheme: ColorScheme) => {
      if (activeColorScheme == colorScheme) {
        return
      }
      setDocumentCookie(cookieName, colorScheme)
      setActiveColorScheme(colorScheme)
      // send the cookie to the server and thus
      // update the props (header, cookie) for this component
      router.refresh()
    },
    [activeColorScheme, cookieName, router],
  )

  const toggle = useCallback(() => {
    set(
      activeColorScheme == ColorScheme.dark
        ? ColorScheme.light
        : ColorScheme.dark,
    )
  }, [activeColorScheme, set])

  // get initial css value and if != activeColorScheme, set it
  useEffect(() => {
    if (!cookieColorSchema && !getIsDocumentCookieSet(cookieName)) {
      if (
        window.matchMedia('(prefers-color-scheme: dark)').matches &&
        activeColorScheme != ColorScheme.dark
      ) {
        set(ColorScheme.dark)
      }
      if (
        window.matchMedia('(prefers-color-scheme: light)').matches &&
        activeColorScheme != ColorScheme.light
      ) {
        set(ColorScheme.light)
      }
    }
  })

  // listen to css prefers-color-scheme
  useEffect(() => {
    const listenerDark = (e: MediaQueryListEvent) => {
      if (e.matches) {
        set(ColorScheme.dark)
      }
    }
    const listenerLight = (e: MediaQueryListEvent) => {
      if (e.matches) {
        set(ColorScheme.light)
      }
    }
    const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)')
    const mediaQueryLight = window.matchMedia('(prefers-color-scheme: light)')
    mediaQueryDark.addEventListener('change', listenerDark)
    mediaQueryLight.addEventListener('change', listenerLight)
    return () => {
      mediaQueryDark.removeEventListener('change', listenerDark)
      mediaQueryLight.removeEventListener('change', listenerLight)
    }
  }, [set])

  return (
    <ColorSchemeContext.Provider
      value={{ colorScheme: activeColorScheme, toggleColorScheme: toggle }}
    >
      {children}
    </ColorSchemeContext.Provider>
  )
}
