import RippleButton from '@/components/RippleButton'
import { Dispatch } from '@/store'
import { CheckoutPayload } from '@/typings'
import { setAPIErrors } from '@/utils'
import React, { FC, RefObject, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap'
import type Stepper from 'bs-stepper'

const Amount: FC<{ stepperRef: RefObject<Stepper> }> = ({ stepperRef }) => {
  const { communities } = useDispatch<Dispatch>()
  const {
    register,
    errors,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<CheckoutPayload>()

  const authenticate = useCallback(
    async (data: CheckoutPayload) => {
      try {
        clearErrors()

        await communities.fetchCheckout(data)

        stepperRef.current?.next()
      } catch (error) {
        setAPIErrors(setError, error)
      }
    },
    [communities, clearErrors, setError, stepperRef],
  )

  return (
    <Form onSubmit={handleSubmit(authenticate)}>
      <Row>
        <Col sm='12'>
          <FormGroup className='form-label-group'>
            <InputGroup>
              <Input
                type='number'
                name='amount'
                placeholder='Amount'
                invalid={!!errors.amount}
                step='.01'
                innerRef={register({
                  required: true,
                  min: 1,
                  setValueAs: (value) => parseFloat(value) * 100,
                })}
              />
              <InputGroupAddon addonType='append'>
                <InputGroupText>&euro;</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <Label for='amount'>Amount</Label>
          </FormGroup>
        </Col>
      </Row>
      <RippleButton type='submit' className='mb-1'>
        Next
      </RippleButton>
    </Form>
  )
}

export default Amount
