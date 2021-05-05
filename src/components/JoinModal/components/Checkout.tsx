import RippleButton from '@/components/RippleButton'
import { Dispatch, RootState, useStore } from '@/store'
import React, { FC, RefObject, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import type Stepper from 'bs-stepper'
import { formatMoney } from '@/utils'
import { DateTime } from 'luxon'
import { useTranslation } from 'next-i18next'

const Checkout: FC<{ stepperRef: RefObject<Stepper> }> = () => {
  const store = useStore()
  const { checkout, community, paymentMethod } = useSelector(
    (rootState: RootState) => ({
      checkout: rootState.communities.checkout,
      community: rootState.communities.community,
      paymentMethod: store.select.payments.activePaymentMethod(rootState),
    }),
  )
  const { communities, ui } = useDispatch<Dispatch>()

  const { t } = useTranslation(['common', 'community'])

  const submit = useCallback(async () => {
    try {
      const subscriptionAmount = {
        amount: checkout!.amount.value,
        currency: 'eur',
      }

      const subscription = await communities.subscribe({
        ...subscriptionAmount,
        merchantId: community!.id,
        frequency: 'monthly',
      })

      await communities.createPaymentIntent({
        ...subscriptionAmount,
        subscriptionId: subscription.id,
        feeAndTax: checkout!.feeAndTax.value,
        totalAmount: checkout!.totalAmount.value,
        recipientId: community!.id,
        scheduledAt: DateTime.local().toISO(),
      })

      setTimeout(communities.fetchUserData, 1000)

      ui.addToast({
        title: t('community:paymentSuccessful'),
        message: t('community:nowAMember'),
        type: 'success',
      })

      ui.setJoinModalOpen(false)
    } catch (error) {
      const { message, code, errors, status } = error

      if (code !== 'cancelled') {
        ui.addToast({
          title:
            status === 402
              ? errors[0].detail
              : t('community:paymentMethodFailed'),
          message: `${t('community:checkDetailsAndRetry')}${message || ''}`,
          type: 'error',
        })
      }
    }
  }, [checkout, communities, ui, community])

  return (
    <Row>
      <Col sm='12' className='checkout-options'>
        <div className='price-details'>
          <label className='section-label mb-1'>
            {t('community:paymentMethod')}
          </label>
          <ul className='list-unstyled'>
            <li className='price-detail'>
              <div className='detail-title'>
                {paymentMethod?.details.scheme?.toLocaleUpperCase()}
              </div>
              <div className='detail-amt'>
                {paymentMethod?.details.lastFour?.padStart(16, '*')}
              </div>
            </li>
          </ul>
          <hr />
          <label className='section-label mb-1'>
            {t('community:priceDetails')}
          </label>
          {checkout ? (
            <>
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title'>
                    {community!.name} {t('community:membership')}
                  </div>
                  <div className='detail-amt'>
                    {formatMoney(checkout.amount)}
                  </div>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>{t('community:feeAndTax')}</div>
                  <div className='detail-amt'>
                    {formatMoney(checkout.feeAndTax)}
                  </div>
                </li>
              </ul>
              <hr />
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title detail-total'>{t('total')}</div>
                  <div className='detail-amt font-weight-bolder'>
                    {formatMoney(checkout.totalAmount)}
                  </div>
                </li>
              </ul>
            </>
          ) : null}

          <RippleButton block onClick={submit} className='mb-1'>
            {t('community:pay')}
          </RippleButton>
        </div>
      </Col>
    </Row>
  )
}

export default Checkout
