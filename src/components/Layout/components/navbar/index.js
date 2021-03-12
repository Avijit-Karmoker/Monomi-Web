// ** React Imports
import { Fragment } from 'react'
import styled from '@emotion/styled'
import NavbarUser from './NavbarUser'

const Logo = styled.img`
  margin-left: 7px;
  height: 30px;
`

const ThemeNavbar = (props) => {
  const { skin, setSkin } = props

  return (
    <Fragment>
      <div className='d-flex flex-fill align-items-center'>
        <Logo src='/assets/images/logo.png' />
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
