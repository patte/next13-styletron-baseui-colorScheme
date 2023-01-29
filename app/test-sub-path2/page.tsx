'use client'

import { HeadingXLarge } from 'baseui/typography'
import Link from 'next/link'

export default function Example() {
  return (
    <>
      <HeadingXLarge>Welcome to sub path 2</HeadingXLarge>
      <br />
      <Link href='/test-sub-path'>Link1</Link>
    </>
  )
}
