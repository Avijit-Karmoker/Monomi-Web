import navStyle from '../../styles/Nav.module.css'
import { useTranslation } from 'react-i18next'
import { Button } from 'reactstrap'
import Image from 'next/image'

const Nav = () => {
  const { t } = useTranslation(['home'])
  return (
    <div className={navStyle.navbar}>
      <div className={navStyle.nav}>
        <nav
          class='navbar navbar-expand-lg navbar-light container'
          style={{ backgroundColor: '#EDF1F3' }}
        >
          <div class='container-fluid'>
            <a class='navbar-brand' href='#'>
              <span className={navStyle.image}>
                <Image
                  src='/../public/assets/images/logo.png'
                  alt='Picture of the author'
                  width={150}
                  height={35}
                />
              </span>
            </a>
            <button
              class='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarNav'
              aria-controls='navbarNav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span
                class='navbar-toggler-icon'
                style={{ width: '1em', height: '1em' }}
              ></span>
            </button>
            <div class='collapse navbar-collapse' id='navbarNav'>
              <ul class='navbar-nav ms-auto text-center align-items-center'>
                <li class='nav-item'>
                  <a class='nav-link' href='#creators'>
                    {t('home:nav.creators')}
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#members'>
                    {t('home:nav.members')}
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#contact'>
                    {t('home:nav.contact')}
                  </a>
                </li>
                <li class="pe-0">
                  <Button className='rounded-pill'>
                    {t('home:nav.download')}
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Nav
