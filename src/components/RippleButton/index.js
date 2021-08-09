// ** React Imports
import { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'

const RippleButton = ({ className, children, onClick, ...rest }) => {
  // ** States
  const [mounted, setMounted] = useState(false)
  const [isRippling, setIsRippling] = useState(false)
  const [coords, setCoords] = useState({ x: -1, y: -1 })

  // ** Toggle mounted on mount & unmount
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // ** Check for coords and set ripple
  useEffect(() => {
    if (mounted) {
      if (coords.x !== -1 && coords.y !== -1) {
        setIsRippling(true)
        setTimeout(() => setIsRippling(false), 500)
      } else {
        setIsRippling(false)
      }
    }
  }, [coords])

  // ** Reset Coords on ripple end
  useEffect(() => {
    if (mounted) {
      if (!isRippling) setCoords({ x: -1, y: -1 })
    }
  }, [isRippling])

  const { t } = useTranslation ('community')

  return (
    <Button
      className={classnames('waves-effect', {
        [className]: className,
      })}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        if (onClick) {
          onClick(e)
        }
      }}
      color='primary'
      {...rest}
    > {t('community:submit')}
      {children}
      {isRippling ? (
        <span
          className='waves-ripple'
          style={{
            left: coords.x,
            top: coords.y,
          }}
        ></span>
      ) : null}
    </Button>
  )
}

// ** PropTypes
RippleButton.propTypes = {
  ...Button.propTypes,
}

Button.Ripple = RippleButton

export default Button.Ripple
