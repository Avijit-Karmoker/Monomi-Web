import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { Dispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/client'

export default function Community() {
  const { user } = useSelector(({ authentication: { user } }: RootState) => ({
    user,
  }))
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [user])

  return user ? (
    <>
      signed in suka {user.firstName} <br />
    </>
  ) : null
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
