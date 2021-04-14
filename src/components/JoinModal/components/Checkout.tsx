import RippleButton from '@/components/RippleButton'
import { Dispatch, RootState } from '@/store'
import React, { FC, RefObject, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import type Stepper from 'bs-stepper'
import { formatMoney } from '@/utils'
import { DateTime } from 'luxon'

const Checkout: FC<{ stepperRef: RefObject<Stepper> }> = () => {
  const { checkout, methods, community } = useSelector(
    ({ payments, communities }: RootState) => ({
      checkout: communities.checkout,
      community: communities.community,
      methods: payments.methods,
    }),
  )
  const { communities, ui } = useDispatch<Dispatch>()

  const submit = useCallback(async () => {
    try {
      const amounts = {
        amount: checkout!.amount.value,
        feeAndTax: checkout!.feeAndTax.value,
        totalAmount: checkout!.totalAmount.value,
        currency: 'eur',
      }

      await communities.subscribe({
        amount: amounts.amount,
        currency: amounts.currency,
        merchantId: community!.id,
        frequency: 'month',
      })

      await communities.createPaymentIntent({
        ...amounts,
        recipientId: community!.id,
        scheduledAt: DateTime.local().toISO(),
      })

      ui.addToast({
        title: 'Payment successful',
        message: 'You are now a member',
        type: 'success',
      })

      ui.setJoinModalOpen(false)
    } catch (error) {
      console.log({ error })
      const { message, code, errors, status } = error

      if (code !== 'cancelled') {
        ui.addToast({
          title: status === 402 ? errors[0].detail : 'Payment method failed',
          message: `Check details and retry.\n${message || ''}`,
          type: 'error',
        })
      }
    }
  }, [checkout, communities, ui])
  const paymentMethod = methods.length ? methods[0] : null

  return (
    <Row>
      <Col sm='12' className='checkout-options'>
        <div className='price-details'>
          <label className='section-label mb-1'>Payment method</label>
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
          <label className='section-label mb-1'>Price details</label>
          {checkout ? (
            <>
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title'>
                    {community!.name} membership
                  </div>
                  <div className='detail-amt'>
                    {formatMoney(checkout.amount)}
                  </div>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Fee & Tax</div>
                  <div className='detail-amt'>
                    {formatMoney(checkout.feeAndTax)}
                  </div>
                </li>
              </ul>
              <hr />
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title detail-total'>Total</div>
                  <div className='detail-amt font-weight-bolder'>
                    {formatMoney(checkout.totalAmount)}
                  </div>
                </li>
              </ul>
            </>
          ) : null}

          <RippleButton block color='primary' onClick={submit} className='mb-1'>
            Pay
          </RippleButton>
        </div>
      </Col>
    </Row>
  )
}

export default Checkout
