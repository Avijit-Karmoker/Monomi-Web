import { FC } from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'

const ProfileLatestPhotos: FC<{ list: string[] }> = ({ list }) => {
  return (
    <Card>
      <CardBody>
        <h5 className='mb-0'>Latest Photos</h5>
        <Row>
          {list.map((src) => {
            return (
              <Col key={src} md='4' xs='6' className='profile-latest-img'>
                <img
                  className='img-fluid rounded'
                  src={src}
                  alt='latest-photo'
                />
              </Col>
            )
          })}
        </Row>
      </CardBody>
    </Card>
  )
}

export default ProfileLatestPhotos
