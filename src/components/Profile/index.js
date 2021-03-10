import ProfilePoll from './ProfilePolls'
import ProfileAbout from './ProfileAbout'
import ProfilePosts from './ProfilePosts'
import ProfileHeader from './ProfileHeader'
import { Row, Col } from 'reactstrap'
import ProfileTwitterFeeds from './ProfileTwitterFeeds'
import ProfileLatestPhotos from './ProfileLatestPhotos'
import ProfileSuggestedPages from './ProfileSuggestedPages'
import ProfileFriendsSuggestions from './ProfileFriendsSuggestions'

const Profile = ({ community }) => {
  return (
    <div id='user-profile'>
      <Row>
        <Col sm='12'>
          <ProfileHeader data={data.header} />
        </Col>
      </Row>
      <section id='profile-info'>
        <Row>
          <Col lg={{ size: 3, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
            <ProfileAbout data={data.userAbout} />
            <ProfileSuggestedPages data={data.suggestedPages} />
            <ProfileTwitterFeeds data={data.twitterFeeds} />
          </Col>
          <Col lg={{ size: 6, order: 2 }} sm={{ size: 12 }} xs={{ order: 1 }}>
            <ProfilePosts data={data.post} />
          </Col>
          <Col lg={{ size: 3, order: 3 }} sm={{ size: 12 }} xs={{ order: 3 }}>
            <ProfileLatestPhotos data={data.latestPhotos} />
            <ProfileFriendsSuggestions data={data.suggestions} />
            <ProfilePoll data={data.polls} />
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default Profile
