import {
  Payload,
  IndexedType,
  Money,
  Address,
  APIErrorResponse,
  EntityAddress,
} from '@/typings'
import { getLanguage } from './Internationalization'

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
  const format = Intl.NumberFormat(getLanguage(), {
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

export function formatErrors(error: APIErrorResponse): Record<string, string> {
  const errors = (error?.errors || [])
    .map(({ source, title, detail, code }) => {
      const pointer = source?.pointer
      const message = detail || title

      if (pointer) {
        const [, attribute] = pointer.split('/data/attributes/')

        return [attribute, message]
      } else {
        return [code, message]
      }
    })
    .filter((item) => item.length)

  return Object.fromEntries(errors)
}
