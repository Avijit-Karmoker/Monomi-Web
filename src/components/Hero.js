import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'reactstrap'
import headerStyles from '../../styles/Hero.module.css'

const Header = () => {
  const { t, i18next } = useTranslation(['home'])
  return (
    <section className={headerStyles.header}>
      <div className='row align-items-center container m-auto'>
        <div className='col-md-6 col-sm-12'>
          <div className={headerStyles.headerText}>
            <h1 className={headerStyles.headerh1}>{t('home:hero.heading')}</h1>
            <p className={headerStyles.headerP}>{t('home:hero.about')}</p>
            <Button color='success'>{t('home:hero.callToAction')}</Button>
          </div>
        </div>
        <div className='col-md-6 col-sm-12 p-0'>
          <div className={headerStyles.image}>
            <Image
              src='/../public/assets/images/Hero.png'
              alt='img'
              width={700}
              height={700}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
