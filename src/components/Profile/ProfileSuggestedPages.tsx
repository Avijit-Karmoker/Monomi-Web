import classnames from 'classnames'
import { Star } from 'react-feather'
import Avatar from '@/components/Avatar'
import { Card, CardBody } from 'reactstrap'
import { FC } from 'react'
import { Community } from '@/typings'
import { formatAddress } from '@/utils'
import { useTranslation } from 'react-i18next'

const ProfileSuggestedPages: FC<{ list: Community[] }> = ({ list }) => {
  const { t } = useTranslation('community')

  return (
    <Card>
      <CardBody className='profile-suggestion'>
        <h5 className='mb-2'>{t('community:suggested')}</h5>
        {list.map(({ id, name, address, logoUrl }, index) => (
          <div
            className={classnames(
              'd-flex justify-content-start align-items-center',
              {
                'mb-1': index !== list.length - 1,
              },
            )}
            key={id}
          >
            <Avatar
              className='mr-1'
              img={logoUrl}
              imgHeight={40}
              imgWidth={40}
            />
            <div className='profile-user-info'>
              <h6 className='mb-0'>{name}</h6>
              <small className='text-muted'>{formatAddress(address)}</small>
            </div>
            <div className='profile-star ml-auto'>
              <Star
                size={18}
                className={classnames('cursor-pointer', {
                  'profile-favorite': index % 2,
                })}
              />
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default ProfileSuggestedPages
