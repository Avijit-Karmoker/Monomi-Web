import { createMuiTheme } from '@material-ui/core/styles'
import colors from './colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.error,
    },
    background: {
      default: colors.background,
    },
  },
})

export default theme
