import { createModel } from '@rematch/core'

import API from '@/utils/API'
import { RootModel } from '.'
import { CommunitiesState, Community } from '@/typings'

const initialState: CommunitiesState = {
  list: [],
  meta: { ...API.initialListMeta },
  community: null,
  posts: [],
  postsMeta: { ...API.initialListMeta },
  feed: [],
  feedMeta: { ...API.initialListMeta },
}

export default createModel<RootModel>()({
  state: initialState,
  reducers: {
    setList(
      state: CommunitiesState,
      { list, meta }: Pick<CommunitiesState, 'list' | 'meta'>,
    ) {
      return { ...state, list, meta }
    },
    setCommunity(state, community: CommunitiesState['community']) {
      return { ...state, community }
    },
    setPosts(
      state,
      { posts, postsMeta }: Pick<CommunitiesState, 'posts' | 'postsMeta'>,
    ) {
      return { ...state, posts, postsMeta }
    },
    setFeed(
      state,
      { feed, feedMeta }: Pick<CommunitiesState, 'feed' | 'feedMeta'>,
    ) {
      return { ...state, feed, feedMeta }
    },
  },
  effects: (dispatch) => ({
    async fetchList() {
      const { data: list, meta } = await API.get<
        CommunitiesState['list'],
        CommunitiesState['meta']
      >('communities')

      dispatch.communities.setList({ list, meta })
    },
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
    async fetchFeed() {
      const { data: feed, meta: feedMeta } = await API.get<
        CommunitiesState['feed'],
        CommunitiesState['feedMeta']
      >(`communities/feed`)

      dispatch.communities.setFeed({ feed, feedMeta })
    },
  }),
})
