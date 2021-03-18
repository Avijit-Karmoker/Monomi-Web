import { Device, Community, MerchantPost, ListMeta } from '.'
import { Toast } from './ui'

export interface GlobalState {
  device: Device | null
}

export interface CommunitiesState {
  list: Community[]
  meta: ListMeta
  community: Community | null
  posts: MerchantPost[]
  postsMeta: ListMeta
}

export interface UIState {
  authModalOpen: boolean
  toasts: Toast[]
}
