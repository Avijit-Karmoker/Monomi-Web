import { createModel } from '@rematch/core'

import { RootModel } from '.'
import { modelConfig } from '@monomi/rematch'

export default createModel<RootModel>()({
  ...modelConfig.merchants,
})
