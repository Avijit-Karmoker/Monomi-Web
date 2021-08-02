import { RootState } from '@/store'
import { EntityAddress, OnboardingUserPayload } from '@/typings'
import React, { Component } from 'react'
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from 'react-hook-form'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { defaultLanguage } from '@/config'
import Select from 'react-select'
import classnames from 'classnames'
import { CountryRegionData } from 'react-country-region-selector'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

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

class EditorContainer extends Component {
  constructor(props:any) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  onEditorStateChange: Function = (editorState:any) => {
    // console.log(editorState)
    this.setState({
      editorState,
    });
  };

  uploadImageCallBack: Function = (file:any) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID ##clientid##');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          console.log(response)
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          console.log(error)
          reject(error);
        });
      }
    );
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className='editor'>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.uploadImageCallBack,
              alt: { present: true, mandatory: true },
            },
          }}
        />
      </div>
    )
  }
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
        <div>
          <h2>React Wysiwyg Rich Editor Using Draft.js</h2>
          <EditorContainer />
        </div>
        <input type='submit' />
      </form>
    </div>
  )
}
