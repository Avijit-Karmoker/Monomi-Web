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
            <p className='text-white d-none d-md-block'>{entityName}</p>
          </div>
        </div>
      </div>
      <div className='profile-header-nav'>
        <Navbar className='justify-content-end w-100' expand='md' light>
          <RippleButton>
            <span className='font-weight-bold d-md-block'>Join</span>
          </RippleButton>
        </Navbar>
      </div>
    </Card>
  )
}

export default ProfileHeader
