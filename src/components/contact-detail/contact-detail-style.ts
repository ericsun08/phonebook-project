import styled from '@emotion/styled'

const PhoneListContainer = styled.div`
    border-top-style:solid;
    border-top-width:1px;
    border-top-color: rgba(0, 0, 0, 0.10);
    padding-top: 15px;
`

const CancelButton = styled.button`
    padding:10px; 
    margin-right:10px;
    cursor:pointer;
    border:none;
    border-radius:5px;
    background-color:#cbd5e1;
    color:black;
`

const UpdateButton = styled.button`
    padding:10px;
    cursor:pointer;
    border:none;
    border-radius:5px;
    background-color:black;
    color:#FFFFFF;
`

export {
    CancelButton,
    UpdateButton,
    PhoneListContainer
}