import { Models } from '@rematch/core'

import { default as global } from './global'
import { default as authentication } from './authentication'
import { default as merchants } from './merchants'
import { default as user } from './user'
import { default as communities } from './communities'
import { default as payments } from './payments'

export interface RootModel extends Models<RootModel> {
  authentication: typeof authentication
  merchants: typeof merchants
  user: typeof user
  communities: typeof communities
  payments: typeof payments
  global: typeof global
}

const models: RootModel = {
  authentication,
  merchants,
  user,
  communities,
  payments,
  global,
}

export default models
