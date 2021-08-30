import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Creators from '@/components/Creators'
import ForMembers from '@/components/ForMembers'
import Download from '@/components/Download'
import Footer from '@/components/Footer'

export default function Landing() {
  return (
    <div>
      <main>
        <Nav />
        <Hero></Hero>
        <Creators></Creators>
        <ForMembers></ForMembers>
        <Download></Download>
        <Footer></Footer>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ['common', 'home'])),
    },
  }
}
