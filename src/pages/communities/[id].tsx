import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Profile from '@/components/Profile'
import { Dispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useEffect, useRef } from 'react'
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
import useAsyncReference from '@/hooks/useAsyncReference'

const namespaces = ['common', 'community']

export default function Community() {
  const { community, posts, list, user, selectedId, subscription } =
    useSelector(({ communities, authentication: { user } }: RootState) => ({
      ...communities,
      user,
    }))
  const { communities, ui, payments, authentication } = useDispatch<Dispatch>()
  const { query, locale } = useRouter()
  const { id, magicToken } = query
  const [subscriptionRef] = useAsyncReference(subscription)

  const { t } = useTranslation(namespaces)

  const startJoinFlow = useCallback(async () => {
    if (subscriptionRef.current?.status === 'active') {
      ui.addToast({
        title: t('community:alreadyMember'),
        type: 'success',
      })
    } else {
      await payments.fetchInitialPaymentData()

      ui.setJoinModalOpen(true)
    }
  }, [ui, payments, subscriptionRef, t])

  const handleJoin = useCallback(() => {
    if (user?.status === 'active') {
      startJoinFlow()
    } else {
      ui.setAuthModalOpen(true)
    }
  }, [user, ui, startJoinFlow])

  const handleQueryParams = useCallback(async () => {
    if (typeof id === 'string') {
      communities.setSelectedId(id)
    }

    if (typeof magicToken === 'string') {
      try {
        const user = await authentication.loginWithMagicToken(magicToken)

        if (user?.status === 'active') {
          startJoinFlow()
        } else {
          ui.setAuthModalOpen(true)
        }
      } catch {}
    }
  }, [id])

  useEffect(() => {
    handleQueryParams()
  }, [handleQueryParams])

  useEffect(() => {
    if (selectedId) {
      communities.fetchCommunity(selectedId)

      communities.fetchUserData()
    }
  }, [selectedId])

  useEffect(() => {
    communities.fetchList()
  }, [])

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
            subscription?.status === 'active' ? (
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
