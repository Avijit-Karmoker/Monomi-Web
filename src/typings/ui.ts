import { TypeOptions } from 'react-toastify'

export type Toast = {
  title: string
  message?: string
  type: TypeOptions
}

export type Language = {
  id: string
  title: string
  abbr: string
  code: string
  dialCodes: string[]
  default: boolean
}
