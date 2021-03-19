//** React Imports
import { useState } from 'react'

// ** Configs
import themeConfig from '@/utils/theme'

export const useNavbarType = () => {
  // ** State
  const [navbarType, setNavbarType] = useState(
    () => themeConfig.layout.navbar.type,
  )

  // ** Return a wrapped version of useState's setter function
  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(navbarType) : value

    setNavbarType(valueToStore)
  }

  return [navbarType, setValue]
}
