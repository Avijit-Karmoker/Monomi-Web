import { createModel } from '@rematch/core'

import { Toast, UIState } from '@/typings'
import { RootModel } from '.'

export default createModel<RootModel>()({
  state: {
    authModalOpen: false,
    toasts: [],
  } as UIState,
  reducers: {
    setAuthModalOpen(state, authModalOpen: UIState['authModalOpen']) {
      return {
        ...state,
        authModalOpen,
      }
    },
    addToast(state, toast: Toast) {
      return { ...state, toasts: [...state.toasts, toast] }
    },
    clearToasts(state) {
      return { ...state, toasts: [] }
    },
  },
  effects: (dispatch) => ({}),
})
