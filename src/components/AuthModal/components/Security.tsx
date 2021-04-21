import RippleButton from '@/components/RippleButton'
import { Dispatch, RootState } from '@/store'
import { PinPayload } from '@/typings'
import { setAPIErrors } from '@/utils'
import React, { FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'
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
import { useTranslation } from 'next-i18next'

type Payload = PinPayload & { pinRepeat: string }

const Security: FC<{ onSuccess?(): void }> = ({ onSuccess }) => {
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

  const { t } = useTranslation('common')

  const update = useCallback(
    async ({ pin }: Payload) => {
      try {
        clearErrors()

        await dispatch.user.updateUser({ pin })

        dispatch.ui.setAuthModalOpen(false)
        dispatch.ui.addToast({ title: t('signedIn'), type: 'success' })

        onSuccess?.()
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
              placeholder={t('pin')}
              invalid={!!errors.pin}
              innerRef={register({
                required: true,
                maxLength: 4,
                minLength: 4,
                validate: (value) =>
                  value.match(pinValidationRegExp)
                    ? (t('easyPin') as string)
                    : true,
              })}
            />
            <Label for='email'>{t('pin')}</Label>
            {errors.pin?.message ? (
              <FormFeedback>{errors.pin.message}</FormFeedback>
            ) : (
              <FormText>{t('create4DigitPin')}</FormText>
            )}
          </FormGroup>
          <FormGroup className='form-label-group'>
            <Input
              autoComplete='new-password'
              type='password'
              name='pinRepeat'
              placeholder={t('repeatPin')}
              invalid={!!errors.pinRepeat}
              innerRef={register({
                required: true,
                validate: (value) =>
                  value === getValues('pin') || (t('pinMatch') as string),
              })}
            />
            <Label for='email'>{t('repeatPin')}</Label>
            <FormFeedback>{errors.pinRepeat?.message}</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <RippleButton type='submit' className='mb-1'>
        {t('next')}
      </RippleButton>
    </Form>
  )
}

export default Security
