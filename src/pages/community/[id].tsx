import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Profile from '@/components/Profile'
import { Dispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useEffect } from 'react'
import AuthModal from '@/components/AuthModal'
import { getSession } from 'next-auth/client'
import JoinModal from '@/components/JoinModal'

export default function Community() {
  const { community, posts, list, user } = useSelector(
    ({ communities, authentication: { user } }: RootState) => ({
      ...communities,
      user,
    }),
  )
  const { communities, ui } = useDispatch<Dispatch>()
  const { id } = useRouter().query

  useEffect(() => {
    communities.fetchCommunity(id as string)
    communities.fetchPosts(id as string)
    communities.fetchList()
  }, [])

  const openJoinModal = useCallback(() => ui.setJoinModalOpen(true), [ui])

  const handleJoin = useCallback(() => {
    if (user?.status === 'active') {
      openJoinModal()
    } else {
      ui.setAuthModalOpen(true)
    }
  }, [user, ui, openJoinModal])

  return (
    <>
      {community ? (
        <Profile
          community={community}
          posts={posts}
          suggested={list.filter((item) => item.id !== id)}
          onJoin={handleJoin}
        />
      ) : null}
      <AuthModal onSuccess={openJoinModal} />
      <JoinModal />
    </>
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
