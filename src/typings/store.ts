import { Device, Community, MerchantPost, ListMeta } from '.'

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
