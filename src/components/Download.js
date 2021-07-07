import React, { Suspense } from 'react'
import Image from 'next/image'
import downloadStyle from '../../styles/Download.module.css'
import { Button } from 'reactstrap'
import { useTranslation } from 'react-i18next'

const Download = () => {
  const { t } = useTranslation(['home'])

  return (
    <Suspense fallback='Loading...'>
        <div className={downloadStyle.download} id='download'>
        <div className='container'>
          <div className='row m-0 align-items-center'>
            <div className='col-md-6 col-sm-12 p-0'>
              <div className={downloadStyle.image}>
                <Image
                  src='/../public/assets/images/iPhone12.png'
                  alt='Picture of the author'
                  width={800}
                  height={700}
                />
              </div>
            </div>
            <div className='col-md-6 col-sm-12'>
              <div className={downloadStyle.text}>
                <h1 className='text-white'>
                  {' '}
                  {t('home:download.downloadMonomi')}{' '}
                </h1>
                <p>{t('home:download.becomeMember')}</p>
                <Button className={downloadStyle.button1}>
                  <Image
                    src='/../public/assets/images/Group9.png'
                    alt='PlayStore'
                    width={180}
                    height={50}
                  />
                </Button>
                <Button className={downloadStyle.button2}>
                  <Image
                    src='/../public/assets/images/Group19.png'
                    alt='PlayStore'
                    width={180}
                    height={50}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default Download
