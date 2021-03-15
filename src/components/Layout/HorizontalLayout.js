// ** React Imports
import { useState, useEffect } from 'react'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import classnames from 'classnames'
import { ArrowUp } from 'react-feather'
import ScrollToTop from 'react-scroll-up'
import { Navbar, NavItem, Button } from 'reactstrap'

// ** Configs
import themeConfig from '@/utils/theme'

// ** Custom Components
import NavbarComponent from './components/navbar'
import FooterComponent from './components/footer'

// ** Custom Hooks
import { useRTL } from '@/hooks/useRTL'
import { useSkin } from '@/hooks/useSkin'
import { useNavbarType } from '@/hooks/useNavbarType'
import { useFooterType } from '@/hooks/useFooterType'
import { useNavbarColor } from '@/hooks/useNavbarColor'

const HorizontalLayout = (props) => {
  // ** Props
  const { children, navbar, footer } = props

  // ** Hooks
  const [skin, setSkin] = useSkin()
  const [navbarType, setNavbarType] = useNavbarType()
  const [footerType, setFooterType] = useFooterType()
  const [navbarColor, setNavbarColor] = useNavbarColor()

  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [navbarScrolled, setNavbarScrolled] = useState(false)

  // ** UseEffect Cleanup
  const cleanup = () => {
    setIsMounted(false)
    setNavbarScrolled(false)
  }

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 65 && navbarScrolled === false) {
        setNavbarScrolled(true)
      }
      if (window.pageYOffset < 65) {
        setNavbarScrolled(false)
      }
    })
    return () => cleanup()
  }, [])

  // ** Vars
  const footerClasses = {
    static: 'footer-static',
    sticky: 'footer-fixed',
    hidden: 'footer-hidden',
  }

  const navbarWrapperClasses = {
    floating: 'navbar-floating',
    sticky: 'navbar-sticky',
    static: 'navbar-static',
  }

  const navbarClasses = {
    floating: 'floating-nav',
    sticky: 'fixed-top',
  }

  const bgColorCondition =
    navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white'

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={classnames(
        `wrapper horizontal-layout horizontal-menu ${
          navbarWrapperClasses[navbarType] || 'navbar-floating'
        } ${footerClasses[footerType] || 'footer-static'} menu-expanded`,
      )}
      data-col='1-column'
    >
      <Navbar
        expand='lg'
        className={classnames(
          'header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center',
          {
            'navbar-scrolled': navbarScrolled,
          },
        )}
      >
        <div className='navbar-container d-flex content'>
          {navbar ? navbar : <NavbarComponent skin={skin} setSkin={setSkin} />}
        </div>
      </Navbar>

      {children}
      <footer
        className={classnames(
          `footer footer-light ${footerClasses[footerType] || 'footer-static'}`,
          {
            'd-none': footerType === 'hidden',
          },
        )}
      >
        {footer ? (
          footer
        ) : (
          <FooterComponent
            footerType={footerType}
            footerClasses={footerClasses}
          />
        )}
      </footer>

      {themeConfig.layout.scrollTop === true ? (
        <div className='scroll-to-top'>
          <ScrollToTop showUnder={300} style={{ bottom: '5%' }}>
            <Button className='btn-icon' color='primary'>
              <ArrowUp size={14} />
            </Button>
          </ScrollToTop>
        </div>
      ) : null}
    </div>
  )
}
export default HorizontalLayout
