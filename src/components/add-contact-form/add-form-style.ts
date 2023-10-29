import { css } from '@emotion/css'
import styled from '@emotion/styled'

const FormContainer = css`
    padding: 15px;
    border-style:solid;
    border-width:1px;
    border-color:rgba(0, 0, 0, 0.10);
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

const InputStyle = css`
  margin-top: 5px;
  width: 95%;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  border-radius: 5px;
`;

const AddPhone = styled.div`
    margin-top:10px;
    margin-bottom:10px;
    display: flex;
    justify-content:flex-end;
`

const AddContactButton = styled.button`
    margin-top: 20px;
    padding:10px;
    width: 100%;
    border:none;
    background-color:black;
    color:#FFFFFF;
    border:none;
    border-radius:5px;
    font-weight:bold;
    font-size:15px;
    cursor:pointer;
    justify-content:center;
    display:flex;
`

export {
    FormContainer,
    InputStyle,
    AddPhone,
    AddContactButton,
}