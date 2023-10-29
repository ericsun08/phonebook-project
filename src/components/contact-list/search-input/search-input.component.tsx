import React, { ChangeEvent } from 'react'
import { css } from '@emotion/css'
import { useSearch, useHandlePage } from '../../../context/hook/app-hook';
import { BsSearch } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { InputStyle } from '../contact-list-style';

const SearchInput: React.FC = () => {
  const { search, handleSearch, handleResetSearch } = useSearch()
  const { handleCurrentPage } = useHandlePage()

  const handleSearchChange = (e:ChangeEvent<HTMLInputElement>) => {
    handleSearch(e)
    handleCurrentPage(1)
  }

  return (
    <div className={css`position:relative`}>
      <input value={search} onChange={handleSearchChange} placeholder='Search contact' className={InputStyle}/>
      {
        search ?
          <MdClose 
            size={20} 
            style={{
                position: 'absolute',
                right: '10%',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
            }}
            onClick={() => handleResetSearch('')}
          />
        :
          <BsSearch 
            size={20} 
            style={{
                position: 'absolute',
                right: '10%',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
            }}
          />
      }
    </div>
  )
}

export default SearchInput
