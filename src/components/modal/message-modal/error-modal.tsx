import React from 'react'
import { css } from '@emotion/css'
import { useHandleErrorModal } from '../../../context/hook/app-hook';
import { ModalContainer, ModalContentContainer, ModalHeader, ModalButton } from '../modal-style';

import { IoCloseCircleOutline } from "react-icons/io5"

const ErrorModal: React.FC = () => {
  const { isError, errorMessage, handleErrorModal } = useHandleErrorModal()

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
            display:${isError ? 'flex' : 'none'};
        `}
    >
      <div className={ModalContainer}
      >
        <div className={ModalContentContainer}>
            <div className={ModalHeader}>
                <div className={css`display:flex;justify-content:center`}>
                    <IoCloseCircleOutline
                        size={55}
                        color={'#f87171'}
                    />
                </div>
                <div className={css`margin-top:10px;margin-bottom:20px`}>
                    <span className={css`font-weight:bold`}>Error!</span>
                </div>
            </div>
            <div className={css`margin-top:18px`}>
                <span>{errorMessage}</span>
            </div>
            <div className={css`margin-top:15px`}>
                <ModalButton onClick={() => handleErrorModal({isError:false, errorMessage:''})}>
                    Try Again!
                </ModalButton>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorModal
