import { Models } from '@rematch/core'

import { default as global } from './global'
import { default as authentication } from './authentication'
import { default as merchants } from './merchants'
import { default as user } from './user'
import { default as communities } from './communities'
import { default as payments } from './payments'
import { default as ui } from './ui'

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
