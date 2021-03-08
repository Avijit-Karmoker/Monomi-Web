import '@emotion/react'
import colors from '@/utils/colors'

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors
  }
}
