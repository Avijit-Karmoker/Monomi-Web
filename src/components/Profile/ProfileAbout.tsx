import { Community } from '@/typings'
import { formatAddress } from '@/utils'
import { DateTime } from 'luxon'
import { FC } from 'react'
import { Card, CardBody, CardText } from 'reactstrap'

const ProfileAbout: FC<Community> = ({
  description,
  createdAt,
  address,
  email,
}) => {
  return (
    <Card>
      <CardBody>
        <h5 className='mb-75'>About</h5>
        <CardText>{description}</CardText>
        <div className='mt-2'>
          <h5 className='mb-75'>Joined:</h5>
          <CardText>{DateTime.fromISO(createdAt).toLocaleString()}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Location:</h5>
          <CardText>{formatAddress(address)}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Email:</h5>
          <CardText>{email}</CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
