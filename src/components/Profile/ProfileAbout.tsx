import { Community } from '@/typings'
import { formatAddress } from '@/utils'
import { DateTime } from 'luxon'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardText } from 'reactstrap'

const ProfileAbout: FC<Community> = ({
  description,
  createdAt,
  address,
  email,
}) => {
  const { t } = useTranslation('community')

  return (
    <Card>
      <CardBody>
        <h5 className='mb-75'>{t('community:about')}</h5>
        <CardText>{description}</CardText>
        <div className='mt-2'>
          <h5 className='mb-75'>{t('community:joined')}</h5>
          <CardText>{DateTime.fromISO(createdAt).toLocaleString()}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>{t('community:location')}</h5>
          <CardText>{formatAddress(address)}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>{t('community:contact')}</h5>
          <CardText>{email}</CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
