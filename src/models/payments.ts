import { createModel } from '@rematch/core'
import { StripeCardElement } from '@stripe/stripe-js'
import API from '@/utils/API'
import { RootModel } from '.'
import {
  CreatePaymentMethodPayload,
  PaymentClientMeta,
  PaymentMethod,
  PaymentProvider,
  PaymentsState,
} from '@/typings'
import { modelConfig } from '@monomi/rematch'
import PaymentsManager from '@/utils/PaymentsManager'

export default createModel<RootModel>()({
  ...modelConfig.payments,
  reducers: {
    ...modelConfig.payments.reducers,
    reset(state) {
      return { ...state, methods: [] }
    },
  },
  effects: (dispatch) => ({
    ...modelConfig.payments.effects,
    async fetchProvider(_, state) {
      const { provider } = state.payments

      if (provider) {
        return
      }

      const { data } = await API.get<PaymentProvider>('payments/providers')

      await PaymentsManager.initialize(data)

      dispatch.payments.setProvider(data)
    },
    async createMethod(cardElement: StripeCardElement, state) {
      const { provider } = state.payments
      const {
        error,
        paymentMethod,
      } = await PaymentsManager.createPaymentMethod(cardElement)

      if (!paymentMethod) {
        throw error
      }

      const { id, card, type } = paymentMethod
      const payload: CreatePaymentMethodPayload = {
        providerName: provider!.providerName,
        providerPaymentMethodId: id,
        type,
        details: {
          ...card,
          scheme: card?.brand,
          lastFour: card?.last4,
        },
      }
      const { data, meta } = await API.post<PaymentMethod, PaymentClientMeta>(
        'payments/methods',
        payload,
      )

      dispatch.payments.addMethod(data)

      if (meta.clientSecret) {
        const result = await PaymentsManager.confirmPaymentMethod(
          meta.clientSecret,
          id,
        )

        if (result.error) {
          throw result
        }
      }

      dispatch.payments.changeMethod({ id: data.id, status: 'active' })
    },
    async retryMethodAuthorization({ id }: Pick<PaymentMethod, 'id'>) {
      const { data, meta } = await API.post<PaymentMethod, PaymentClientMeta>(
        `payments/methods/${id}/retry`,
      )

      if (meta.clientSecret) {
        const result = await PaymentsManager.confirmPaymentMethod(
          meta.clientSecret,
          data.providerPaymentMethodId!,
        )

        if (result.error) {
          throw result
        }

        dispatch.payments.changeMethod({ id, status: 'active' })
      }
    },
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
    async confirmPayment({ clientSecret }: PaymentClientMeta) {
      if (clientSecret) {
        try {
          const result = await PaymentsManager.confirmPayment(clientSecret)

          if (result.error) {
            throw result
          }
        } catch (error) {
          if (error.code !== 'invalidRequest') {
            throw error
          }
        }
      }
    },
    async fetchInitialPaymentData() {
      await Promise.all([
        dispatch.payments.fetchProvider(),
        dispatch.payments.fetchMethods(),
      ])
    },
  }),
  selectors: (slice) => ({
    activePaymentMethod() {
      return slice(({ methods }) =>
        methods.find(({ status }) => status === 'active'),
      )
    },
  }),
})
