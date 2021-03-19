// ** React Imports
import { useState } from 'react'

// ** Configs
import themeConfig from '@/utils/theme'

export const useFooterType = () => {
  // ** State
  const [footerType, setFooterType] = useState(
    () => themeConfig.layout.footer.type,
  )

  // ** Return a wrapped version of useState's setter function
  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(footerType) : value

    // ** Set state
    setFooterType(valueToStore)
  }

  return [footerType, setValue]
}
