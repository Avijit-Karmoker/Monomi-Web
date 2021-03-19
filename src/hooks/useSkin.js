//** React Imports
import { useState, useEffect } from 'react'

// ** Configs
import themeConfig from '@/utils/theme'

export const useSkin = () => {
  // ** State
  const [skin, setSkin] = useState(() => {
    const item = window.localStorage.getItem('skin')
    // ** Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : themeConfig.layout.skin
  })

  // ** Return a wrapped version of useState's setter function
  const setValue = (value) => {
    // ** Allow value to be a function so we have same API as useState
    const valueToStore = value instanceof Function ? value(skin) : value
    // ** Set state
    setSkin(valueToStore)
    // ** Save to local storage
    window.localStorage.setItem('skin', JSON.stringify(valueToStore))
  }

  useEffect(() => {
    // ** Get Body Tag
    const element = window.document.body

    // ** Define classnames for skins
    const classNames = {
      dark: 'dark-layout',
      bordered: 'bordered-layout',
      'semi-dark': 'semi-dark-layout',
    }

    // ** Remove all classes from Body on mount
    element.classList.remove(...element.classList)

    // ** If skin is not light add skin class
    if (skin !== 'light') {
      element.classList.add(classNames[skin])
    }
  }, [skin])

  return [skin, setValue]
}
