import RippleButton from '@/components/RippleButton'
import { RootState, Dispatch } from '@/store'
import { AuthenticationPayload } from '@/typings'
import { setAPIErrors } from '@/utils'
import React, { FC, RefObject, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap'
import type Stepper from 'bs-stepper'
import { useTranslation } from 'next-i18next'

const Account: FC<{ stepperRef: RefObject<Stepper> }> = ({ stepperRef }) => {
  const { user } = useSelector(({ authentication: { user } }: RootState) => ({
    user,
  }))
  const { authentication } = useDispatch<Dispatch>()
  const {
    register,
    errors,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<AuthenticationPayload>()

  const { t } = useTranslation('common')

  const authenticate = useCallback(
    async (data: AuthenticationPayload) => {
      try {
        clearErrors()

        await authentication.authenticate(data)

        stepperRef.current?.next()
      } catch (error) {
        if (error.status === 409) {
          stepperRef.current?.next()
        } else {
          setAPIErrors(setError, error)
        }
      }
    },
    [authentication, clearErrors, setError, stepperRef],
  )

  return (
    <Form onSubmit={handleSubmit(authenticate)}>
      <Row>
        <Col sm='12'>
          <FormGroup className='form-label-group'>
            <Input
              autoComplete='username'
              defaultValue={user?.email || ''}
              type='text'
              name='email'
              placeholder={t('email')}
              invalid={!!errors.email}
              innerRef={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            <Label for='email'>{t('email')}</Label>
            <FormText className='text-muted'>
              {t('continueAgreeToTermsAndConditions')}
            </FormText>
          </FormGroup>
        </Col>
      </Row>
      <RippleButton type='submit' className='mb-1'>
        {t('next')}
      </RippleButton>
    </Form>
  )
}

export default Account
