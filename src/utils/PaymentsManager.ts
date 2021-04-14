import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js'
import { PaymentProvider } from '@/typings'

const PaymentsManager = {
  instance: null as null | Stripe,
  async initialize(provider: PaymentProvider) {
    if (provider.providerName !== 'stripe') {
      throw provider
    }

    this.instance = await loadStripe(provider.clientSideKey)

    return this.instance
  },
  async createPaymentMethod(card: StripeCardElement) {
    const result = await this.instance!.createPaymentMethod({
      type: 'card',
      card,
    })

    if (result.paymentMethod?.card) {
      const { exp_month, exp_year, ...cardDetails } = result.paymentMethod.card

      return {
        ...result,
        paymentMethod: {
          ...result.paymentMethod,
          card: {
            ...cardDetails,
            expMonth: exp_month,
            expYear: exp_year,
          },
        },
      }
    }

    return result
  },
  async confirmPaymentMethod(clientSecret: string, paymentMethodId: string) {
    return this.instance!.confirmCardSetup(clientSecret, {
      payment_method: paymentMethodId,
    })
  },
  async confirmPayment(clientSecret: string) {
    return this.instance!.confirmCardPayment(clientSecret)
  },
}

export default PaymentsManager
