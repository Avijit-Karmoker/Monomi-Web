import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, Row, Col } from 'reactstrap'

const ProfileLatestPhotos: FC<{ list: string[] }> = ({ list }) => {
  const { t } = useTranslation('community')

  return (
    <Card>
      <CardBody>
        <h5 className='mb-0'>{t('community:latestPhotos')}</h5>
        <Row>
          {list.map((src) => (
            <Col key={src} md='4' xs='6' className='profile-latest-img'>
              <img className='img-fluid rounded' src={src} alt={src} />
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  )
}

export default ProfileLatestPhotos
