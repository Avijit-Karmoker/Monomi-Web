import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react';
import CommunityForm from '../../components/CommunityForm'

const New = () => {
  return (
    <div>
      <CommunityForm></CommunityForm>
    </div>
  );
};

export default New

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ['common'])),
    },
  }
}