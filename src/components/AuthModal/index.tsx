import { Dispatch, RootState } from '@/store'
import { AuthenticationPayload } from '@/typings'
import React, { FC, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  FormText,
  Label,
} from 'reactstrap'
import RippleButton from '../RippleButton'

const AuthModal: FC<{}> = () => {
  const { authModalOpen, user } = useSelector(
    ({ ui: { authModalOpen }, authentication: { user } }: RootState) => ({
      authModalOpen,
      user,
    }),
  )
  const { ui, authentication } = useDispatch<Dispatch>()
  const { register, errors, handleSubmit } = useForm<AuthenticationPayload>()

  const handleClose = useCallback(() => ui.setAuthModalOpen(false), [])
  const authenticate = useCallback(
    (data: AuthenticationPayload) => {
      console.log({ data })
      authentication.authenticate(data)
    },
    [user],
  )

  return (
    <Modal
      isOpen={authModalOpen}
      className='modal-dialog-centered'
      toggle={handleClose}
    >
      <ModalHeader toggle={handleClose}>Join</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(authenticate)}>
          <Row>
            <Col sm='12'>
              <FormGroup className='form-label-group mt-1'>
                <Input
                  type='text'
                  name='email'
                  placeholder='Email'
                  invalid={!!errors.email}
                  innerRef={register({ required: true })}
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
