// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { ArrowUp } from 'react-feather'
import ScrollToTop from 'react-scroll-up'
import { Navbar, Button } from 'reactstrap'

// ** Configs
import themeConfig from '@/utils/theme'

// ** Custom Components
import FooterComponent from './components/footer'
import NavbarComponent from './components/navbar'

// ** Custom Hooks
import { useSkin } from '@/hooks/useSkin'
import { useNavbarType } from '@/hooks/useNavbarType'
import { useFooterType } from '@/hooks/useFooterType'
import { useNavbarColor } from '@/hooks/useNavbarColor'

const VerticalLayout = (props) => {
  // ** Props
  const { children, navbar, footer } = props

  // ** Hooks
  const [skin, setSkin] = useSkin()
  const [navbarType, setNavbarType] = useNavbarType()
  const [footerType, setFooterType] = useFooterType()
  const [navbarColor, setNavbarColor] = useNavbarColor()

  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false)
    }
  }, [location])

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleWindowWidth)
    }
  }, [windowWidth])

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
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
    hidden: 'navbar-hidden',
  }

  const navbarClasses = {
    floating: 'floating-nav',
    sticky: 'fixed-top',
    static: 'navbar-static-top',
    hidden: 'd-none',
  }

  const bgColorCondition =
    navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white'

  if (!isMounted) {
    return null
  }
  return (
    <div
      className={classnames(
        `wrapper vertical-layout ${
          navbarWrapperClasses[navbarType] || 'navbar-floating'
        } ${footerClasses[footerType] || 'footer-static'}`,
        {
          // Modern Menu
          'vertical-menu-modern': windowWidth >= 1200,
          'menu-collapsed': true,
          'menu-expanded': false,

          // Overlay Menu
          'vertical-overlay-menu': windowWidth < 1200,
          'menu-hide': true,
          'menu-open': false,
        },
      )}
      data-col='1-column'
    >
      <Navbar
        expand='lg'
        light={skin !== 'dark'}
        dark={skin === 'dark' || bgColorCondition}
        color={bgColorCondition ? navbarColor : undefined}
        className={classnames(
          `header-navbar navbar align-items-center ${
            navbarClasses[navbarType] || 'floating-nav'
          } navbar-shadow`,
        )}
      >
        <div className='navbar-container d-flex content'>
          {navbar ? (
            navbar
          ) : (
            <NavbarComponent
              setMenuVisibility={setMenuVisibility}
              skin={skin}
              setSkin={setSkin}
            />
          )}
        </div>
      </Navbar>
      {children}

      {/* Vertical Nav Menu Overlay */}
      <div
        className={classnames('sidenav-overlay', {
          show: menuVisibility,
        })}
        onClick={() => setMenuVisibility(false)}
      ></div>
      {/* Vertical Nav Menu Overlay */}

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

export default VerticalLayout
