import RippleButton from '@/components/RippleButton'
import { Dispatch, RootState } from '@/store'
import React, { FC, RefObject, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'reactstrap'
import type Stepper from 'bs-stepper'
import { CardElement, useElements } from '@stripe/react-stripe-js'
import colors from '@/utils/colors'

const Billing: FC<{ stepperRef: RefObject<Stepper> }> = ({ stepperRef }) => {
  const { methods } = useSelector(({ payments }: RootState) => ({
    methods: payments.methods,
  }))
  const { payments, ui } = useDispatch<Dispatch>()
  const { handleSubmit } = useForm()

  const elements = useElements()

  const submit = useCallback(async () => {
    const cardElement = elements?.getElement(CardElement)

    if (!cardElement) {
      return
    }

    try {
      if (methods.length) {
        const inactiveMethod = methods.find(
          ({ status }) => status === 'inactive',
        )

        if (inactiveMethod) {
          await payments.retryMethodAuthorization(inactiveMethod)
        }
      } else {
        await payments.createMethod(cardElement)
      }

      stepperRef.current?.next()
    } catch (error) {
      console.log({ error })
      const { message, code, errors, status } = error

      if (code !== 'cancelled') {
        ui.addToast({
          title:
            status === 402 ? errors[0].detail : 'Adding payment method failed',
          message: `Check details and retry.\n${message || ''}`,
          type: 'error',
        })
      }

      throw error
    }
  }, [elements, payments, stepperRef, methods])

  return (
    <Form className='d-flex flex-column' onSubmit={handleSubmit(submit)}>
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
      <RippleButton type='submit' className='mb-1 align-self-start'>
        Next
      </RippleButton>
    </Form>
  )
}

export default Billing
