import { Community } from '@/typings'
import { FC, ReactNode } from 'react'
import { Card, CardImg, Navbar } from 'reactstrap'
import RippleButton from '@/components/RippleButton'
import { css } from '@emotion/css'

type Props = Community & { actionButton?: ReactNode }

const ProfileHeader: FC<Props> = ({
  coverUrl,
  logoUrl,
  name,
  entityName,
  actionButton,
}) => {
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
          {actionButton}
        </Navbar>
      </div>
    </Card>
  )
}

export default ProfileHeader
