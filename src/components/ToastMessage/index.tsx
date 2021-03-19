import { Toast } from '@/typings'
import React, { FC } from 'react'
import { X, Info, Check, AlertTriangle, Bell } from 'react-feather'
import Avatar from '../Avatar'

const typeColorMap = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'danger',
  default: 'default',
  dark: 'dark',
}

const typeIconMap = {
  info: Info,
  success: Check,
  warning: AlertTriangle,
  error: X,
  default: Bell,
  dark: Bell,
}

const ToastMessage: FC<Toast> = ({ title, message, type }) => {
  const Icon = typeIconMap[type]

  return (
    <>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar
            size='sm'
            color={typeColorMap[type]}
            icon={<Icon size={12} />}
          />
          <h6 className='toast-title'>{title}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span role='img' aria-label='toast-text'>
          {message}
        </span>
      </div>
    </>
  )
}

export default ToastMessage
