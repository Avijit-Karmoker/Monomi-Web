import {
  Payload,
  IndexedType,
  Money,
  Address,
  APIErrorResponse,
  EntityAddress,
} from '@/typings'
import { UseFormMethods } from 'react-hook-form'
import store from '@/store'

export const noop = () => {}

export function getChanges<Data>(source: Payload<Data>, target: Payload<Data>) {
  return Object.entries(source).reduce((acc, [key, sourceValue]) => {
    const targetValue = target[key]

    if (sourceValue !== targetValue) {
      acc[key] = sourceValue
    }

    return acc
  }, {} as IndexedType<Data>)
}

export function formatMoney(
  { value, unit, currency }: Money,
  options: Intl.NumberFormatOptions = {},
) {
  const format = Intl.NumberFormat(store!.getState().global.locale, {
    style: 'currency',
    currency,
    ...options,
  })

  return format.format(unit === 'major' ? value : value / 100)
}

export function formatBasisPoints(bps: number) {
  return `${bps / 100}%`
}

export function formatAddress({
  zip,
  country,
  street,
  city,
  line1,
  line2,
}: Partial<Address & EntityAddress>) {
  return [line1, line2, street, city, zip, country]
    .filter((item) => item)
    .join(', ')
}

export function formatErrors(error: APIErrorResponse) {
  const errors = (error?.errors || [])
    .map(({ source, title, detail, code }) => {
      const pointer = source?.pointer
      const message = detail || title

      let error: [string | number, string]

      if (pointer) {
        const [, attribute] = pointer.split('/data/attributes/')

        error = [attribute, message]
      } else {
        error = [code, message]
      }

      return error
    })
    .filter((item) => item.length)

  return errors
}

export function setAPIErrors<Setter extends UseFormMethods['setError']>(
  setter: Setter,
  error: APIErrorResponse,
) {
  formatErrors(error).forEach(([name, message]) => {
    if (typeof name === 'string') {
      setter(name, { type: 'server', message })
    }
  })
}

export function getInitials(content: string) {
  return content
    .split(' ')
    .map((word) => word[0])
    .join('')
}
