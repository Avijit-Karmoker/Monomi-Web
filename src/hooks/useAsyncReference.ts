import { MutableRefObject, useRef, useState } from 'react'

type Updater<Value> = (value: Value) => void

export default function useAsyncReference<Value>(
  value: Value,
  isProp = true,
): [MutableRefObject<Value>, Updater<Value>] {
  const ref = useRef(value)
  const [, forceRender] = useState(false)

  if (isProp) {
    ref.current = value
  }

  return [
    ref,
    (newValue) => {
      if (!Object.is(ref.current, newValue)) {
        ref.current = newValue
        forceRender((flag) => !flag)
      }
    },
  ]
}
