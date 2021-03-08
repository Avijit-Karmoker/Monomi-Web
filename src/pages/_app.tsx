import React, { useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import theme from '@/utils/theme'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import { getPersistor } from '@rematch/persist'

export const cache = createCache({ key: 'css', prepend: true })

export default function App({ Component, pageProps }: AppProps) {
  console.log({ pageProps })
  const store = useStore(pageProps.initialReduxState)
  const persistor = getPersistor()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    store.dispatch.global.fetchDevice()
  }, [])

  return (
    <Provider store={store}>
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
          <meta name='theme-color' content={theme.colors.primary} />
        </Head>

        <ThemeProvider theme={theme}>
          <PersistGate persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}
