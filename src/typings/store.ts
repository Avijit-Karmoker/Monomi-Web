import { Device, Community, CommunityPost, ListMeta } from '.'
import { Toast } from './ui'

export interface GlobalState {
  device: Device | null
}

export interface CommunitiesState {
  list: Community[]
  meta: ListMeta
  community: Community | null
  posts: CommunityPost[]
  postsMeta: ListMeta
  feed: CommunityPost[]
  feedMeta: ListMeta
}

export interface UIState {
  authModalOpen: boolean
  toasts: Toast[]
}
