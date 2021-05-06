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
  selectedId: null,
  subscription: null,
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
    setSelectedId(state, selectedId: CommunitiesState['selectedId']) {
      return { ...state, selectedId }
    },
    setSubscription(state, subscription: CommunitiesState['subscription']) {
      return { ...state, subscription }
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
    async subscribe(payload: CreatePaymentSubscriptionPayload, state) {
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
    async fetchSubscription(_, state) {
      const { selectedId } = state.communities
      let filter

      if (selectedId) {
        filter = { merchant: selectedId }
      }

      const {
        data: [subscription],
      } = await dispatch.payments.fetchSubscriptions({ filter })

      dispatch.communities.setSubscription(subscription || null)
    },
    async fetchUserData(_, state) {
      const { communities, authentication } = state
      const { selectedId } = communities

      if (selectedId) {
        await Promise.all([
          authentication.user
            ? dispatch.communities.fetchSubscription()
            : Promise.resolve(),
          dispatch.communities.fetchPosts(selectedId),
        ])
      }
    },
    async resetUserData(_, state) {
      const { selectedId } = state.communities

      dispatch.communities.setCheckout(null)
      dispatch.communities.setSubscription(null)

      if (selectedId) {
        await dispatch.communities.fetchPosts(selectedId)
      }
    },
  }),
})
