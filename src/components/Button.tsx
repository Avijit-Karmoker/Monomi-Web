import MaterialButton from '@material-ui/core/Button'
import { forwardRef } from 'react'

const Button = forwardRef<HTMLButtonElement>((props, ref) => (
  <MaterialButton variant='contained' {...props} ref={ref} />
))

export default Button
