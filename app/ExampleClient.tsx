'use client'

import { styled } from 'baseui'
import { Button } from 'baseui/button'
import { useState } from 'react'
import { ProgressBar } from 'baseui/progress-bar'
import { HeadingXLarge, HeadingLarge } from 'baseui/typography'
import Link from 'next/link'

const Centered = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
})

export default function ExampleClient() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Link
        href={'https://github.com/patte/next13-styletron-baseui-colorScheme'}
      >
        <HeadingXLarge>
          next13-styletron-baseui-colorScheme-example
        </HeadingXLarge>
      </Link>
      <br />
      <HeadingLarge>Let's go client!</HeadingLarge>
      <Centered>
        <Button
          onClick={() => {
            setCount(count + 1)
          }}
        >
          Go {count}
        </Button>
        <ProgressBar value={count} minValue={0} maxValue={10} />
      </Centered>
    </>
  )
}
