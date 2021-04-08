import RippleButton from '@/components/RippleButton'
import { Dispatch, RootState } from '@/store'
import { PinPayload } from '@/typings'
import { setAPIErrors } from '@/utils'
import { setLanguage } from '@/utils/Internationalization'
import React, { FC, RefObject, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import type Stepper from 'bs-stepper'

const Login: FC<{ stepperRef: RefObject<Stepper> }> = () => {
  const { user } = useSelector(({ authentication: { user } }: RootState) => ({
    user,
  }))
  const dispatch = useDispatch<Dispatch>()
  const {
    register,
    errors,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<PinPayload>()

  const update = useCallback(
    async (payload: PinPayload) => {
      try {
        clearErrors()
      } catch (error) {
        setAPIErrors(setError, error)
      }
    },
    [dispatch, clearErrors, setError],
  )

  return (
    <Form onSubmit={handleSubmit(update)}>
      <Row>
        <Col sm='12'>
          <FormGroup className='form-label-group'>
            <Input
              autoComplete='username'
              defaultValue={user?.email || ''}
              type='hidden'
            />
            <Input
              autoComplete='current-password'
              type='password'
              name='pin'
              placeholder='PIN'
              invalid={!!errors.pin}
              innerRef={register({
                required: true,
                maxLength: 4,
                minLength: 4,
              })}
            />
            <Label for='email'>PIN</Label>
            <FormFeedback>{errors.pin?.message}</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <RippleButton color='primary' type='submit' className='mb-1'>
        Next
      </RippleButton>
    </Form>
  )
}

export default Login
