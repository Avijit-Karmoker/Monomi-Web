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

const AuthModal: FC<{}> = () => {
  const { authModalOpen, user } = useSelector(
    ({ ui: { authModalOpen }, authentication: { user } }: RootState) => ({
      authModalOpen,
      user,
    }),
  )
  const { ui } = useDispatch<Dispatch>()
  const stepperRef = useRef<Stepper>(null)

  const handleClose = useCallback(() => ui.setAuthModalOpen(false), [ui])

  const steps = useMemo(() => {
    if (user?.status === 'boarding') {
      return [
        {
          id: 'account',
          title: 'Account',
          subtitle: 'Email',
          content: <Account stepperRef={stepperRef} />,
        },
        {
          id: 'personal',
          title: 'Personal',
          subtitle: 'Fill info',
          content: <PersonalInfo stepperRef={stepperRef} />,
        },
        {
          id: 'security',
          title: 'Security',
          subtitle: 'Create PIN',
          content: <Security />,
        },
      ]
    } else {
      return [
        {
          id: 'account',
          title: 'Account',
          subtitle: 'Email',
          content: <Account stepperRef={stepperRef} />,
        },
        {
          id: 'login',
          title: 'Login',
          subtitle: 'Enter PIN',
          content: <Login />,
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
      <ModalHeader toggle={handleClose}>Join</ModalHeader>
      <ModalBody>
        <div className='vertical-wizard mt-1'>
          <Wizard type='modern-vertical' ref={stepperRef} steps={steps} />
        </div>
      </ModalBody>
    </Modal>
  )
}
export default AuthModal
