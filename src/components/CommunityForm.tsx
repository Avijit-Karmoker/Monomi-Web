import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Inputs = {
  className: string
  children: string
  name: string
  exampleRequired: string
  profit: string
  entityName: string
  entityCode: string
  entityVat: any
  email: string
}

export default function CommunityForm() {
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
          event.target.value
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
        <input type='submit'/>
      </form>
    </div>
  )
}
