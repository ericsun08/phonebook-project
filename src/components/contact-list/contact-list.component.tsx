import React from 'react'
import SearchInput from './search-input/search-input.component'
import ContactListItem from './contact-list-item/contact-list-item.component'
import { GET_CONTACTS } from '../../graphql/useGetContacts'
import { Contact } from '../../common/interfaces/contact.interface'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { css } from '@emotion/css'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'
import { useQuery } from '@apollo/client'
import { useSearch, useHandlePage, useHandleForm, useHandleContactOrForm } from '../../context/hook/app-hook'
import { 
  ContactListMainContainer, 
  ContactListHeader, 
  ButtonDesktopView, 
  ButtonMobileView, 
  AddContactButton, 
  ScrollContainer, 
  EmptyDataMessageContainer, 
  PaginationContainer 
} from './contact-list-style'



const ContactList: React.FC = () => {
  const { handleOpenContactOrForm } = useHandleContactOrForm()
  const { handleOpenForm } = useHandleForm()
  const { currentPage, handlePrevPage, handleNextPage } = useHandlePage()
  const { search } = useSearch()

  const itemsPerPage:number = 10

  const { data, loading } = useQuery(GET_CONTACTS, {
    variables: { where: { first_name: { _like:`%${search}%` } }, limit: itemsPerPage, offset:(currentPage - 1) * itemsPerPage, order_by: [{first_name: 'asc'}] },
    fetchPolicy: "network-only"  
  })

  return (
    <div className={ContactListMainContainer}>
      <div>
        <div className={ContactListHeader}>
          <h2>My Contacts</h2>
          <div className={ButtonDesktopView}>
            <AddContactButton onClick={() => handleOpenForm(true)}>+</AddContactButton>
          </div>
          <div className={ButtonMobileView}>
            <AddContactButton onClick={() => 
              handleOpenContactOrForm({
                  isPanelOpen:true,
                  openContactDetail:false,
                  openPanelForm:true,
              })} 
            >+</AddContactButton>
          </div>
        </div>
        <div className={css`
          position:relative;
        `}>
            <SearchInput />
        </div>
        <div className={ScrollContainer}>
          {
            !loading && data?.contact?.map((contact:Contact, index:number) => (
              <div key={index}>
                <ContactListItem contact={contact} />
              </div>
            ))
          }
          {
            loading && 
            <div className={css`padding:20px`}>
              <Skeleton 
                count={8} 
                style={{
                  height: '80px',
                  marginBottom:'10px'
                }}
              />
            </div>
          }
          {
            !loading && search && data?.contact?.length === 0 &&
            <div className={EmptyDataMessageContainer}>
              <span>There is no '<span className={css`font-weight:bold`}>{search}</span>' on your contact list</span>
            </div>
          }
          {
            !loading && !search && data?.contact?.length === 0 &&
            <div className={EmptyDataMessageContainer}>
              <span>There is no contact list</span>
            </div>
          }
        </div>
        <div className={PaginationContainer}>
          <button 
            className={`${css`padding:8px 15px;border:none;border-radius:5px;background-color:${currentPage === 1 ? '#d1d5db' : 'black'};color:#FFFFFF;cursor:pointer`}`}
            onClick={() => handlePrevPage(currentPage)} 
            disabled={currentPage === 1}
          >
            <MdOutlineArrowBackIos/>
          </button>
          <span className={css`margin: 5px 10px`}>Page {currentPage}</span>
          <button 
            className={css`padding:8px 15px;border:none;border-radius:5px;background-color:${data?.contact?.length < itemsPerPage ? '#d1d5db': 'black'};color:#FFFFFF;cursor:pointer`}
            onClick={() => handleNextPage(currentPage)}
            disabled={data?.contact?.length < itemsPerPage}
          >
            <MdOutlineArrowForwardIos/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactList
