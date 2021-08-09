import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react';
import CommunityForm from '../../components/CommunityForm'
import { getSession } from 'next-auth/client'


const New = () => {
  return (
    <div>
      <CommunityForm></CommunityForm>
    </div>
  );
};

export default New

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  // if (!session?.accessToken) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: {
      session,
      ...(await serverSideTranslations(context.locale!, (['common']))),
    },
  }
}
