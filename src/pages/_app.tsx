import React, { useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import theme from '@/utils/theme'
import { Provider as StoreProvider } from 'react-redux'
import { useStore } from '../store'
import { fonts } from '../config'
import { PersistGate } from 'redux-persist/integration/react'
import { getPersistor } from '@rematch/persist'
import Layout from '@/components/Layout'
import { Provider as SessionProvider } from 'next-auth/client'
import { appWithTranslation } from 'next-i18next'

import '@/components/RippleButton/index.scss'
import '@/styles/iconfont.css'
import '@/styles/scss/index.scss'
import { useRouter } from 'next/router'

export const cache = createCache({ key: 'css', prepend: true })

function App({ Component, pageProps }: AppProps) {
  console.log({ pageProps })
  const store = useStore(pageProps.initialReduxState)
  const persistor = getPersistor()
  const router = useRouter()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    const { fetchDevice, setLocale } = store.dispatch.global

    if (router.locale) {
      setLocale(router.locale)
    }

    fetchDevice()
  }, [])

  return (
    <SessionProvider session={pageProps.session}>
      <StoreProvider store={store}>
        <CacheProvider value={cache}>
          <Head>
            <title>Monomi</title>
            <link rel='manifest' href='/site.webmanifest' />
            <link
              rel='shortcut icon'
              type='image/x-icon'
              href='/assets/images/favicon.ico'
            />
            <meta
              name='viewport'
              content='initial-scale=1, width=device-width'
            />
            <meta name='theme-color' content={theme.colors.primary} />
            <link rel='stylesheet' href={fonts.url} />
            <link
              rel='stylesheet'
              href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css'
            />
            <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js'></script>
          </Head>

          <ThemeProvider theme={theme}>
            <PersistGate persistor={persistor}>
              {router.route === '/' ? (
                <Component {...pageProps} />
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </PersistGate>
          </ThemeProvider>
        </CacheProvider>
      </StoreProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(App)
