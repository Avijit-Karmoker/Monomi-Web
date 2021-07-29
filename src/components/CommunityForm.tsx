import { RootState } from '@/store'
import { EntityAddress, OnboardingUserPayload } from '@/typings'
import React from 'react'
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
  ChangeHandler,
} from 'react-hook-form'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { defaultLanguage } from '@/config'
import Select from 'react-select'
import classnames from 'classnames'
import { CountryRegionData } from 'react-country-region-selector'

type Inputs = {
  className: string
  children: string
  name: string
  profit: string
  entityName: string
  entityCode: string
  entityVat: any
  email: string
  id: string
}

export default function CommunityForm() {
  const { user, locale } = useSelector(
    ({ authentication: { user }, global: { locale } }: RootState) => ({
      user,
      locale,
    }),
  )
  const {
    control,
    formState: {},
  } = useForm<OnboardingUserPayload>({
    defaultValues: {
      ...user,
      address: {
        country:
          locale == defaultLanguage.id
            ? defaultLanguage.code
            : user?.address?.country,
      },
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const { t } = useTranslation('common')

  const ValidateEmail = (event: any) => {
    if (event.target.name === 'email') {
      const isValidEmail =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          event.target.value,
        )
      console.log(isValidEmail)
    } else {
      alert('You have entered an invalid email address!')
      return false
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} style={{height: '833px'}}>
        <label htmlFor='name'>{t('name')}</label> <br />
        <input
          {...register('name', { required: true })}
          id='name'
          placeholder={t('name')}
          className='form-control'
        />
        {errors.name && <span>{t('required')}</span>}
        <br />
        <label htmlFor='select'>{t('selectProfit')}</label> <br />
        <select {...register('profit')} id='select' className='form-control'>
          <option>{t('forProfit')}</option>
          <option>{t('nonProfit')}</option>
        </select>
        {errors.profit && <span>{t('required')}</span>} <br />
        <label htmlFor='entityName'>{t('entityName')}</label> <br />
        <input
          {...register('entityName', { required: true })}
          id='entityName'
          placeholder={t('entityName')}
          className='form-control'
        />
        {errors.entityName && <span>{t('required')}</span>}
        <br />
        <label htmlFor='entityCode'>{t('entityCode')}</label> <br />
        <input
          {...register('entityCode', { required: true })}
          id='entityCode'
          placeholder={t('entityCode')}
          className='form-control'
        />
        {errors.entityCode && <span>{t('required')}</span>}
        <br />
        <label htmlFor='entityVat'>{t('entityVat')}</label> <br />
        <input
          {...register('entityVat', { required: true })}
          id='entityVat'
          placeholder={t('entityVat')}
          className='form-control'
        />
        {errors.entityVat && <span>{t('required')}</span>}
        <br />
        <label htmlFor='email'>{t('email')}</label> <br />
        <input
          {...register('email', { required: true })}
          id='email'
          placeholder={t('email')}
          onBlur={ValidateEmail}
          className='form-control'
        />
        {errors.email && <span>{t('required')}</span>}
        <br />
        <FormGroup className='form-label-group' style={{marginTop: '1.7em'}}>
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
                        (item) => value.toLowerCase() === item[1].toLowerCase(),
                      ).map(([label, value]) => ({ label, value }))
                    : null
                }
                
                options={CountryRegionData.map(([label, value]) => ({
                  label,
                  value,
                }))}
                const onChange={(option) => onChange(option?.value)}
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
          <Label for='address.country' style={{color: '#A4A1B0 !important'}}>{t('country')}</Label>
          <FormFeedback>
            {(errors.address as FieldErrors<EntityAddress>)?.country?.message}
          </FormFeedback>
        </FormGroup>
        <input type='submit' />
      </form>
    </div>
  )
}
