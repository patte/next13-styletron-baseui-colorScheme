'use client'

import { styled } from 'baseui'
import { Button } from 'baseui/button'
import { useState } from 'react'
import { ProgressBar } from 'baseui/progress-bar'
import { HeadingXLarge, HeadingLarge } from 'baseui/typography'
import Link from 'next/link'
import { deleteDocumentCookie } from '@/lib/cookies'

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
      simulate first visit:{' '}
      <Button
        kind='secondary'
        size='mini'
        onClick={() => {
          deleteDocumentCookie('prefers-color-scheme')
          window.location.reload()
        }}
      >
        clear cookie <code>prefers-color-scheme</code>
      </Button>
      <br />
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
