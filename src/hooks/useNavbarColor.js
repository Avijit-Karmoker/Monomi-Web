//** React Imports
import { useState } from 'react'

// ** Configs
import themeConfig from '@/utils/theme'

export const useNavbarColor = () => {
  // ** State
  const [navbarColor, setNavbarColor] = useState(
    () => themeConfig.layout.navbar.backgroundColor,
  )
  // ** Return a wrapped version of useState's setter function
  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(navbarColor) : value
    setNavbarColor(valueToStore)
  }

  return [navbarColor, setValue]
}
