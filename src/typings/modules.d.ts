import '@emotion/react'
import colors from '@/utils/colors'
import 'next-auth'

declare module 'next-auth' {
  interface User {
    accessToken?: string
  }
}

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors
  }
}
