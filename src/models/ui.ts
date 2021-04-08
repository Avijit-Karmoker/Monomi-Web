import { createModel } from '@rematch/core'

import { Toast, UIState } from '@/typings'
import { RootModel } from '.'

export default createModel<RootModel>()({
  state: {
    authModalOpen: false,
    joinModalOpen: false,
    toasts: [],
  } as UIState,
  reducers: {
    setAuthModalOpen(state, authModalOpen: UIState['authModalOpen']) {
      return {
        ...state,
        authModalOpen,
      }
    },
    setJoinModalOpen(state, joinModalOpen: UIState['joinModalOpen']) {
      return {
        ...state,
        joinModalOpen,
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
