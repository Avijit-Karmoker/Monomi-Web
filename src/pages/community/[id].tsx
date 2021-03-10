import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Profile from '@/components/Profile'
import { Dispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function Community() {
  const { community } = useSelector(({ communities }: RootState) => communities)
  const dispatch = useDispatch<Dispatch>()
  const { id } = useRouter().query

  useEffect(() => {
    dispatch.communities.fetchCommunity(id as string)
  }, [])

  return community ? <Profile community={community} /> : null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('Community id:', context.query.id)
  return {
    props: {
      // props for your component
    },
  }
}
