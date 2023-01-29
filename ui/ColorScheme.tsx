import { useColorScheme } from '@/lib/ui/colorScheme/client'
import { useStyletron } from 'baseui'
import { Button, KIND, SIZE, SHAPE } from 'baseui/button'
import { MdLightbulb } from 'react-icons/md'

export function ToggleColorSchemeButton() {
  const [css, theme] = useStyletron()
  const { colorScheme, toggleColorScheme } = useColorScheme()
  return (
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
  )
}