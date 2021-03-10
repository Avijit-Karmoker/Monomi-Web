import { useLayout } from '@/hooks/useLayout'
import { useRouterTransition } from '@/hooks/useRouterTransition'

import LayoutWrapper from './components/layout-wrapper'
import VerticalLayout from './VerticalLayout'

const Router = ({ children }) => {
  // ** Hooks
  const [layout, setLayout] = useLayout()
  const [transition, setTransition] = useRouterTransition()

  return (
    <VerticalLayout
      layout={'VerticalLayout'}
      setLayout={setLayout}
      transition={transition}
      setTransition={setTransition}
      currentActiveItem={null}
    >
      <LayoutWrapper
        layout={'VerticalLayout'}
        transition={transition}
        setTransition={setTransition}
      >
        {children}
      </LayoutWrapper>
    </VerticalLayout>
  )
}

export default Router
