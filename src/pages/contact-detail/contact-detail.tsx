import React from 'react'
import { css } from '@emotion/css'
import ContactDetailComponent from '../../components/contact-detail/contact-detail.components';


const ContactDetail: React.FC = () => {
  return (
    <div className={`${css`
        min-height: 100vh;
    `}`}>
      <div className={css`margin:20px;`}>
        <h2>Contact Detail</h2>
      </div>
      <div className={css`margin:20px;`}>
        <ContactDetailComponent/>
      </div>
    </div>
  )
}

export default ContactDetail
