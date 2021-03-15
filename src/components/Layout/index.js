import { useLayout } from '@/hooks/useLayout'
import { useRouterTransition } from '@/hooks/useRouterTransition'

import LayoutWrapper from './components/layout-wrapper'
import HorizontalLayout from './HorizontalLayout'

const Router = ({ children }) => {
  // ** Hooks
  const [layout, setLayout] = useLayout()
  const [transition, setTransition] = useRouterTransition()

  return (
    <HorizontalLayout
      layout={'HorizontalLayout'}
      setLayout={setLayout}
      transition={transition}
      setTransition={setTransition}
      currentActiveItem={null}
    >
      <LayoutWrapper
        layout={'HorizontalLayout'}
        transition={transition}
        setTransition={setTransition}
      >
        {children}
      </LayoutWrapper>
    </HorizontalLayout>
  )
}

export default Router
