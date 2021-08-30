import Avatar from '@/components/Avatar'
import { RootState, Dispatch } from '@/store'
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap'
import { Power, Home } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

const UserDropdown = () => {
  const { user } = useSelector(({ authentication: { user } }: RootState) => ({
    user,
  }))
  const { authentication } = useDispatch<Dispatch>()

  const logout = useCallback(() => authentication.logout(), [])

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = useCallback(
    () => setDropdownOpen((prevState) => !prevState),
    [setDropdownOpen],
  )

  const { t } = useTranslation('common')

  let status
  if (user?.status === 'active') {
    status = 'online'
  } else if (user?.status === 'boarding') {
    status = 'busy'
  }

  const ToggleComponent = user ? DropdownToggle : 'a'

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      tag='li'
      className='dropdown-user nav-item'
    >
      <ToggleComponent tag='a' className='nav-link dropdown-user-link'>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold'>
            {user?.firstName} {user?.lastName}
          </span>
        </div>
        <Avatar
          img={user?.avatarUrl || '/assets/images/favicon.ico'}
          imgHeight='40'
          imgWidth='40'
          status={status}
        />
      </ToggleComponent>
      <DropdownMenu right>
        <DropdownItem tag={Link} href='/feed'>
          <a className='dropdown-item' role='menuitem' onClick={toggle}>
            <Home size={14} className='mr-75' />
            <span className='align-middle'>{t('feed')}</span>
          </a>
        </DropdownItem>
        <DropdownItem tag={Link} href='/communities/new'>
          <a className='dropdown-item' role='menuitem' onClick={toggle}>
            <Home size={14} className='mr-75' />
            <span className='align-middle'>{t('createCommunity')}</span>
          </a>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag='a' onClick={logout}>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>{t('logout')}</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserDropdown
