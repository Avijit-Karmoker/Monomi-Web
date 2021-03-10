import { Device, Merchant } from '.'

export interface GlobalState {
  device: Device | null
}

export interface CommunitiesState {
  community: Merchant | null
}
