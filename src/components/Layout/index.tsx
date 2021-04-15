import { useRouterTransition } from '@/hooks/useRouterTransition'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import LayoutWrapper from './components/layout-wrapper'
import HorizontalLayout from './HorizontalLayout'
import { Dispatch, RootState } from '@/store'
import { FC, useEffect } from 'react'
import ToastMessage from '../ToastMessage'

const Router: FC = ({ children }) => {
  const [transition, setTransition] = useRouterTransition()

  const { toasts } = useSelector(({ ui }: RootState) => ui)
  const { ui } = useDispatch<Dispatch>()

  useEffect(() => {
    if (toasts.length) {
      const [item] = toasts

      toast(<ToastMessage {...item} />, { type: item.type })

      ui.removeToast(item)
    }
  }, [toasts, ui])

  return (
    <>
      <HorizontalLayout layout='HorizontalLayout'>
        <LayoutWrapper
          layout='HorizontalLayout'
          transition={transition}
          setTransition={setTransition}
        >
          {children}
        </LayoutWrapper>
      </HorizontalLayout>
      <ToastContainer newestOnTop />
    </>
  )
}

export default Router
