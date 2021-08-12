import { RootState } from '@/store'
import { CreateCommunityPayload, EntityAddress } from '@/typings'
import React from 'react'
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from 'react-hook-form'
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
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
import RippleButton from './RippleButton'


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
  } = useForm<CreateCommunityPayload>({
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

  const { t } = useTranslation('community')

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
      <FormGroup onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor='name'>{t('community:name')}</Label> <br />
        <Input
          {...register('name', { required: true })}
          id='name'
          placeholder={t('community:name')}
          className='form-control'
        />
        <FormFeedback>{errors.name?.message}</FormFeedback>
        <br />
        <Label htmlFor='select'>{t('community:selectProfit')}</Label> <br />
        <select {...register('profit')} id='select' className='form-control'>
          <option>{t('community:forProfit')}</option>
          <option>{t('community:nonProfit')}</option>
        </select>
        <FormFeedback>{errors.profit?.message}</FormFeedback> <br />
        <Label htmlFor='entityName'>{t('community:entityName')}</Label> <br />
        <Input
          {...register('entityName', { required: true })}
          id='entityName'
          placeholder={t('community:entityName')}
          className='form-control'
        />
        <FormFeedback>{errors.entityName?.message}</FormFeedback>
        <br />
        <Label htmlFor='entityCode'>{t('community:entityCode')}</Label> <br />
        <Input
          {...register('entityCode', { required: true })}
          id='entityCode'
          placeholder={t('community:entityCode')}
          className='form-control'
        />
        <FormFeedback>{errors.entityCode?.message}</FormFeedback>
        <br />
        <Label htmlFor='entityVat'>{t('community:entityVat')}</Label> <br />
        <Input
          {...register('entityVat', { required: true })}
          id='entityVat'
          placeholder={t('community:entityVat')}
          className='form-control'
        />
        <FormFeedback>{errors.entityVat?.message}</FormFeedback>
        <br />
        <Label htmlFor='email'>{t('community:email')}</Label> <br />
        <Input
          {...register('email', { required: true })}
          id='email'
          placeholder={t('community:email')}
          onBlur={ValidateEmail}
          className='form-control'
        />
        <FormFeedback>{errors.email?.message}</FormFeedback>
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
                placeholder={t('community:select')}
              />
            )}
          />
          <Input type='hidden' name='address.country' />
          <Label for='address.country' style={{ color: '#5E5873 !important' }}>
            {t('community:country')}
          </Label>
          <FormFeedback>
            {(errors.address as FieldErrors<EntityAddress>)?.country?.message}
          </FormFeedback>
        </FormGroup>
        <Label htmlFor='city'>{t('community:city')}</Label> <br />
        <Input
          {...register('city', { required: true })}
          id='city'
          placeholder={t('community:city')}
          className='form-control'
        />
        <FormFeedback>{errors.city?.message}</FormFeedback>
        <br />
        <Label htmlFor='zip'>{t('community:zip')}</Label> <br />
        <Input
          {...register('zip', { required: true })}
          id='zip'
          placeholder={t('community:zip')}
          className='form-control'
        />
        <FormFeedback>{errors.zip?.message}</FormFeedback>
        <br />
        <Label htmlFor='addressLine1'>{t('community:addressLine1')}</Label> <br />
        <Input
          {...register('addressLine1', { required: true })}
          id='addressLine1'
          placeholder={t('community:addressLine1')}
          className='form-control'
        />
        <FormFeedback>{errors.addressLine1?.message}</FormFeedback>
        <br />
        <Label htmlFor='addressLine2'>{t('community:addressLine2')}</Label> <br />
        <Input
          {...register('addressLine2')}
          id='addressLine2'
          placeholder={t('community:addressLine2')}
          className='form-control'
        />
        <br />
        <Label htmlFor='businessCategory'>{t('community:businessCategory')}</Label> <br />
        <Input
          {...register('businessCategory', { required: true })}
          id='businessCategory'
          placeholder={t('community:businessCategory')}
          className='form-control'
        />
        <FormFeedback>{errors.businessCategory?.message}</FormFeedback>
        <br />
        <EditorsContainer />
        <FormGroup row>
          <Label for='logo' sm={12} md={12} lg={12}>
            {t('community:logo')}
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
            {t('community:cover')}
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
        <RippleButton></RippleButton>
      </FormGroup>
    </div>
  )
}
