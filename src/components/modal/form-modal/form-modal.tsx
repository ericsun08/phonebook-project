import React from 'react'
import { css } from '@emotion/css'
import AddContactForm from '../../add-contact-form/add-contact-form.component';
import { useHandleForm } from '../../../context/hook/app-hook';
import { maxq, minq } from '../../../common/style/style'
import { ModalContainer } from '../modal-style';

const FormModal:React.FC = () => {
  const { openForm } = useHandleForm()

  return (
    <div 
        className={css`
            position:fixed;
            left: 0;
            top:0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            display:${openForm ? 'flex' : 'none'};
            ${minq[5]}{
              display:none;
            }
            ${maxq[0]}{
              display:none;
            }
        `}
    >
      <div className={ModalContainer}
      >
        <AddContactForm/>
      </div>
    </div>
  )
}

export default FormModal
