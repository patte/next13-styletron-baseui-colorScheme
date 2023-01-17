'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useStyletron } from 'baseui'
import { Button, KIND, SIZE, SHAPE } from 'baseui/button'
import { MdLightbulb } from 'react-icons/md'
import { ColorScheme, useColorScheme } from '@/lib/ui/colorScheme/client'

type NavigationProps = {}
const Navigation = ({}: NavigationProps) => {
  const [css, theme] = useStyletron()
  const { colorScheme, toggleColorScheme } = useColorScheme()
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
            <Button
              onClick={() => toggleColorScheme()}
              size={SIZE.compact}
              kind={KIND.tertiary}
              shape={SHAPE.square}
              title='Toggle light/dark'
              overrides={{
                BaseButton: {
                  style: {
                    display: 'flex',
                    marginLeft: '5px',
                  },
                },
              }}
            >
              <MdLightbulb size={20} color={theme.colors.contentPrimary} />
            </Button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation