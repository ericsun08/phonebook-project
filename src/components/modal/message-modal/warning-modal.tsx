import React from 'react'
import { css } from '@emotion/css'
import { IoAlertCircleOutline } from "react-icons/io5"
import { useMutation } from '@apollo/client'
import { DELETE_CONTACT } from '../../../graphql/useDeleteContact'
import { GET_CONTACTS } from '../../../graphql/useGetContacts'
import { useSearch, useGetId, useHandleSuccessModal, useHandlePage, useHandleWarningModal } from '../../../context/hook/app-hook'
import { ThreeDots } from 'react-loader-spinner'
import { WarningModalContainer, ModalContentContainer, ModalHeader, ModalButton, ModalCancelButton } from '../modal-style'


const WarningModal: React.FC = () => {
  const { isWarning, warningMessage, handleWarningModal } = useHandleWarningModal()

  const { contactId, handleGetId } = useGetId()
  const { handleSuccessModal } = useHandleSuccessModal()
  const { currentPage } = useHandlePage()
  const { search } = useSearch()

  const itemsPerPage:number = 10

  const [deleteContact, { loading }] = useMutation(DELETE_CONTACT, {
    refetchQueries:[
      { query: GET_CONTACTS, variables: { where: { first_name: { _like:`%${search}%` } }, limit: itemsPerPage, offset:(currentPage-1) * itemsPerPage, order_by: [{first_name: 'asc'}] } }
    ]
  });

  const handleDelete = async () => {
    try {
        const { data } = await deleteContact({
            variables: { id: contactId }
        })

        if(data){
           handleSuccessModal({
            isSuccess:true,
            successMessage:'Contact deleted!'
           })
           handleWarningModal({
            isWarning:false,
            warningMessage:''
           })
           handleGetId(0)
        }
    }catch(err){
        console.log(err)
    }
  }

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
            display:${isWarning ? 'flex' : 'none'};
        `}
    >
      <div className={WarningModalContainer}
      >
        <div className={ModalContentContainer}>
            <div className={ModalHeader}>
                <div className={css`display:flex;justify-content:center`}>
                  <IoAlertCircleOutline
                      size={55}
                      color={'#fb923c'}
                  />
                </div>
                <div className={css`margin-top:10px;margin-bottom:20px`}>
                    <span className={css`font-weight:bold`}>Warning!</span>
                </div>
            </div>
            <div className={css`margin-top:18px; margin-left:10px; margin-right:10px`}>
                <span>{warningMessage}</span>
            </div>
            <div className={css`margin-top:15px`}>
                <ModalCancelButton onClick={() => handleWarningModal({isWarning:false, warningMessage:''})}>
                    Cancel
                </ModalCancelButton>
                <ModalButton onClick={handleDelete}>
                  {
                        !loading ? 
                          'Delete'
                        :
                          <ThreeDots
                              height={16}
                              width={27}
                              color='#FFFFFF'
                          />
                  }
                </ModalButton>
            </div>
        </div>
      </div>
    </div>
  )
}

export default WarningModal
