'use client'

import { Card, StyledBody } from 'baseui/card'
import { ParagraphSmall } from 'baseui/typography'

export function Quote({ quote, author }: { quote: string; author: string }) {
  return (
    <Card overrides={{ Root: { style: { width: '328px' } } }}>
      <StyledBody>
        {quote}
        <ParagraphSmall>
          <i>{author}</i>
        </ParagraphSmall>
      </StyledBody>
    </Card>
  )
}
