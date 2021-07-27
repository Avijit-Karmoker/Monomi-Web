import React from 'react'
import Registration from '../../components/AuthModal/components/Registration'
import { getSession } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const namespaces = ['common', 'community']

const New = () => {
  return (
    <div>
      <Registration></Registration>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
      ...(await serverSideTranslations(context.locale, namespaces)),
    },
  }
}

export default New
