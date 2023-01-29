'use client'

import { HeadingXLarge } from 'baseui/typography'
import Link from 'next/link'

export default function Example() {
  return (
    <>
      <HeadingXLarge>Welcome to sub path 1</HeadingXLarge>
      <br />
      <Link href='/test-sub-path2'>Link2</Link>
    </>
  )
}
