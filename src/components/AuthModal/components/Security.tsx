import RippleButton from '@/components/RippleButton'
import { Dispatch, RootState } from '@/store'
import { PinPayload } from '@/typings'
import { setAPIErrors } from '@/utils'
import React, { FC, useCallback } from 'react'
import { useForm, ValidateResult } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap'
import { pinValidationRegExp } from '@/config'

type Payload = PinPayload & { pinRepeat: string }

const Security: FC = () => {
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
    getValues,
  } = useForm<Payload>()

  const update = useCallback(
    async ({ pin }: Payload) => {
      try {
        clearErrors()

        await dispatch.user.updateUser({ pin })

        dispatch.ui.setAuthModalOpen(false)
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
              defaultValue={user?.email!}
              type='hidden'
            />
            <Input
              autoComplete='new-password'
              type='password'
              name='pin'
              placeholder='PIN'
              invalid={!!errors.pin}
              innerRef={register({
                required: true,
                maxLength: 4,
                minLength: 4,
                validate: (value) => !value.match(pinValidationRegExp),
              })}
            />
            <Label for='email'>PIN</Label>
            {errors.pin?.message ? (
              <FormFeedback>{errors.pin.message}</FormFeedback>
            ) : (
              <FormText>Create a PIN of 4 digits</FormText>
            )}
          </FormGroup>
          <FormGroup className='form-label-group'>
            <Input
              autoComplete='new-password'
              type='password'
              name='pinRepeat'
              placeholder='Repeat PIN'
              invalid={!!errors.pinRepeat}
              innerRef={register({
                required: true,
                validate: (value) =>
                  value === getValues('pin') || 'PINs must match',
              })}
            />
            <Label for='email'>Repeat PIN</Label>
            <FormFeedback>{errors.pinRepeat?.message}</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <RippleButton color='primary' type='submit' className='mb-1'>
        Next
      </RippleButton>
    </Form>
  )
}

export default Security
