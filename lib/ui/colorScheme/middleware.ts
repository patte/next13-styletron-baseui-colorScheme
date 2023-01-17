import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

export const COLOR_SCHEME_HEADER = 'sec-ch-prefers-color-scheme'

// tell browser to send prefered color scheme header
// only supported by chromium >= 93
// https://web.dev/user-preference-media-features-headers/
export const createColorSchemeMiddleware: (
  middleware: NextMiddleware,
) => NextMiddleware = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next)
    if (res) {
      res.headers.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme')
      res.headers.set('Vary', 'Sec-CH-Prefers-Color-Scheme')
      res.headers.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme')
    }
    return res
  }
}
