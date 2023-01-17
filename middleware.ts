import { NextResponse } from 'next/server'
import { createColorSchemeMiddleware } from './lib/ui/colorScheme/middleware'

function defaultMiddleware() {
  return NextResponse.next()
}
export default createColorSchemeMiddleware(defaultMiddleware)
