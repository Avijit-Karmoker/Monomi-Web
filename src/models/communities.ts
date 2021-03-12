import { createModel } from '@rematch/core'

import API from '@/utils/API'
import { RootModel } from '.'
import { CommunitiesState, Community, MerchantPost } from '@/typings'

const initialState: CommunitiesState = {
  community: null,
  posts: [],
  postsMeta: { ...API.initialListMeta },
}

export default createModel<RootModel>()({
  state: initialState,
  reducers: {
    setCommunity(state, community: CommunitiesState['community']) {
      return { ...state, community }
    },
    setPosts(
      state,
      { posts, postsMeta }: Pick<CommunitiesState, 'posts' | 'postsMeta'>,
    ) {
      return { ...state, posts, postsMeta }
    },
  },
  effects: (dispatch) => ({
    async fetchCommunity(id: Community['id']) {
      const { data } = await API.get<Community>(`communities/${id}`)

      dispatch.communities.setCommunity(data)
    },
    async fetchPosts(id: Community['id']) {
      const { data: posts, meta: postsMeta } = await API.get<
        CommunitiesState['posts'],
        CommunitiesState['postsMeta']
      >(`communities/${id}/posts`)

      dispatch.communities.setPosts({ posts, postsMeta })
    },
  }),
})
