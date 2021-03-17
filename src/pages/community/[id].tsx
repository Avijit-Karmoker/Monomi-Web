import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Profile from '@/components/Profile'
import { Dispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import AuthModal from '@/components/AuthModal'

export default function Community() {
  const { community, posts, list } = useSelector(
    ({ communities }: RootState) => communities,
  )
  const { communities, ui } = useDispatch<Dispatch>()
  const { id } = useRouter().query

  useEffect(() => {
    communities.fetchCommunity(id as string)
    communities.fetchPosts(id as string)
    communities.fetchList()
  }, [])

  return (
    <>
      {community ? (
        <Profile
          community={community}
          posts={posts}
          suggested={list.filter((item) => item.id !== id)}
          onJoin={() => ui.setAuthModalOpen(true)}
        />
      ) : null}
      <AuthModal />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('Community id:', context.query.id)
  return {
    props: {
      // props for your component
    },
  }
}
