import React, { useState, useEffect } from 'react'
import { css } from '@emotion/css'
import { GET_CONTACT_DETAIL, useGetContactDetail } from '../../graphql/useGetContactDetail'
import InitialsAvatarProps from 'react-initials-avatar'
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { UPDATE_CONTACT } from '../../graphql/useEditContact'
import { UPDATE_CONTACT_PHONE } from '../../graphql/useEditPhone'
import { useMutation } from '@apollo/client'
import { ThreeDots } from 'react-loader-spinner'
import { useGetId, useHandleSuccessModal, useHandleErrorModal } from '../../context/hook/app-hook';
import { FormContainer, InputStyle } from '../add-contact-form/add-form-style';
import { CancelButton, UpdateButton, PhoneListContainer } from './contact-detail-style';
import Skeleton from 'react-loading-skeleton';

const ContactDetailComponent:React.FC = () => { 
    const [isEditName, setIsEditName] = useState<boolean>(false)
    const [isEditPhone, setIsEditPhone] = useState<boolean>(false)

    const { contactId } = useGetId()
    const { handleSuccessModal } = useHandleSuccessModal()
    const { handleErrorModal } = useHandleErrorModal()

    const contact = useGetContactDetail(contactId)

    const [firstName, setFirstName] = useState<string | undefined>(contact?.first_name)
    const [lastName, setLastName] = useState<string | undefined>(contact?.last_name)
    const [selectedIndex, setSelectedIndex] = useState<number>()
    const [selectedPhone, setSelectedPhone] = useState<string>('')
    const [newPhone, setNewPhone] = useState<string>('')

    const full_name:string = contact?.first_name + " " + contact?.last_name

    useEffect(() => {
        const fetchContact = () => {
          setFirstName(contact?.first_name);
          setLastName(contact?.last_name);
        };
      
        fetchContact();
      }, [contactId, contact]);

    const [update_contact, { loading }] = useMutation(UPDATE_CONTACT, {
        refetchQueries: [
          { query: GET_CONTACT_DETAIL, variables: { "id": contactId } }
        ]
      })
    
    const [update_contact_phone, { loading: phoneLoading }] = useMutation(UPDATE_CONTACT_PHONE, {
      refetchQueries: [
        { query: GET_CONTACT_DETAIL, variables: { "id": contactId } }
      ]
    })

    const checkSpecialChar = (name:string):boolean => {
      const pattern = /^[A-Za-z\s]+$/
      return pattern.test(name)
    }

    const handleUpdateContact = async () => {
        try {
          if(firstName && lastName){
            if(checkSpecialChar(firstName) && checkSpecialChar(lastName)){
              const { data } = await update_contact({
                variables: {
                    id:contactId,
                    _set:{
                      first_name: firstName,
                      last_name:lastName,
                    }
                }
              })
              if(data){
                  setIsEditName(false)
                  handleSuccessModal({
                    isSuccess:true,
                    successMessage:'New name updated!'
                  })
              }
            } else {
              handleErrorModal({
                isError:true,
                errorMessage: 'Name cannot have special char.'
              })
            }
          } else {
            if(!firstName){
              handleErrorModal({
                isError:true,
                errorMessage:'First name is required'
              })
            } else if(!lastName){
              handleErrorModal({
                isError:true,
                errorMessage:'Last name is required'
              })
            }
          }
        } catch(error){
          console.log(error)
        }
      }
    
      const handleUpdatePhone = async () => {
        try {
          if(newPhone){
            const { data } = await update_contact_phone({
              variables: {
                  pk_columns:{
                    number:selectedPhone,
                    contact_id:contactId
                  },
                  new_phone_number:newPhone
              }
            })
            if(data){
                setIsEditPhone(false)
                handleSuccessModal({
                  isSuccess:true,
                  successMessage:'New phone number updated!'
                })
            }
          } else {
            handleErrorModal({
              isError:true,
              errorMessage:'Phone is required'
            })
          }
        } catch(error){
          console.log(error)
        }
      }
    
      const editPhone = (index:number,phone:string):void => {
        setIsEditPhone(true);
        setSelectedIndex(index); 
        setSelectedPhone(phone)
        setNewPhone(phone)
      }

  return (
    <div>
      {
        contactId !== 0 ?
        <div className={FormContainer}>
        <div className={css`text-align:center;`}>
          {
            contact &&
              <div>
                  <InitialsAvatarProps name={full_name}/>
              </div>
          }
          {
            !contact && 
              <Skeleton style={{width:'60px',height:'60px',borderRadius:'50%', marginBottom:'10px'}}/>
          }
          {
            !isEditName &&
            <div className={css`display:flex;justify-content:center;`}>
              {
                contact &&
                <>
                <div>
                  <h2>{contact?.first_name} {contact?.last_name}</h2>
                </div>
                <div onClick={() => setIsEditName(true)} className={css`cursor:pointer; margin-top: 25px; margin-left: 10px`}>
                  <MdOutlineModeEditOutline size={25}/>
                </div>
                </>
              }
              {
                !contact &&
                  <Skeleton style={{width: '160px',height:'40px', marginBottom: '10px', marginTop: '10px'}}/>
              }
            </div>
          }
          {
            isEditName && 
            <div className={css`margin: 20px 0px;`}>
              <div>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className={InputStyle}/>
              </div>
              <div>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} className={InputStyle}/>
              </div>
              <div className={css`margin-top: 14px; display:flex;`}>
                  <CancelButton onClick={() => setIsEditName(false)}>Cancel</CancelButton>
                  <UpdateButton onClick={() => handleUpdateContact()}>
                    {
                        !loading ? 
                          'Update'
                        :
                          <ThreeDots
                              height={22}
                              width={27}
                              color='#FFFFFF'
                          />
                    }
                  </UpdateButton>
              </div>
            </div>
          }
        </div>
          <PhoneListContainer>
            {
              contact?.phones.map((phone, index) => 
                <div key={index} className={css`margin-bottom: 15px;`}>
                  <div className={css`display:flex;justify-content:space-between`}>
                    <div>
                      <span className={css`font-weight: bold;`}>Phone {index + 1}</span>
                    </div>
                    {
                      isEditPhone && selectedIndex === index ?
                        <div></div>
                      :
                        <div className={css`cursor:pointer`} onClick={() => editPhone(index, phone.number)}>
                          <MdOutlineModeEditOutline size={20}/>
                        </div>
                    }
                  </div>
                  {
                    isEditPhone && selectedIndex === index ?
                    <>
                      <div>
                        <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className={InputStyle}/>
                      </div>
                      <div className={css`margin-top: 14px; display:flex;`}>
                        <CancelButton onClick={() => setIsEditPhone(false)}>Cancel</CancelButton>
                        <UpdateButton onClick={() => handleUpdatePhone()}>
                          {
                              !phoneLoading ? 
                                'Update'
                              :
                                <ThreeDots
                                    height={22}
                                    width={27}
                                    color='#FFFFFF'
                                />
                          }
                        </UpdateButton>
                      </div>
                  </>
                    :
                      <div className={css`margin-top: 5px;`}>
                        <span>{phone.number}</span>
                      </div>
                  }
                </div>
              )
            }
          </PhoneListContainer>
        </div>
        :
        <div className={css`text-align:center;margin-top:20px;`}>
          <span>Select any contact to view contact detail.</span>
        </div>
        }
    </div>
  )
}

export default ContactDetailComponent
