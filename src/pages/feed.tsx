import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { Dispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, Fragment } from 'react'
import { getSession } from 'next-auth/client'
import Avatar from '@/components/Avatar'
import { Card, CardBody, CardText, CardImg, Badge, Media } from 'reactstrap'
import Link from 'next/link'
import Image from 'next/image'
import { DateTime } from 'luxon'

export default function Community() {
  const { user, feed, feedMeta } = useSelector(
    ({ authentication: { user }, communities }: RootState) => ({
      user,
      feed: communities.feed,
      feedMeta: communities.feedMeta,
    }),
  )
  const { communities } = useDispatch<Dispatch>()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      communities.fetchFeed()
    } else {
      router.replace('/')
    }
  }, [user, communities, router])

  return (
    <Fragment>
      <div className='content-header row'>
        <div className='content-header-left col-12 mb-2'>
          <h2 className='content-header-title float-left mb-0'>Feed</h2>
        </div>
      </div>
      <div className='blog-wrapper'>
        <div className='content-detached'>
          <div className='content-body'>
            <div className='blog-list-wrapper card-columns'>
              {feed.map((post) => {
                return (
                  <Card key={post.id}>
                    <CardImg className='img-fluid' src={post.data.image} top />
                    <CardBody>
                      <Media className='align-items-center'>
                        <Avatar
                          className='mr-50'
                          img={post.merchant.logoUrl}
                          imgHeight='24'
                          imgWidth='24'
                        />
                        <Media body>
                          <small className='text-muted mr-25'>by</small>
                          <small>
                            <Link href={`/community/${post.merchant.id}`}>
                              <a className='text-body'>{post.merchant.name}</a>
                            </Link>
                          </small>
                          <span className='text-muted ml-50 mr-25'>|</span>
                          <small className='text-muted'>
                            {DateTime.fromISO(post.time).toLocaleString(
                              DateTime.DATETIME_MED,
                            )}
                          </small>
                        </Media>
                      </Media>
                      {post.type === 'free' ? (
                        <div className='my-1 py-25'>
                          <Badge className='mr-50' color='light-success' pill>
                            Free
                          </Badge>
                        </div>
                      ) : null}
                      <CardText className='blog-content-truncate'>
                        {post.data.text}
                      </CardText>
                      <hr />
                      <div className='d-flex justify-content-end align-items-center'>
                        <Image
                          src='/assets/images/donations-icon@3x.png'
                          width={16}
                          height={16}
                        />
                        <span className='ml-50 text-body font-weight-bold'>
                          {post.data.comments +
                            post.data.likes +
                            post.data.shares}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session?.accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
