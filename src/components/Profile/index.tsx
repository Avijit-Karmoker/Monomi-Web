import ProfileAbout from './ProfileAbout'
import ProfilePosts from './ProfilePosts'
import ProfileHeader from './ProfileHeader'
import { Row, Col } from 'reactstrap'
import ProfileLatestPhotos from './ProfileLatestPhotos'
import ProfileSuggestedPages from './ProfileSuggestedPages'
import { Community, CommunityPost } from '@/typings'
import { FC, ReactNode } from 'react'

const Profile: FC<{
  community: Community
  posts: CommunityPost[]
  suggested: Community[]
  actionButton?: ReactNode
}> = ({ community, posts, suggested, actionButton }) => {
  return (
    <div id='user-profile'>
      <Row>
        <Col sm='12'>
          <ProfileHeader {...community} actionButton={actionButton} />
        </Col>
      </Row>
      <section id='profile-info'>
        <Row>
          <Col lg={{ size: 3, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
            <ProfileAbout {...community} />
            <ProfileSuggestedPages list={suggested} />
          </Col>
          <Col lg={{ size: 6, order: 2 }} sm={{ size: 12 }} xs={{ order: 1 }}>
            <ProfilePosts list={posts} />
          </Col>
          <Col lg={{ size: 3, order: 3 }} sm={{ size: 12 }} xs={{ order: 3 }}>
            <ProfileLatestPhotos
              list={posts.map(({ data }) => data.image).filter((src) => src)}
            />
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default Profile
