import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { GetServerSideProps } from 'next'

export default function Creator() {
  const { id } = useRouter().query
  return (
    <div>
      <h1>Creator: {id}</h1>
      <Image
        src='/assets/images/logo.png'
        height={128.5}
        width={596}
        quality={100}
      />
      <h2>
        Home:
        <Link href='/'>
          <a>this page!</a>
        </Link>
      </h2>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('Creator id:', context.query.id)
  return {
    props: {
      // props for your component
    },
  }
}
