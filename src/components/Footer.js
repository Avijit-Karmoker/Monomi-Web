import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import footerStyle from '../../styles/Footer.module.css'

const Footer = () => {
  const { t } = useTranslation(['home'])
  return (
    <section id="footer">
      <div className={footerStyle.footer}>
        <div className='container'>
          <div className='row m-0'>
            <div className='col-md-6 col-sm-12 p-0'>
              <div className={footerStyle.image}>
                <Image
                  src='/assets/images/logo.png'
                  alt='monomi'
                  width={180}
                  height={40}
                />
              </div>
              <br />
              <a href='#' className={footerStyle.link}>
                {t('home:footer.link')}
              </a>
              <p className={footerStyle.contact}>{t('home:footer.contact')}</p>
            </div>
            <div className='col-md-6 col-sm-12 p-0'>
              <div className={footerStyle.footerRight}>
                <p className={footerStyle.policy}>
                  {t('home:footer.privatePolicy')}
                </p>
                <p className='m-0' style={{color: '#9EA0A4'}}>{t('home:footer.copyrightIssue')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
