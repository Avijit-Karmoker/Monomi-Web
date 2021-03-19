import RippleButton from '@/components/RippleButton'
import { Dispatch, RootState } from '@/store'
import { PinPayload } from '@/typings'
import { setAPIErrors } from '@/utils'
import { setLanguage } from '@/utils/Internationalization'
import React, { FC, useCallback } from 'react'
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

const Login: FC = () => {
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

        await dispatch.authentication.login(payload)

        const { localization } = await dispatch.user.fetchUser()

        await setLanguage(localization)

        dispatch.ui.setAuthModalOpen(false)
        dispatch.ui.addToast({ title: 'Signed in', type: 'success' })
      } catch (error) {
        if (error.status === 401) {
          setError('pin', { type: 'server' })
        } else if (error.status === 403) {
          setError('pin', { type: 'server' })

          const [{ title, detail }] = error.errors
          dispatch.ui.addToast({ title, message: detail, type: 'warning' })
        } else {
          setAPIErrors(setError, error)
        }
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
