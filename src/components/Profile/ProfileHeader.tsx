import { Community } from '@/typings'
import { FC, useState } from 'react'
import { AlignJustify, Rss, Edit } from 'react-feather'
import {
  Card,
  CardImg,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  Button,
} from 'reactstrap'
import RippleButton from '@/components/RippleButton'
import { css } from '@emotion/css'

const ProfileHeader: FC<Community> = ({
  coverUrl,
  logoUrl,
  name,
  entityName,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Card className='profile-header mb-2'>
      <CardImg
        src={coverUrl}
        alt='User Profile Image'
        top
        className={css`
          max-height: 364px;
          object-fit: cover;
        `}
      />
      <div className='position-relative'>
        <div className='profile-img-container d-flex align-items-center'>
          <div className='profile-img'>
            <img className='rounded img-fluid' src={logoUrl} alt='Card image' />
          </div>
          <div className='profile-title ml-3'>
            <h2 className='text-white'>{name}</h2>
            <p className='text-white'>{entityName}</p>
          </div>
        </div>
      </div>
      <div className='profile-header-nav'>
        <Navbar
          className='justify-content-end justify-content-md-between w-100'
          expand='md'
          light
        >
          <Button color='' className='btn-icon navbar-toggler' onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className='profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0'>
              <Nav className='mb-0' pills>
                <NavItem>
                  <RippleButton className='font-weight-bold'>
                    <span className='d-none d-md-block'>Feed</span>
                    <Rss className='d-block d-md-none' size={14} />
                  </RippleButton>
                </NavItem>
              </Nav>
              <RippleButton>
                <Edit className='d-block d-md-none' size={14} />
                <span className='font-weight-bold d-none d-md-block'>Join</span>
              </RippleButton>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  )
}

export default ProfileHeader
