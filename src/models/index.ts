import { Models } from '@rematch/core'

import global from './global'
import authentication from './authentication'
import merchants from './merchants'
import user from './user'
import communities from './communities'
import payments from './payments'
import ui from './ui'

export interface RootModel extends Models<RootModel> {
  authentication: typeof authentication
  merchants: typeof merchants
  user: typeof user
  communities: typeof communities
  payments: typeof payments
  global: typeof global
  ui: typeof ui
}

const models: RootModel = {
  authentication,
  merchants,
  user,
  communities,
  payments,
  global,
  ui,
}

export default models
