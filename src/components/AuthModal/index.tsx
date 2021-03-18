import { Dispatch, RootState } from '@/store'
import { AuthenticationPayload } from '@/typings'
import { setAPIErrors } from '@/utils'
import React, { FC, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  FormText,
  Label,
} from 'reactstrap'
import classnames from 'classnames'
import RippleButton from '../RippleButton'
import Wizard from '../Wizard'
import Stepper from 'bs-stepper'
import Account from './components/Account'
import PersonalInfo from './components/PersonalInfo'
import Security from './components/Security'

const AuthModal: FC<{}> = () => {
  const { authModalOpen, user } = useSelector(
    ({ ui: { authModalOpen }, authentication: { user } }: RootState) => ({
      authModalOpen,
      user,
    }),
  )
  const { ui, authentication } = useDispatch<Dispatch>()
  const {
    register,
    errors,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<AuthenticationPayload>()
  const stepperRef = useRef<Stepper>(null)

  const handleClose = useCallback(() => ui.setAuthModalOpen(false), [ui])
  const authenticate = useCallback(
    async (data: AuthenticationPayload) => {
      try {
        clearErrors()

        await authentication.authenticate(data)

        stepperRef.current?.next()
      } catch (error) {
        setAPIErrors(setError, error)
      }
    },
    [authentication, clearErrors, setError, stepperRef],
  )

  const steps = [
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

  return (
    <Modal
      isOpen={authModalOpen}
      className='modal-dialog-centered modal-lg'
      toggle={handleClose}
    >
      <ModalHeader toggle={handleClose}>Join</ModalHeader>
      <ModalBody>
        <div
          className={classnames('vertical-wizard mt-1', {
            hidden: user?.status !== 'boarding',
          })}
        >
          <Wizard type='modern-vertical' ref={stepperRef} steps={steps} />
        </div>
        <Form
          onSubmit={handleSubmit(authenticate)}
          className={user?.status === 'boarding' ? 'hidden' : ''}
        >
          <Row>
            <Col sm='12'>
              <FormGroup className='form-label-group mt-1'>
                <Input
                  type='text'
                  name='email'
                  placeholder='Email'
                  invalid={!!errors.email}
                  innerRef={register({
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                <Label for='email'>Email</Label>
                <FormText className='text-muted'>
                  By continuing you agree to terms and conditions
                </FormText>
              </FormGroup>
            </Col>
          </Row>
          <RippleButton color='primary' type='submit' className='mb-1'>
            Submit
          </RippleButton>
        </Form>
      </ModalBody>
    </Modal>
  )
}
export default AuthModal
