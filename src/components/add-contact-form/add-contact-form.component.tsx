import React, { useState, ChangeEvent } from 'react'
import { css } from '@emotion/css'
import { useMutation, useLazyQuery } from '@apollo/client'
import { MdOutlineClose, MdAddCircleOutline } from 'react-icons/md'
import { useSearch, useHandlePage, useHandleForm, useHandleContactOrForm, useHandleSuccessModal, useHandleErrorModal } from '../../context/hook/app-hook'
import { FormContainer, InputStyle, AddPhone, AddContactButton} from './add-form-style'
import { CREATE_CONTACT } from '../../graphql/useAddContact'
import { GET_CONTACTS } from '../../graphql/useGetContacts'
import { FaCircleXmark } from 'react-icons/fa6'
import { ThreeDots } from 'react-loader-spinner'

interface Phones {
    number: string
}

const AddContactForm: React.FC = () => {
  const { handleErrorModal } = useHandleErrorModal()
  const { handleSuccessModal } = useHandleSuccessModal()
  const { handleOpenContactOrForm } = useHandleContactOrForm()
  const { handleOpenForm } = useHandleForm()
  const { currentPage } = useHandlePage()
  const { search } = useSearch()

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const initialPhone = { number: '' };
  const [phones, setPhones] = useState<Phones[]>([initialPhone])

  const itemsPerPage:number = 10

  const [insert_contact, { loading }] = useMutation(CREATE_CONTACT, {
    refetchQueries: [
      { query: GET_CONTACTS, variables: { where: { first_name: { _ilike:`%${search}%` } }, limit: itemsPerPage, offset:(currentPage-1) * itemsPerPage, order_by: [{first_name: 'asc'}] } }
    ]
  })

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const addPhone: () => void = () => {
    setPhones([...phones, {number:""}])
  }

  const deletePhone = (index:number): void => {
    if(phones.length > 1){
        let tmpPhones = phones
        tmpPhones.splice(index, 1)  
        setPhones([...tmpPhones])
    } 
  }

  const handlePhoneChange = (index:number, value:string):void => {
    let tmpPhone = phones
    tmpPhone[index].number = value
    setPhones([...tmpPhone])
  }

  const [getContacts] = useLazyQuery(GET_CONTACTS);

  const checkSpecialChar = (name:string):boolean => {
    const pattern = /^[A-Za-z\s]+$/
    return pattern.test(name)
  }

  const phonesNotEmpty = phones.every(phone => phone.number.trim() !== "");
  const phonesEmpty = phones.every(phone => phone.number.trim() === "");

  const handleAddContact = async () => {
    try{
      if(firstName && lastName && phonesNotEmpty){
        if(checkSpecialChar(firstName) && checkSpecialChar(lastName)){
          const { data:NameExist } = await getContacts({
            variables: { 
              where: { 
                first_name: { _eq: firstName }, 
                last_name: { _eq: lastName } 
              } 
            }
          })
          if(NameExist?.contact?.length === 0){
            const { data } = await insert_contact({
              variables: {
                  first_name: firstName,
                  last_name:lastName,
                  phones: phones
              }
            })
            if(data){
              handleOpenContactOrForm({
                  isPanelOpen:false,
                  openContactDetail:false,
                  openPanelForm:false,
              })
              handleSuccessModal({
                isSuccess:true,
                successMessage:'New contact added!'
              })
              handleOpenForm(false)
              setFirstName("")
              setLastName("")
              setPhones([initialPhone])
            }
          } else {
            handleErrorModal({
              isError:true,
              errorMessage: 'Name already exist.'
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
            errorMessage: 'First name is required'
          })
        } else if(!lastName){
          handleErrorModal({
            isError:true,
            errorMessage: 'Last name is required'
          })
        } else if(phonesEmpty){
          handleErrorModal({
            isError:true,
            errorMessage: 'Phone is required'
          })
        }
      }
    }catch(error){
        console.log("err: ",error)
    }
  }

  const handleCloseModal = ():void => {
    handleOpenContactOrForm({
      isPanelOpen:false,
      openContactDetail:false,
      openPanelForm:false,
  })
    handleOpenForm(false)
    setFirstName("")
    setLastName("")
    setPhones([initialPhone])
  }

  return (
    <div className={FormContainer}>
      <div className={css`display:flex; justify-content:space-between`}>
        <div>
            <h3>Add new contact</h3>
        </div>
        <div 
            className={css`
                cursor:pointer;
            `}
            onClick={() => handleCloseModal()}
        >
            <MdOutlineClose size={22}/>
        </div>
      </div>
      <div className={css`
        margin-top: 20px;
      `}>
        <span>First Name</span>
        <input value={firstName} onChange={handleFirstNameChange} type="text" placeholder='Enter first name' className={InputStyle}/>
      </div>
      <div className={css`
        margin-top: 20px;
      `}>
        <span>Last Name</span>
        <input value={lastName} onChange={handleLastNameChange} type="text" placeholder='Enter last name' className={InputStyle}/>
      </div>
      <div className={css`
        margin-top: 20px;
      `}>
        <span>Phone Number:</span>
        {
            phones.map((phone, index) => (
                <div key={index}>
                    <div style={{ position: 'relative' }}>
                        <input
                            value={phone.number}
                            onChange={(e) => handlePhoneChange(index, e.target.value)}
                            type="number"
                            placeholder={`Enter phone number ${index + 1}`}
                            className={InputStyle}
                        />
                        {
                            phones.length > 1 &&
                            <FaCircleXmark
                                color='grey'
                                size={14}
                                style={{
                                    position: 'absolute',
                                    right: '3%',
                                    top: '55%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                }}
                                onClick={() => deletePhone(index)}
                            />
                        }
                    </div>
                </div>
            ))
        }
      </div>
      <AddPhone>
        <div onClick={addPhone} className={css`cursor:pointer; display:flex`}>
          <MdAddCircleOutline size={20}/>
          <span className={css`font-size: 14px; font-weight: bold;margin-left:4px;`}>Add Phone</span>
        </div>
      </AddPhone>
      <div>
        <AddContactButton
            disabled={loading ? true : false}
            onClick={handleAddContact}
        >
          {
            !loading ?
              'Add Contact'
            :
              <ThreeDots
                  height={25}
                  width={30}
                  color='#FFFFFF'
              />
          }
        </AddContactButton>
      </div>
    </div>
  )
}

export default AddContactForm
