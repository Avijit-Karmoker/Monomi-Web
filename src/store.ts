import {
  init,
  RematchRootState,
  RematchDispatch,
  RematchStore,
} from '@rematch/core'
import selectPlugin from '@rematch/select'
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading'
import persistPlugin, { getPersistor } from '@rematch/persist'
import logger from 'redux-logger'
import { Middleware } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import { useMemo } from 'react'

import { provideImplementation } from '@monomi/rematch'
import API from '@/utils/API'
import models, { RootModel } from './models'

provideImplementation('API', API)

type FullModel = ExtraModelsFromLoading<RootModel>

const middlewares: Middleware[] = []
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

let store: RematchStore<RootModel, FullModel> | null = null

export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel, FullModel>

function createStore() {
  return init<RootModel, FullModel>({
    models,
    plugins: [
      selectPlugin(),
      loadingPlugin(),
      persistPlugin({
        key: 'root',
        storage,
        whitelist: ['authentication'],
      }),
    ],
    redux: {
      middlewares,
    },
  })
}

export function connect<TOwnProps = void>(
  mapStateToProps?: ((state: RootState, ownProps: TOwnProps) => any) | null,
  mapDispatchToProps?: ((dispatch: Dispatch) => any) | null,
): any {
  return reduxConnect(mapStateToProps, mapDispatchToProps)
}

export function waitForPersistor() {
  return new Promise((resolve) => {
    const persistor = getPersistor()

    const bootstrapped = () => persistor.getState().bootstrapped

    if (bootstrapped()) {
      resolve(true)
    } else {
      const unsubscribe = persistor.subscribe(() => {
        if (bootstrapped()) {
          unsubscribe()
          resolve(true)
        }
      })
    }
  })
}

export const initializeStore = (preloadedState: any) => {
  console.log({ preloadedState })
  let _store = store ?? createStore()

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = createStore()
    // Reset the current store
    store = null
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState: any) {
  console.log({ initialState })
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

export default store
