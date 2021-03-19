import Avatar from '@/components/Avatar'
import { RootState, Dispatch } from '@/store'
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap'
import { Power, Home } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

const UserDropdown = () => {
  const { user } = useSelector(({ authentication: { user } }: RootState) => ({
    user,
  }))
  const { authentication } = useDispatch<Dispatch>()

  let status = 'offline'
  if (user?.status === 'active') {
    status = 'online'
  } else if (user?.status === 'boarding') {
    status = 'busy'
  }

  const ToggleComponent = user ? DropdownToggle : 'a'

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
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
        <DropdownItem tag='a' href='/feed'>
          <Home size={14} className='mr-75' />
          <span className='align-middle'>Feed</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag='a' onClick={authentication.logout}>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
