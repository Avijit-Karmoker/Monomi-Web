import {
  useEffect,
  useState,
  Fragment,
  forwardRef,
  ReactNode,
  useRef,
  useCallback,
} from 'react'
import classnames from 'classnames'
import type Stepper from 'bs-stepper'
import { ChevronRight } from 'react-feather'

let StepperImport: typeof Stepper
if (process.browser) {
  import('bs-stepper').then((module) => (StepperImport = module.default))
}

type Props = {
  type?: string
  separator?: ReactNode
  steps: {
    id: string
    subtitle: string
    title: string
    content: ReactNode
    icon?: ReactNode
  }[]
  className?: any
  options?: Record<string, any>
}
type ShownEvent = Event & {
  detail: { to: number; from: number }
}

const Wizard = forwardRef<Stepper, Props>((props, ref) => {
  const { type, className, steps, separator, options } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleShown = useCallback(
    (event) => setActiveIndex((event as ShownEvent).detail.to),
    [setActiveIndex],
  )
  useEffect(() => {
    if (ref && 'current' in ref && containerRef.current) {
      ref.current = new StepperImport(containerRef.current, options)

      containerRef.current.addEventListener('shown.bs-stepper', handleShown)
    }

    return () => {
      containerRef.current?.removeEventListener('shown.bs-stepper', handleShown)
    }
  }, [StepperImport, ref, containerRef, handleShown, steps])

  // ** Renders Wizard Header
  const renderHeader = () => {
    return steps.map((step, index) => {
      return (
        <Fragment key={step.id}>
          {index !== 0 && index !== steps.length ? (
            <div className='line'>{separator}</div>
          ) : null}
          <div
            className={classnames('step', {
              crossed: activeIndex > index,
              active: index === activeIndex,
            })}
            data-target={`#${step.id}`}
          >
            <button type='button' className='step-trigger'>
              <span className='bs-stepper-box'>
                {step.icon ? step.icon : index + 1}
              </span>
              <span className='bs-stepper-label'>
                <span className='bs-stepper-title'>{step.title}</span>
                {step.subtitle ? (
                  <span className='bs-stepper-subtitle'>{step.subtitle}</span>
                ) : null}
              </span>
            </button>
          </div>
        </Fragment>
      )
    })
  }

  // ** Renders Wizard Content
  const renderContent = () => {
    return steps.map((step, index) => {
      return (
        <div
          className={classnames('content', {
            'active dstepper-block': activeIndex === index,
          })}
          id={step.id}
          key={step.id}
        >
          {step.content}
        </div>
      )
    })
  }

  return (
    <div
      ref={containerRef}
      className={classnames('bs-stepper', {
        [className]: className,
        vertical: type === 'vertical',
        'vertical wizard-modern': type === 'modern-vertical',
        'wizard-modern': type === 'modern-horizontal',
      })}
    >
      <div className='bs-stepper-header'>{renderHeader()}</div>
      <div className='bs-stepper-content'>{renderContent()}</div>
    </div>
  )
})

export default Wizard

// ** Default Props
Wizard.defaultProps = {
  type: 'horizontal',
  separator: <ChevronRight size={17} />,
  options: {},
}
