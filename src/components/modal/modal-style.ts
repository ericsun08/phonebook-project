import { css } from "@emotion/css";
import styled from "@emotion/styled"

const ModalContainer = css`
    width: 300px;
    min-width: 300px; 
    min-height: 240px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
    word-wrap: break-word;
    z-index: 100;
    margin:auto;
    position: relative;
`

const WarningModalContainer = css`
    width: 300px;
    min-width: 300px; 
    min-height: 26%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
    word-wrap: break-word;
    z-index: 100;
    margin:auto;
    position: relative;
`

const ModalContentContainer = css`
    padding-top:20px;
    text-align:center;
`

const ModalHeader = css`
    border-bottom-style:solid;
    border-bottom-width:1px;
    border-bottom-color:#94a3b8
`

const ModalButton = styled.button`
    cursor:pointer;
    border:none;
    border-radius:5px;
    background-color:black;
    color:#FFFFFF; 
    padding:10px;
    padding-left:20px;
    padding-right:20px;
`

const ModalCancelButton = styled.button`
    cursor:pointer;
    border:none;
    border-radius:5px;
    background-color:#cbd5e1;
    color:black; 
    padding:10px;
    padding-left:20px;
    padding-right:20px;
    margin-right:15px;
`

export {
    ModalContainer,
    WarningModalContainer,
    ModalContentContainer,
    ModalHeader,
    ModalButton,
    ModalCancelButton
}