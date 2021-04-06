import { FC } from 'react'
import classnames from 'classnames'
import Avatar from '@/components/Avatar'
import { Heart, MessageSquare, Share2 } from 'react-feather'
import { Card, CardBody, CardText, Row, Col } from 'reactstrap'
import { CommunityPost } from '@/typings'
import { DateTime } from 'luxon'
import styled from '@emotion/styled'

const Content = styled.pre`
  background: none;
  font-size: inherit;
  color: inherit;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
`

const ProfilePosts: FC<{ list: CommunityPost[] }> = ({ list }) => {
  return (
    <>
      {list.map(({ id, time, data, merchant }, index) => {
        return (
          <Card className='post' key={id}>
            <CardBody>
              <div className='d-flex justify-content-start align-items-center mb-1'>
                <Avatar
                  className='mr-1'
                  img={merchant.logoUrl}
                  imgHeight='50'
                  imgWidth='50'
                />
                <div className='profile-user-info'>
                  <h6 className='mb-0'>{merchant.name}</h6>
                  <small className='text-muted'>
                    {DateTime.fromISO(time).toLocaleString(
                      DateTime.DATETIME_MED,
                    )}
                  </small>
                </div>
              </div>
              <Content>{data.text}</Content>
              {data.image ? (
                <img
                  src={data.image}
                  alt={merchant.name}
                  className='img-fluid rounded mb-75'
                />
              ) : null}
              <Row className='d-flex justify-content-start align-items-center flex-wrap pb-50 post-actions'>
                <Col
                  className='d-flex justify-content-between justify-content-sm-start mb-2'
                  sm='6'
                >
                  <div className='d-flex align-items-center text-muted text-nowrap cursor-pointer'>
                    <Heart
                      size={18}
                      className={classnames('mr-50', {
                        'profile-likes': index % 2,
                      })}
                    />
                    <span>{data.likes}</span>
                  </div>
                </Col>
                <Col
                  className='d-flex justify-content-between justify-content-sm-end align-items-center mb-2'
                  sm='6'
                >
                  <a
                    href='/'
                    className='text-nowrap'
                    onClick={(e) => e.preventDefault()}
                  >
                    <MessageSquare
                      size={18}
                      className='text-body mr-50'
                    ></MessageSquare>
                    <span className='text-muted mr-1'>{data.comments}</span>
                  </a>
                  <a
                    href='/'
                    className='text-nowrap share-post'
                    onClick={(e) => e.preventDefault()}
                  >
                    <Share2 size={18} className='text-body mx-50'></Share2>
                    <span className='text-muted mr-1'>
                      {data.comments + data.likes}
                    </span>
                  </a>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )
      })}
    </>
  )
}
export default ProfilePosts
