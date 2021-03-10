// ** React Imports
import { useContext } from 'react'

// ** Third Party Components
import ReactCountryFlag from 'react-country-flag'
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'

// ** Internationalization Context
// import { IntlContext } from '@src/utility/context/Internationalization'

const IntlDropdown = () => {
  // ** Vars
  const langObj = {
    en: 'English',
    de: 'German',
    fr: 'French',
    pt: 'Portuguese',
  }

  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
  }

  return (
    <UncontrolledDropdown
      href='/'
      tag='li'
      className='dropdown-language nav-item'
    >
      <DropdownToggle
        href='/'
        tag='a'
        className='nav-link'
        onClick={(e) => e.preventDefault()}
      >
        <ReactCountryFlag
          className='country-flag flag-icon'
          countryCode={'us'}
          svg
        />
        <span className='selected-language'>{langObj.en}</span>
      </DropdownToggle>
      <DropdownMenu className='mt-0' right>
        <DropdownItem
          href='/'
          tag='a'
          onClick={(e) => handleLangUpdate(e, 'en')}
        >
          <ReactCountryFlag className='country-flag' countryCode='us' svg />
          <span className='ml-1'>English</span>
        </DropdownItem>
        <DropdownItem
          href='/'
          tag='a'
          onClick={(e) => handleLangUpdate(e, 'fr')}
        >
          <ReactCountryFlag className='country-flag' countryCode='fr' svg />
          <span className='ml-1'>French</span>
        </DropdownItem>
        <DropdownItem
          href='/'
          tag='a'
          onClick={(e) => handleLangUpdate(e, 'de')}
        >
          <ReactCountryFlag className='country-flag' countryCode='de' svg />
          <span className='ml-1'>German</span>
        </DropdownItem>
        <DropdownItem
          href='/'
          tag='a'
          onClick={(e) => handleLangUpdate(e, 'pt')}
        >
          <ReactCountryFlag className='country-flag' countryCode='pt' svg />
          <span className='ml-1'>Portuguese</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
