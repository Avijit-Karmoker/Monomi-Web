import { Dispatch, RootState } from '@/store'
import React, { FC, useCallback, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import Wizard from '../Wizard'
import Stepper from 'bs-stepper'
import Account from './components/Account'
import PersonalInfo from './components/PersonalInfo'
import Security from './components/Security'
import Login from './components/Login'
import { useTranslation } from 'next-i18next'

const AuthModal: FC<{ onSuccess?(): void }> = ({ onSuccess }) => {
  const { authModalOpen, user } = useSelector(
    ({ ui: { authModalOpen }, authentication: { user } }: RootState) => ({
      authModalOpen,
      user,
    }),
  )
  const { ui } = useDispatch<Dispatch>()
  const stepperRef = useRef<Stepper>(null)

  const { t } = useTranslation('common')

  const handleClose = useCallback(() => ui.setAuthModalOpen(false), [ui])

  const steps = useMemo(() => {
    if (user?.status === 'boarding') {
      return [
        {
          id: 'account',
          title: t('account'),
          subtitle: t('email'),
          content: <Account stepperRef={stepperRef} />,
        },
        {
          id: 'personal',
          title: t('personal'),
          subtitle: t('fillInfo'),
          content: <PersonalInfo stepperRef={stepperRef} />,
        },
        {
          id: 'security',
          title: t('security'),
          subtitle: t('createPin'),
          content: <Security onSuccess={onSuccess} />,
        },
      ]
    } else {
      return [
        {
          id: 'account',
          title: t('account'),
          subtitle: t('email'),
          content: <Account stepperRef={stepperRef} />,
        },
        {
          id: 'login',
          title: t('login'),
          subtitle: t('enterPin'),
          content: <Login onSuccess={onSuccess} />,
        },
      ]
    }
  }, [user?.status, stepperRef])

  return (
    <Modal
      isOpen={authModalOpen}
      className='modal-dialog-centered modal-lg'
      toggle={handleClose}
    >
      <ModalHeader toggle={handleClose}>{t('join')}</ModalHeader>
      <ModalBody>
        <div className='vertical-wizard mt-1'>
          <Wizard type='modern-vertical' ref={stepperRef} steps={steps} />
        </div>
      </ModalBody>
    </Modal>
  )
}
export default AuthModal
