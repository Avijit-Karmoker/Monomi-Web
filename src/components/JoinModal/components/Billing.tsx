import RippleButton from '@/components/RippleButton'
import { Dispatch, RootState } from '@/store'
import React, { FC, RefObject, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'reactstrap'
import type Stepper from 'bs-stepper'
import { CardElement, useElements } from '@stripe/react-stripe-js'
import colors from '@/utils/colors'
import { useTranslation } from 'react-i18next'

const Billing: FC<{ stepperRef: RefObject<Stepper> }> = ({ stepperRef }) => {
  const { methods } = useSelector(({ payments }: RootState) => ({
    methods: payments.methods,
  }))
  const { payments, ui } = useDispatch<Dispatch>()
  const { handleSubmit } = useForm()

  const { t } = useTranslation(['common', 'community'])

  const elements = useElements()

  const submit = useCallback(async () => {
    const cardElement = elements?.getElement(CardElement)

    if (!cardElement && !methods.length) {
      return
    }

    try {
      if (cardElement) {
        await payments.createMethod(cardElement)
      } else {
        const inactiveMethod = methods.find(
          ({ status }) => status === 'inactive',
        )

        if (inactiveMethod) {
          await payments.retryMethodAuthorization(inactiveMethod)
        }
      }

      stepperRef.current?.next()
    } catch (error) {
      const { message, code, errors, status } = error

      if (code !== 'cancelled') {
        ui.addToast({
          title:
            status === 402
              ? errors[0].detail
              : t('community:addingPaymentMethodFailed'),
          message: `${t('community:checkDetailsAndRetry')}${message || ''}`,
          type: 'error',
        })
      }

      throw error
    }
  }, [elements, payments, stepperRef, methods])

  const initialPaymentMethod = useMemo(
    () => (methods.length ? methods[0] : null),
    [],
  )

  return (
    <Form className='d-flex flex-column' onSubmit={handleSubmit(submit)}>
      {initialPaymentMethod ? (
        <h5>
          {initialPaymentMethod.details.scheme?.toLocaleUpperCase()}{' '}
          {initialPaymentMethod.details.lastFour?.padStart(16, '*')}
        </h5>
      ) : (
        <CardElement
          className='form-group'
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontFamily: 'Montserrat',
                fontSize: '14px',
                color: colors.primary,
                '::placeholder': {
                  color: colors.textInverse,
                },
              },
              invalid: {
                color: colors.error,
              },
            },
          }}
        />
      )}
      <RippleButton type='submit' className='mb-1 align-self-start'>
        {t('next')}
      </RippleButton>
    </Form>
  )
}

export default Billing
