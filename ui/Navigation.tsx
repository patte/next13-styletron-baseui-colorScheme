'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useStyletron } from 'baseui'

import { ColorScheme, useColorScheme } from '@/lib/ui/colorScheme/client'
import { ToggleColorSchemeButton } from './ColorScheme'

type NavigationProps = {}
const Navigation = ({}: NavigationProps) => {
  const [css, theme] = useStyletron()
  const { colorScheme } = useColorScheme()
  return (
    <>
      <nav
        style={{
          width: '100%',
          padding: '16px 0',
          fontSize: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              marginRight: '24px',
            }}
          >
            <Link href='/' style={{ display: 'block', height: '37px' }}>
              <Image
                style={{
                  filter:
                    colorScheme === ColorScheme.dark ? 'invert(1)' : 'none',
                }}
                src='/next.svg'
                alt='Next.js Logo'
                width={180}
                height={37}
                priority
              />
            </Link>
          </div>

          <div
            style={{
              marginLeft: 'auto',
            }}
          >
            <ToggleColorSchemeButton />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation
