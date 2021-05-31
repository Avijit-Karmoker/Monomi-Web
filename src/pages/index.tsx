import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Nav from '@/components/Nav'
import Header from '@/components/Header'
import ForDevelopers from '@/components/ForDevelopers'
import ForMembers from '@/components/ForMembers'
import Download from '@/components/Download'

export default function Landing() {
  return (
    <div>
      <Nav />
      <main>
        <Header></Header>
        <ForDevelopers></ForDevelopers>
        <ForMembers></ForMembers>
        <Download></Download>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ['common', 'landing'])),
    },
  }
}
