import ExampleClient from './ExampleClient'
import ExampleServer from './ExampleServer'

export default function Home() {
  return (
    <main>
      <ExampleClient />
      <br />
      {/* https://github.com/vercel/next.js/issues/43537 */}
      {/* @ts-ignore */}
      <ExampleServer />
    </main>
  )
}
