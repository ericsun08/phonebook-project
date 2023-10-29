import React from 'react'
import { css } from '@emotion/css'
import { IoCheckmarkCircleOutline } from "react-icons/io5"
import { useHandleSuccessModal } from '../../../context/hook/app-hook'
import { ModalContainer, ModalContentContainer, ModalHeader, ModalButton } from '../modal-style'

const SuccessModal: React.FC = () => {
  const { isSuccess, successMessage, handleSuccessModal } = useHandleSuccessModal()

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
            display:${isSuccess ? 'flex' : 'none'};
        `}
    >
      <div className={ModalContainer}
      >
        <div className={ModalContentContainer}>
            <div className={ModalHeader}>
                <div className={css`display:flex;justify-content:center`}>
                    <IoCheckmarkCircleOutline
                        size={55}
                        color={'#4ade80'}
                    />
                </div>
                <div className={css`margin-top:10px;margin-bottom:20px`}>
                    <span className={css`font-weight:bold`}>Success!</span>
                </div>
            </div>
            <div className={css`margin-top:18px`}>
                <span>{successMessage}</span>
            </div>
            <div className={css`margin-top:15px`}>
                <ModalButton onClick={() => handleSuccessModal({isSuccess:false,successMessage:''})}>
                    Ok
                </ModalButton>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal

