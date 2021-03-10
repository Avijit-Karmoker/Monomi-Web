import { createModel } from '@rematch/core'

import API from '@/utils/API'
import { RootModel } from '.'
import { Merchant, CommunitiesState } from '@/typings'

const initialState: CommunitiesState = {
  community: null,
}

export default createModel<RootModel>()({
  state: initialState,
  reducers: {
    setCommunity(state, community: CommunitiesState['community']) {
      return { ...state, community }
    },
  },
  effects: (dispatch) => ({
    async fetchCommunity(id: Merchant['id']) {
      const { data } = await API.get(`communities/${id}`)

      dispatch.communities.setCommunity(data)
    },
  }),
})
