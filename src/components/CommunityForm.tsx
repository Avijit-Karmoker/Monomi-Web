import { CreateCommunityPayload, EntityAddress } from '@/typings'
import React from 'react'
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from 'react-hook-form'
import { Col, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { communityTypes } from '@/config'
import Select from 'react-select'
import classnames from 'classnames'
import { CountryRegionData } from 'react-country-region-selector'
import dynamic from 'next/dynamic'
import RippleButton from './RippleButton'

const EditorsContainer = dynamic(() => import('./TextEditor'), {
  ssr: false,
})

export default function CommunityForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateCommunityPayload>({
    defaultValues: {},
  })

  const { t } = useTranslation('community')

  const onSubmit: SubmitHandler<CreateCommunityPayload> = (data) => {
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
        <FormFeedback>{errors.name?.message}</FormFeedback> <br />
        <br />
        <FormGroup className='form-label-group'>
          <Controller
            id='type'
            name='type'
            rules={{ required: true }}
            control={control}
            render={({ onChange, value }) => (
              <Select
                defaultValue={value ? { label: value, value } : null}
                onChange={(option) => onChange(option?.value)}
                options={communityTypes.map((value) => ({
                  label: t(`communityTypes.${value}`),
                  value,
                }))}
                className={classnames('react-select', {
                  'is-invalid': !!errors.type,
                })}
                classNamePrefix='select'
                placeholder={t('select')}
              />
            )}
          />
          <Input type='hidden' name='communityTypes' />
          <Label for='communityTypes'>{t('community:selectProfit')}</Label>
          <FormFeedback>{errors.type?.message}</FormFeedback>
        </FormGroup>
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
        <FormGroup className='form-label-group' style={{ marginTop: '1.3em' }}>
          <Input
            autoComplete='username'
            defaultValue={''}
            type='text'
            name='email'
            placeholder={t('email')}
            invalid={!!errors.email}
            innerRef={register({
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          <Label for='email'>{t('community:email')}</Label>
          <FormFeedback>{errors.email?.message}</FormFeedback>
        </FormGroup>
        <FormGroup
          className='form-label-group'
          style={{ marginTop: '3em', color: '#A4A1B0 !important' }}
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
        <FormFeedback>
          {(errors.address as FieldErrors<EntityAddress>)?.city?.message}
        </FormFeedback>
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
        <Label htmlFor='addressLine1'>{t('community:addressLine1')}</Label>{' '}
        <br />
        <Input
          {...register('addressLine1', { required: true })}
          id='addressLine1'
          placeholder={t('community:addressLine1')}
          className='form-control'
        />
        <FormFeedback>{errors.addressLine1?.message}</FormFeedback>
        <br />
        <Label htmlFor='addressLine2'>{t('community:addressLine2')}</Label>{' '}
        <br />
        <Input
          {...register('addressLine2')}
          id='addressLine2'
          placeholder={t('community:addressLine2')}
          className='form-control'
        />
        <br />
        <Label htmlFor='businessCategory'>
          {t('community:businessCategory')}
        </Label>{' '}
        <br />
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
              id='logo'
              placeholder={t('community:logo')}
              {...register('logo', { required: true })}
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
              id='cover'
              {...register('cover', { required: true })}
            />
          </Col>
        </FormGroup>
        <RippleButton>{t('community:submit')}</RippleButton>
      </FormGroup>
    </div>
  )
}
