import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import footerStyle from '../../styles/Footer.module.css'

const Footer = () => {
  const { t } = useTranslation(['home'])
  return (
    <section>
      <div className={footerStyle.footer}>
        <div className='container'>
          <div className='row m-0'>
            <div className='col-md-12 col-sm-12 col-lg-6'>
              <div className={footerStyle.image}>
                <Image
                  src='/../public/assets/images/logo.png'
                  alt='monomi'
                  width='180px'
                  height='40px'
                />
              </div>
              <br />
              <a href='#' className={footerStyle.link}>
                {t('home:footer.link')}
              </a>
              <p className={footerStyle.contact}>{t('home:footer.contact')}</p>
            </div>
            <div className='col-md-12 col-sm-12 col-lg-6'>
              <div className={footerStyle.footerRight}>
                <h5 className={footerStyle.policy}>
                  {t('home:footer.privatePolicy')}
                </h5>
                <p className='m-0'>{t('home:footer.copyrightIssue')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
