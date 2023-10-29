import { css } from "@emotion/css"
import styled from "@emotion/styled"
import { maxq, minq } from "../../common/style/style"

const ContactListMainContainer = css`
    min-height: 100vh;
    border-right-style:outset;
    border-right-width:1px;
    border-right-color:rgba(0, 0, 0, 0.10);
    box-sizing: border-box;
    overflow:hidden;
    padding-bottom: 10px;
`

const ContactListHeader = css`
    display:flex;
    justify-content: space-between;
    margin: 20px;
`

const ButtonDesktopView =  css`
    display:block;
    ${minq[5]}{
        display:none;
    }
    ${maxq[0]}{
        display:none;
    }
`

const ButtonMobileView = css`
    display:block;
    ${minq[0]}{
        display:none;
    }
`

const AddContactButton = styled.button`
    padding: 8px;
    padding-left: 13px;
    padding-right: 13px;
    background-color:#FFFFFF;
    color:black;
    border-style:solid;
    border-width: 2px;
    border-color:black;
    border-radius:5px;
    font-weight:bold;
    font-size:15px;
    cursor:pointer;
`

const ScrollContainer = css`
    margin-top: 20px;
    height: 700px;
    overflow: auto;
    ${maxq[0]}{
        height:600px;
    }
`

const EmptyDataMessageContainer = css`
    text-align:center; 
    margin-top:10px;
`

const PaginationContainer = css`
    margin:20px 50px;
    display:flex;
    justify-content:flex-end;
    ${maxq[0]}{
        margin:20px 20px;
    }
`

const PaginationButton = css`
    padding:8px 15px;
    border:none;
    border-radius:5px;
    cursor:pointer;
`

const InputStyle = css`
    width:85%;
    margin-left: 20px;
    padding: 15px;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: rgba(0, 0, 0, 0.10);
    ${maxq[0]}{
        width:83%;
    }
`


export {
    ContactListMainContainer,
    ContactListHeader,
    ButtonDesktopView,
    ButtonMobileView,
    AddContactButton,
    ScrollContainer,
    EmptyDataMessageContainer,
    PaginationContainer,
    PaginationButton,
    InputStyle
}