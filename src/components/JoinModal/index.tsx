import { Dispatch, RootState } from '@/store'
import React, { FC, useCallback, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import Wizard from '../Wizard'
import Stepper from 'bs-stepper'
import Amount from './components/Amount'
import Checkout from './components/Checkout'
import Billing from './components/Billing'
import { useTranslation } from 'next-i18next'

const JoinModal: FC<{}> = () => {
  const { joinModalOpen } = useSelector(
    ({ ui: { joinModalOpen } }: RootState) => ({
      joinModalOpen,
    }),
  )
  const { ui } = useDispatch<Dispatch>()
  const stepperRef = useRef<Stepper>(null)

  const { t } = useTranslation(['common', 'community'])

  const handleClose = useCallback(() => ui.setJoinModalOpen(false), [ui])

  const steps = useMemo(() => {
    return [
      {
        id: 'amount',
        title: t('amount'),
        subtitle: t('community:oncePerMonth'),
        content: <Amount stepperRef={stepperRef} />,
      },
      {
        id: 'billing',
        title: t('community:billing'),
        subtitle: t('community:creditCardDetails'),
        content: <Billing stepperRef={stepperRef} />,
      },
      {
        id: 'checkout',
        title: t('community:checkout'),
        subtitle: t('community:confirmPurchase'),
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
      <ModalHeader toggle={handleClose}>{t('join')}</ModalHeader>
      <ModalBody>
        <div className='vertical-wizard mt-1 ecommerce-application'>
          <Wizard type='modern-vertical' ref={stepperRef} steps={steps} />
        </div>
      </ModalBody>
    </Modal>
  )
}
export default JoinModal
