import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Profile from '@/components/Profile'
import { Dispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useEffect } from 'react'
import AuthModal from '@/components/AuthModal'
import { getSession } from 'next-auth/client'
import JoinModal from '@/components/JoinModal'
import PaymentsManager from '@/utils/PaymentsManager'
import { Elements } from '@stripe/react-stripe-js'
import { StripeElementLocale } from '@stripe/stripe-js'
import { getLocale } from '@/utils/Internationalization'
import { fonts } from '@/config'
import RippleButton from '@/components/RippleButton'

export default function Community() {
  const { community, posts, list, user } = useSelector(
    ({ communities, authentication: { user } }: RootState) => ({
      ...communities,
      user,
    }),
  )
  const { communities, ui, payments } = useDispatch<Dispatch>()
  const { id } = useRouter().query

  useEffect(() => {
    communities.fetchCommunity(id as string)
    communities.fetchPosts(id as string)
    communities.fetchList()

    if (user?.status === 'active') {
      payments.fetchInitialPaymentData()
    }
  }, [])

  const startJoinFlow = useCallback(() => {
    payments.fetchInitialPaymentData()

    ui.setJoinModalOpen(true)
  }, [ui, payments])

  const handleJoin = useCallback(() => {
    if (user?.status === 'active') {
      startJoinFlow()
    } else {
      ui.setAuthModalOpen(true)
    }
  }, [user, ui, startJoinFlow])

  return (
    <Elements
      stripe={PaymentsManager.instance}
      options={{
        fonts: [{ cssSrc: fonts.url }],
        locale: getLocale() as StripeElementLocale,
      }}
    >
      {community ? (
        <Profile
          community={community}
          posts={posts}
          suggested={list.filter((item) => item.id !== id)}
          actionButton={
            community.subscription ? (
              <RippleButton color='success'>
                <span className='font-weight-bold d-md-block'>Member</span>
              </RippleButton>
            ) : (
              <RippleButton onClick={handleJoin}>
                <span className='font-weight-bold d-md-block'>Join</span>
              </RippleButton>
            )
          }
        />
      ) : null}
      <AuthModal onSuccess={startJoinFlow} />
      <JoinModal />
    </Elements>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('Community id:', context.query.id)
  return {
    props: {
      session: await getSession(context),
    },
  }
}
