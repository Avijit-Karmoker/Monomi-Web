import { createModel } from '@rematch/core'

import API from '@/utils/API'
import { RootModel } from '.'
import { PaymentMethod, PaymentsState } from '@/typings'
import { modelConfig } from '@monomi/rematch'

export default createModel<RootModel>()({
  ...modelConfig.payments,
  effects: (dispatch) => ({
    ...modelConfig.payments.effects,
    async fetchMethods() {
      const { data } = await API.get<PaymentsState['methods']>(
        'payments/methods',
      )

      dispatch.payments.setMethods(data)
    },
    async deleteMethod({ id }: Pick<PaymentMethod, 'id'>) {
      await API.delete(`payments/methods/${id}`)
      await dispatch.payments.fetchMethods()
    },
    async fetchSubscriptions() {
      const { data } = await API.get<PaymentsState['subscriptions']>(
        'payments/subscriptions',
      )

      dispatch.payments.setSubscriptions(data)
    },
    async fetchIntents() {
      const { data } = await API.get<PaymentsState['intents']>(
        'payments/intents',
      )

      dispatch.payments.setIntents(data)
    },
    async fetchList() {
      const { data } = await API.get<PaymentsState['list']>('payments')

      dispatch.payments.setList(data)
    },
  }),
})
