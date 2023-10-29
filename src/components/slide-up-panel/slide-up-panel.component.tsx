import React from 'react'
import { css } from '@emotion/css'
import { minq } from '../../common/style/style';
import AddContactForm from '../add-contact-form/add-contact-form.component';
import ContactDetailComponent from '../contact-detail/contact-detail.components';
import { MdOutlineClose } from 'react-icons/md'
import { useHandleContactOrForm } from '../../context/hook/app-hook';
import { PanelContainer } from './slide-panel-style';

const SlideUpPanel:React.FC = () => {
  
  const { isPanelOpen, openContactDetail, openPanelForm, handleOpenContactOrForm } = useHandleContactOrForm()

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
        display:${isPanelOpen ? 'block' : 'none'};
        ${minq[0]}{
            display:none;
          }
    `}>
        <div className={PanelContainer}>
            <div className={css`padding:30px 20px`}>
              {
                openPanelForm && 
                <AddContactForm/>
              }
              {
                openContactDetail &&
                <div>
                  <div className={css`display:flex;justify-content:space-between;cursor:pointer`}>
                    <div>
                      <h3>Contact Detail</h3>
                    </div>
                    <div onClick={() => 
                      handleOpenContactOrForm({
                        isPanelOpen:false,
                        openContactDetail:false,
                        openPanelForm:false,
                      })}
                    >
                      <MdOutlineClose size={22}/>
                    </div>
                  </div>
                  <ContactDetailComponent />
                </div>
              }
            </div>
        </div>
    </div>
  )
}

export default SlideUpPanel
