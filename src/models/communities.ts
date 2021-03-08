import { createModel } from '@rematch/core'

import API from '@/utils/API'
import { RootModel } from '.'
import {
  CreatePaymentSubscriptionPayload,
  PaymentSubscription,
} from '@/typings'
import { modelConfig } from '@monomi/rematch'

export default createModel<RootModel>()({
  ...modelConfig.communities,
  effects: (dispatch) => ({
    async subscribe(payload: CreatePaymentSubscriptionPayload) {
      const { data } = await API.post<PaymentSubscription>(
        'payments/subscriptions',
        payload,
      )

      return data
    },
    async unsubscribe({ id }: Pick<PaymentSubscription, 'id'>) {
      await API.delete(`payments/subscriptions/${id}`)
    },
  }),
})
