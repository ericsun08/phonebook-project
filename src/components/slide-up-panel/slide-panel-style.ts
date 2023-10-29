import { css } from "@emotion/css";

const PanelContainer = css`
    position: absolute;
    bottom:0;
    left: 50%; 
    transform: translateX(-50%); 
    width: 100%;
    max-width: 580px;
    min-height: 0;
    background-color: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
    transition: bottom 0.5s ease-in-out;
    word-wrap: break-word;
    z-index: 100;
    margin-left: auto;
    margin-right: auto;
`

export {
    PanelContainer
}