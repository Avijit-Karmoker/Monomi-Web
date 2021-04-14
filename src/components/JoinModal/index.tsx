import { Dispatch, RootState } from '@/store'
import React, { FC, useCallback, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import Wizard from '../Wizard'
import Stepper from 'bs-stepper'
import Amount from './components/Amount'
import Checkout from './components/Checkout'
import Billing from './components/Billing'

const JoinModal: FC<{}> = () => {
  const { joinModalOpen, user } = useSelector(
    ({ ui: { joinModalOpen }, authentication: { user } }: RootState) => ({
      joinModalOpen,
      user,
    }),
  )
  const { ui } = useDispatch<Dispatch>()
  const stepperRef = useRef<Stepper>(null)

  const handleClose = useCallback(() => ui.setJoinModalOpen(false), [ui])

  const steps = useMemo(() => {
    return [
      {
        id: 'amount',
        title: 'Amount',
        subtitle: 'Once per month',
        content: <Amount stepperRef={stepperRef} />,
      },
      {
        id: 'billing',
        title: 'Billing',
        subtitle: 'Credit card details',
        content: <Billing stepperRef={stepperRef} />,
      },
      {
        id: 'checkout',
        title: 'Checkout',
        subtitle: 'Confirm purchase',
        content: <Checkout stepperRef={stepperRef} />,
      },
    ]
  }, [stepperRef])

  return (
    <Modal
      isOpen={joinModalOpen}
      className='modal-dialog-centered modal-lg'
      toggle={handleClose}
    >
      <ModalHeader toggle={handleClose}>Join</ModalHeader>
      <ModalBody>
        <div className='vertical-wizard mt-1 ecommerce-application'>
          <Wizard type='modern-vertical' ref={stepperRef} steps={steps} />
        </div>
      </ModalBody>
    </Modal>
  )
}
export default JoinModal
