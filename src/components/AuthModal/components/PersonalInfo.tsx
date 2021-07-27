import RippleButton from '@/components/Spinner/RippleButton'
import { RootState, Dispatch } from '@/store'
import { EntityAddress, OnboardingUserPayload } from '@/typings'
import { setAPIErrors } from '@/utils'
import React, { FC, RefObject, useCallback } from 'react'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
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
import Flatpickr from 'react-flatpickr'
import classnames from 'classnames'
import Select from 'react-select'
import { genders, defaultLanguage } from '@/config'
import { CountryRegionData } from 'react-country-region-selector'
import { useTranslation } from 'react-i18next'

const PersonalInfo: FC<{ stepperRef: RefObject<Stepper> }> = ({
  stepperRef,
}) => {
  const { user, locale } = useSelector(
    ({ authentication: { user }, global: { locale } }: RootState) => ({
      user,
      locale,
    }),
  )
  const dispatch = useDispatch<Dispatch>()
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<OnboardingUserPayload>({
    defaultValues: {
      birthDate: null,
      gender: null,
      ...user,
      address: {
        country:
          locale == defaultLanguage.id
            ? defaultLanguage.code
            : user?.address?.country,
      },
    },
  })

  const { t } = useTranslation('common')

  const update = useCallback(
    async (data: OnboardingUserPayload) => {
      try {
        clearErrors()

        await dispatch.user.updateUser(data)
        stepperRef.current!.next()
      } catch (error) {
        setAPIErrors(setError, error)
      }
    },
    [dispatch, clearErrors, setError, stepperRef],
  )

  return (
    <Form onSubmit={handleSubmit(update)}>
      <Row>
        <Col sm='12'>
          <FormGroup className='form-label-group'>
            <Input
              type='text'
              name='firstName'
              placeholder={t('firstName')}
              invalid={!!errors.firstName}
              innerRef={register({ required: true })}
            />
            <Label for='firstName'>{t('firstName')}</Label>
          </FormGroup>
          <FormGroup className='form-label-group'>
            <Input
              type='text'
              name='lastName'
              placeholder={t('lastName')}
              invalid={!!errors.lastName}
              innerRef={register({ required: true })}
            />
            <Label for='lastName'>{t('lastName')}</Label>
          </FormGroup>
          <FormGroup className='form-label-group'>
            <Controller
              control={control}
              id='birthDate'
              name='birthDate'
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <Flatpickr
                  defaultValue={value?.toString()}
                  onChange={([date]) => onChange(date)}
                  className={classnames('form-control flatpickr-input', {
                    'is-invalid': !!errors.birthDate,
                  })}
                  options={{
                    altInput: true,
                    altFormat: 'F j, Y',
                    dateFormat: 'Y-m-d',
                  }}
                  placeholder={t('select')}
                />
              )}
            />
            <Label for='birthDate'>{t('birthDate')}</Label>
            <FormFeedback>{errors.birthDate?.message}</FormFeedback>
          </FormGroup>
          <FormGroup className='form-label-group'>
            <Controller
              id='gender'
              name='gender'
              rules={{ required: true }}
              control={control}
              render={({ onChange, value }) => (
                <Select
                  defaultValue={value ? { label: value, value } : null}
                  onChange={(option) => onChange(option?.value)}
                  options={genders.map((value) => ({
                    label: t(`genders.${value}`),
                    value,
                  }))}
                  className={classnames('react-select', {
                    'is-invalid': !!errors.gender,
                  })}
                  classNamePrefix='select'
                  placeholder={t('select')}
                />
              )}
            />
            <Input type='hidden' name='gender' />
            <Label for='gender'>{t('gender')}</Label>
            <FormFeedback>{errors.gender?.message}</FormFeedback>
          </FormGroup>
          <FormGroup className='form-label-group'>
            <Controller
              control={control}
              id='address.country'
              name='address.country'
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <Select
                  defaultValue={
                    value
                      ? CountryRegionData.filter(
                          (item) =>
                            value.toLowerCase() === item[1].toLowerCase(),
                        ).map(([label, value]) => ({ label, value }))
                      : null
                  }
                  onChange={(option) => onChange(option?.value)}
                  options={CountryRegionData.map(([label, value]) => ({
                    label,
                    value,
                  }))}
                  className={classnames('react-select', {
                    'is-invalid': !!(errors.address as FieldErrors<EntityAddress>)
                      ?.country,
                  })}
                  classNamePrefix='select'
                  placeholder={t('select')}
                />
              )}
            />
            <Input type='hidden' name='address.country' />
            <Label for='address.country'>{t('country')}</Label>
            <FormFeedback>
              {(errors.address as FieldErrors<EntityAddress>)?.country?.message}
            </FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <RippleButton type='submit' className='mb-1'>
        {t('next')}
      </RippleButton>
    </Form>
  )
}

export default PersonalInfo
