import { languages } from '@/config'
import useLanguage from '@/hooks/useLanguage'
import { Dispatch, RootState } from '@/store'
import { useRouter } from 'next/router'
import { FC, MouseEvent } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { useDispatch, useSelector } from 'react-redux'
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'

const IntlDropdown: FC = () => {
  const { locale } = useSelector(({ global }: RootState) => ({
    locale: global.locale,
  }))
  const dispatch = useDispatch<Dispatch>()
  const router = useRouter()

  const handleLanguageChange = async (
    e: MouseEvent<HTMLElement>,
    locale: string,
  ) => {
    e.preventDefault()

    await dispatch.user.updateUser({ localization: locale })

    router.replace(router.asPath, router.asPath, { locale })
  }

  const language = useLanguage(locale)

  return language ? (
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
          countryCode={language.code}
          svg
        />
        <span className='selected-language'>{language.title}</span>
      </DropdownToggle>
      <DropdownMenu className='mt-0' right>
        {languages.map(({ id, code, title }) => (
          <DropdownItem
            key={id}
            href='/'
            tag='a'
            onClick={(e) => handleLanguageChange(e, id)}
          >
            <ReactCountryFlag className='country-flag' countryCode={code} svg />
            <span className='ml-1'>{title}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  ) : null
}

export default IntlDropdown
