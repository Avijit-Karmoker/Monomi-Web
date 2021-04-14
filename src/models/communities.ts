import { createModel } from '@rematch/core'

import API from '@/utils/API'
import { RootModel } from '.'
import {
  Checkout,
  CheckoutPayload,
  CommunitiesState,
  Community,
  CreatePaymentIntentPayload,
  CreatePaymentSubscriptionPayload,
  PaymentClientMeta,
  PaymentIntent,
  PaymentSubscription,
} from '@/typings'

const initialState: CommunitiesState = {
  list: [],
  meta: { ...API.initialListMeta },
  community: null,
  posts: [],
  postsMeta: { ...API.initialListMeta },
  feed: [],
  feedMeta: { ...API.initialListMeta },
  checkout: null,
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
    setCheckout(state, checkout: CommunitiesState['checkout']) {
      return { ...state, checkout }
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
    async fetchCheckout(payload: CheckoutPayload, state) {
      const { id } = state.communities.community!
      const { data } = await API.post<Checkout>(
        `communities/${id}/checkouts`,
        payload,
      )

      dispatch.communities.setCheckout(data)
    },
    async subscribe(payload: CreatePaymentSubscriptionPayload) {
      const { data } = await API.post<PaymentSubscription>(
        'payments/subscriptions',
        payload,
      )

      return data
    },
    async unsubscribe({ id }: Pick<PaymentSubscription, 'id'>) {
      await API.delete(`payments/subscriptions/${id}`)
    },
    async createPaymentIntent(payload: CreatePaymentIntentPayload) {
      const { meta } = await API.post<PaymentIntent, PaymentClientMeta>(
        'payments/intents',
        payload,
      )

      await dispatch.payments.confirmPayment(meta)
    },
  }),
})
