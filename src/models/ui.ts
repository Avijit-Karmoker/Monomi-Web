import { createModel } from '@rematch/core'

import { UIState } from '@/typings'
import { RootModel } from '.'

export default createModel<RootModel>()({
  state: {
    authModalOpen: false,
  } as UIState,
  reducers: {
    setAuthModalOpen(state, authModalOpen: UIState['authModalOpen']) {
      return {
        ...state,
        authModalOpen,
      }
    },
  },
  effects: (dispatch) => ({}),
})
