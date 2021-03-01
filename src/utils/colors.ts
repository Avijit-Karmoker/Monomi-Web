const primary = '#003452'
const text = '#564e4e'

export default {
  primary,
  secondary: '#39B54A',
  background: '#f6f6f6',
  text,
  textInverse: hexToRgba(text, 0.3)!,
  light: hexToRgba(text, 0.1)!,
  lightBackground: '#eeeded',
  grey: hexToRgba(text, 0.6)!,
  overlay: hexToRgba('#222222', 0.6)!,
  error: '#ea5341',
  whiteOpaque: 'rgba(255, 255, 255, 0.6)',
  primaryInverse: hexToRgba(primary, 0.07)!,
  highlight: '#fffbcc',
}

export function hexToRgba(hex: string, opacity = 1) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return (
    result &&
    `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
      result[3],
      16,
    )}, ${opacity})`
  )
}
