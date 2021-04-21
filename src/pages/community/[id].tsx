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
import { fonts } from '@/config'
import RippleButton from '@/components/RippleButton'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'

const namespaces = ['common', 'community']

export default function Community() {
  const { community, posts, list, user } = useSelector(
    ({ communities, authentication: { user } }: RootState) => ({
      ...communities,
      user,
    }),
  )
  const { communities, ui, payments } = useDispatch<Dispatch>()
  const { query, locale } = useRouter()
  const { id } = query

  useEffect(() => {
    communities.fetchList()

    if (user?.status === 'active') {
      payments.fetchInitialPaymentData()
    }
  }, [])

  useEffect(() => {
    communities.fetchCommunity(id as string)
  }, [user?.id, id])

  const startJoinFlow = useCallback(() => {
    if (community?.subscription) {
      ui.addToast({
        title: t('community:alreadyMember'),
        type: 'success',
      })
    } else {
      payments.fetchInitialPaymentData()

      ui.setJoinModalOpen(true)
    }
  }, [ui, payments, community])

  const handleJoin = useCallback(() => {
    if (user?.status === 'active') {
      startJoinFlow()
    } else {
      ui.setAuthModalOpen(true)
    }
  }, [user, ui, startJoinFlow])

  const { t } = useTranslation(namespaces)

  return (
    <Elements
      stripe={PaymentsManager.instance}
      options={{
        fonts: [{ cssSrc: fonts.url }],
        locale: locale as StripeElementLocale,
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
                <span className='font-weight-bold d-md-block'>
                  {t('community:member')}
                </span>
              </RippleButton>
            ) : (
              <RippleButton onClick={handleJoin}>
                <span className='font-weight-bold d-md-block'>
                  {t('community:join')}
                </span>
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
  console.log('Community id:', context.query.id, context.locale)

  return {
    props: {
      session: await getSession(context),
      ...(await serverSideTranslations(context.locale!, namespaces)),
    },
  }
}
