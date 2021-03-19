//** React Imports
import { useState } from 'react'

// ** Configs
import themeConfig from '@/utils/theme'

export const useRouterTransition = () => {
  // ** State
  const [transition, setTransition] = useState(
    () => themeConfig.layout.routerTransition,
  )

  // ** Return a wrapped version of useState's setter function
  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(transition) : value

    setTransition(valueToStore)
  }

  return [transition, setValue]
}
