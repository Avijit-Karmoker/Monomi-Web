import { RootState } from '@/store'
import { EntityAddress, OnboardingUserPayload } from '@/typings'
import React from 'react'
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from 'react-hook-form'
import {
  Col,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { defaultLanguage } from '@/config'
import Select from 'react-select'
import classnames from 'classnames'
import { CountryRegionData } from 'react-country-region-selector'
import dynamic from 'next/dynamic'

const EditorsContainer = dynamic(() => import('./TextEditor'), {
  ssr: false,
})

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
  city: string
  zip: string
  addressLine1: any
  businessCategory: string
}

export default function CommunityForm() {
  const { user, locale } = useSelector(
    ({ authentication: { user }, global: { locale } }: RootState) => ({
      user,
      locale,
    }),
  )
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <FormGroup
          className='form-label-group'
          style={{ marginTop: '1.7em', color: '#A4A1B0 !important' }}
        >
          <Controller
            control={control}
            id='address.country'
            name='address.country'
            rules={{ required: true }}
            render={({ value }) => (
              <Select
                defaultValue={
                  value
                    ? CountryRegionData.filter(
                        (item) => value.toLowerCase() === item[1].toLowerCase(),
                      ).map(([label, value]) => ({ label, value }))
                    : null
                }
                onChange={(option) => option?.value}
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
          <Label for='address.country' style={{ color: '#5E5873 !important' }}>
            {t('country')}
          </Label>
          <FormFeedback>
            {(errors.address as FieldErrors<EntityAddress>)?.country?.message}
          </FormFeedback>
        </FormGroup>
        <label htmlFor='city'>{t('city')}</label> <br />
        <input
          {...register('city', { required: true })}
          id='city'
          placeholder={t('city')}
          className='form-control'
        />
        {errors.city && <span>{t('required')}</span>}
        <br />
        <label htmlFor='zip'>{t('zip')}</label> <br />
        <input
          {...register('zip', { required: true })}
          id='zip'
          placeholder={t('zip')}
          className='form-control'
        />
        {errors.zip && <span>{t('required')}</span>}
        <br />
        <label htmlFor='addressLine1'>{t('addressLine1')}</label> <br />
        <input
          {...register('addressLine1', { required: true })}
          id='addressLine1'
          placeholder={t('addressLine1')}
          className='form-control'
        />
        {errors.addressLine1 && <span>{t('required')}</span>}
        <br />
        <label htmlFor='addressLine2'>{t('addressLine2')}</label> <br />
        <input
          {...register('addressLine2')}
          id='addressLine2'
          placeholder={t('addressLine2')}
          className='form-control'
        />
        <br />
        <label htmlFor='businessCategory'>{t('businessCategory')}</label> <br />
        <input
          {...register('businessCategory', { required: true })}
          id='businessCategory'
          placeholder={t('businessCategory')}
          className='form-control'
        />
        {errors.businessCategory && <span>{t('required')}</span>}
        <br />
        <EditorsContainer />
        <FormGroup row>
          <Label for='logo' sm={12} md={12} lg={12}>
            {t('logo')}
          </Label>
          <Col sm={12} md={12} lg={12}>
            <Input
              type='file'
              name='file'
              id='logo'
              required={true}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='cover' sm={12} md={12} lg={12}>
            {t('cover')}
          </Label>
          <Col sm={12} md={12} lg={12}>
            <Input
              type='file'
              name='file'
              id='cover'
              required={true}
            />
          </Col>
        </FormGroup>
        <input type='submit' />
      </form>
    </div>
  )
}
