import { Device, Community, MerchantPost, ListMeta } from '.'

export interface GlobalState {
  device: Device | null
}

export interface CommunitiesState {
  community: Community | null
  posts: MerchantPost[]
  postsMeta: ListMeta
}
