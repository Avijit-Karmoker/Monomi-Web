import RippleButton from '@/components/RippleButton'
import { Dispatch, RootState } from '@/store'
import { PinPayload } from '@/typings'
import { setAPIErrors } from '@/utils'
import { useRouter } from 'next/router'
import React, { FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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

const Login: FC<{ onSuccess?(): void }> = ({ onSuccess }) => {
  const { user, locale } = useSelector(
    ({ authentication: { user }, global }: RootState) => ({
      user,
      locale: global.locale,
    }),
  )
  const dispatch = useDispatch<Dispatch>()
  const {
    register,
    errors,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<PinPayload>()
  const router = useRouter()

  const { t } = useTranslation('common')

  const update = useCallback(
    async (payload: PinPayload) => {
      try {
        clearErrors()

        await dispatch.authentication.login(payload)

        dispatch.ui.setAuthModalOpen(false)
        dispatch.ui.addToast({ title: t('signedIn'), type: 'success' })

        const [{ localization }] = await Promise.all([
          dispatch.user.fetchUser(),
          dispatch.communities.fetchUserData(),
        ])
        if (localization !== locale) {
          router.replace(router.asPath, router.asPath, {
            locale: localization,
          })
        }

        onSuccess?.()
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
    [dispatch, clearErrors, setError, router, locale],
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
              placeholder={t('pin')}
              invalid={!!errors.pin}
              innerRef={register({
                required: true,
                maxLength: 4,
                minLength: 4,
              })}
            />
            <Label for='email'>{t('pin')}</Label>
            <FormFeedback>{errors.pin?.message}</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <RippleButton type='submit' className='mb-1'>
        {t('next')}
      </RippleButton>
    </Form>
  )
}

export default Login
