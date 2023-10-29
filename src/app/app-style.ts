import { css } from "@emotion/css";
import { maxq } from "../common/style/style";

const MainContainer = css`
    display: flex;
    flex-wrap:wrap;
    justify-content:center;
    min-height: 100vh;
    background-color:#F5F5F5;
`

const AppContainer = css`
    display: flex;
    width:1200px;
    background-color:#FFFFFF;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

const ContactListContainer = css`
    width: 55%;
    ${maxq[0]}{
        width:100%
    }
`

const ContactDetailContainer = css`
    min-height: 100vh;
    width: 45%;
    ${maxq[0]}{
        display:none;
    }
`

export {
    MainContainer,
    AppContainer,
    ContactListContainer,
    ContactDetailContainer
}