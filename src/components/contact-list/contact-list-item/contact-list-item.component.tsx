import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Contact } from '../../../common/interfaces/contact.interface'
import { css } from '@emotion/css'
import InitialsAvatarProps from 'react-initials-avatar'
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { MdOutlineBookmarkAdd } from 'react-icons/md'
import { FiTrash2 } from 'react-icons/fi'
import { useGetId, useHandleForm, useHandleContactOrForm, useHandleWarningModal } from '../../../context/hook/app-hook';

interface Props {
    contact: Contact;
}

const ContactListItem: React.FC<Props> = ({contact}) => {
  const { id, first_name, last_name, phones } = contact
  const full_name: string = first_name + " " + last_name

  const navigate = useNavigate()

  const { handleWarningModal } = useHandleWarningModal()
  const { handleOpenContactOrForm } = useHandleContactOrForm()
  const { handleOpenForm } = useHandleForm()
  const { contactId, handleGetId } = useGetId()

  const [selectedId, setSelectedId] = useState<number>(0)

  const navigatePage = (id:number):void => {
    handleOpenContactOrForm({
        isPanelOpen:true,
        openContactDetail:true,
        openPanelForm:false,
    })
    handleOpenForm(false)
    handleGetId(id)
    navigate(`/contact-detail`)
  }

  const handleDelete = ():void => {
    handleWarningModal({
        isWarning:true,
        warningMessage:`Are you sure want to delete ${full_name}?`
    })
  }

  return (
        <div onClick={(e) => { e.stopPropagation(); navigatePage(id); setSelectedId(id)}} className={css`
            display:flex;
            justify-content: space-between;
            margin:18px;
            box-sizing:border-box;
            padding: 15px;
            border-style:solid;
            border-width:1px;
            border-color:rgba(0, 0, 0, 0.10);
            border-radius: 8px;
            cursor:pointer;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            background-color:${selectedId === 0 ? '' : selectedId === contactId ? '#e2e8f0' : ''}
        `}>
            <div className={css`display:flex;`}>
                <div>
                    <InitialsAvatarProps name={full_name}/>
                </div>
                <div className={css`
                    margin-left:20px;
                `}>
                    <div>
                        <span className={css`font-weight:bold;`}>{full_name}</span>
                    </div>
                    <div className={css`
                        width: 120px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    `}>
                        {
                            phones.map((phone, index) => (
                                <span key={index}>{phone.number}, </span>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={css`display:flex`}>
                <button className={css`cursor:pointer;margin-right: 5px; border:none;background-color:${selectedId === 0 ? '#FFFFFF' : selectedId === contactId ? '#e2e8f0' : '#FFFFFF'}`}>
                    <MdOutlineBookmarkAdd size={23}/>
                </button>
                <button onClick={handleDelete} className={css`cursor:pointer;border:none;background-color:${selectedId === 0 ? '#FFFFFF' : selectedId === contactId ? '#e2e8f0' : '#FFFFFF'}`}>
                    <FiTrash2 size={22}/>
                </button>
            </div>
        </div>
  )
}

export default ContactListItem
