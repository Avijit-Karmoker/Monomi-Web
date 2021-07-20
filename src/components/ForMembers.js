import React from 'react'
import { useTranslation } from 'react-i18next'
import memberStyles from '../../styles/ForMembers.module.css'
import Image from 'next/image'

const ForMembers = () => {
  const { t } = useTranslation(['home'])
  return (
    <section id='members'>
      <div className={memberStyles.memberSection}>
        <div className='row me-0 align-items-center'>
          <div className='col-md-5 col-sm-12'>
            <div className={memberStyles.membersText}>
              <h1>{t('home:member.forMember')}</h1>
              <p>{t('home:member.grateFor')}</p>
              <ul>
                <li>{t('home:member.creators')}</li>
                <li>{t('home:member.becomeMember')}</li>
                <li>{t('home:member.uniqueContent')} </li>
              </ul>
            </div>
          </div>
          <div className='col-md-7 col-sm-12 pe-0'>
            <div className={memberStyles.image}>
              <Image
                src='/assets/images/Nariams.png'
                width={900}
                height={650}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForMembers
