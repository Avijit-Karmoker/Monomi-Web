import {
  Device,
  Community,
  CommunityPost,
  ListMeta,
  Checkout,
  PaymentSubscription,
} from '.'
import { Toast } from './ui'

export interface GlobalState {
  device: Device | null
  locale: string
}

export interface CommunitiesState {
  list: Community[]
  meta: ListMeta
  community: Community | null
  posts: CommunityPost[]
  postsMeta: ListMeta
  feed: CommunityPost[]
  feedMeta: ListMeta
  checkout: Checkout | null
  selectedId: string | null
  subscription: PaymentSubscription | null
}

export interface UIState {
  authModalOpen: boolean
  joinModalOpen: boolean
  toasts: Toast[]
}
