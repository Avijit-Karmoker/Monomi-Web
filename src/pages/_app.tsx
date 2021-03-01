import { useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import theme from '@/utils/theme'
import { CssBaseline } from '@material-ui/core'

export const cache = createCache({ key: 'css', prepend: true })

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <CacheProvider value={cache}>
      <Head>
        <title>Monomi</title>
        <link rel='manifest' href='/site.webmanifest' />
        <link
          rel='shortcut icon'
          type='image/x-icon'
          href='/assets/images/favicon.ico'
        />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='theme-color' content={theme.palette.primary.main} />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
