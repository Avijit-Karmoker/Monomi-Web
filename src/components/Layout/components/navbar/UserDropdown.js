// ** React Imports
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@/components/Avatar'

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap'
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from 'react-feather'

const UserDropdown = () => {
  // ** State
  const [userData, setUserData] = useState(null)

  //** Vars
  const userAvatar =
    (userData && userData.avatar) || '/assets/images/favicon.ico'

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle
        href='/'
        tag='a'
        className='nav-link dropdown-user-link'
        onClick={(e) => e.preventDefault()}
      >
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold'>
            {(userData && userData['username']) || 'John Doe'}
          </span>
          <span className='user-status'>
            {(userData && userData.role) || 'Admin'}
          </span>
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem to='/pages/profile'>
          <User size={14} className='mr-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem to='/apps/email'>
          <Mail size={14} className='mr-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
        <DropdownItem to='/apps/todo'>
          <CheckSquare size={14} className='mr-75' />
          <span className='align-middle'>Tasks</span>
        </DropdownItem>
        <DropdownItem to='/apps/chat'>
          <MessageSquare size={14} className='mr-75' />
          <span className='align-middle'>Chats</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem to='/pages/account-settings'>
          <Settings size={14} className='mr-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem to='/pages/pricing'>
          <CreditCard size={14} className='mr-75' />
          <span className='align-middle'>Pricing</span>
        </DropdownItem>
        <DropdownItem to='/pages/faq'>
          <HelpCircle size={14} className='mr-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem>
        <DropdownItem to='/login'>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
