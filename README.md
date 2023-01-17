## next13-styletron-baseui-colorScheme-example

A [Next.js](https://nextjs.org/) v13-beta, [React](https://reactjs.org) v18 project with [Styletron](https://www.styletron.org/), [BaseWeb](https://baseweb.design/) and detection / selection of the prefered color-scheme (dark, light).

[Demo](https://next13-styletron-baseui-colorscheme.fly.dev/)

- ✅ Next.js v13 beta server components
- ✅ Styletron SSR with `useServerInsertedHTML`
- ✅ BaseWeb with custom theme
- ✅ render styletron/baseWeb components in client components
- ❌ render styletron/baseWeb components in server components (only use it in client components)
- ✅ detect prefered color scheme
- ✅ toggle color scheme
- ✅ SSR the correct color scheme without flash on first visit in chromium `>= 93`
- ✅ SSR the correct color scheme after on consecutive visits in all browsers
- ✅ change to the correct preferred color scheme on mount in all browsers
- ❌ SSR the correct color scheme without flash on first visit in chromium `< 93` or other browsers

### Features

#### Next.js v13 beta

With the `app` directory for react server components and data fetching.

#### Styletron

The [SsrStyletronProvider](lib/ui/StyletronProvider.tsx) is use to get the stylesheets after prerendering and setting if as a style tag in the head of the SSR response.

Rendering styletron components in client components works fine. In server components it doesn't because styletron uses `createContext`. Issue: https://github.com/styletron/styletron/issues/430

#### color-scheme

The prefered color scheme of the browser can be detected by the `prefers-color-scheme: light | dark` media query. For style systems which use css variables,
server side rendering (SSR) is easy: render and send the browser all css variables (for light and dark) and let it choose which to use. Style systems which need to use the color scheme in javascript, SSR becomes more difficult. As the server needs to decide which color scheme to render.

The [colorScheme lib](lib/ui/colorScheme) solves this with the following steps:

- The [middleware](lib/ui/colorScheme/middleware.ts) asks the browser to provide the `Sec-CH-Prefers-ColorScheme` header (supported by Chromium `>= 93`)
- The [SsrColorSchemeProvider](lib/ui/colorScheme/server.tsx) (server component) reads the header and sets it as a prop on the [ClientProvider](lib/ui/colorScheme/client.tsx) (client component).
- The [SsrColorSchemeProvider](lib/ui/colorScheme/server.tsx) (server component) also reads the `prefers-color-scheme` cookie from the request and sets it as a prop on the ClientProvider.
- The [ClientProvider](lib/ui/colorScheme/client.tsx)
  - uses the these two props to derive the color scheme (cookie wins over header) and set it as a context value for consumption downstream.
  - provides a toogle function that sets the user's prefered color scheme in the cookie and updates the context value.
  - upon first mount checks if the current color scheme (set by SSR) is different from the medie query `prefers-color-scheme` and if no cookie is set (no local preference), "corrects" the wrong guess by toggling the color scheme to the correct one. This saves the preference in the cookie, so the next SSR will be correct.
  - during it's livetime: listens for media query changes to `prefers-color-scheme` and toggles the color scheme accordingly.

#### BaseWeb

The [SsrBaseProvider](lib/ui/BaseProvider.tsx) is used to create the baseweb theme based on the active color scheme.

Issue for react 18: https://github.com/uber/baseweb/issues/4900

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
