export interface stateType {
    search:string,
    contactId: number,
    currentPage:number,
    openForm:boolean,
    openContactDetail:boolean,
    openPanelForm:boolean,
    isPanelOpen:boolean,
    isSuccess:boolean,
    successMessage:string,
    isError:boolean,
    errorMessage:string,
    isWarning:boolean,
    warningMessage:string
}

export const initialState = {
    search: '',
    contactId: 0,
    currentPage: 1,
    openForm:false,
    openContactDetail:false,
    openPanelForm:false,
    isPanelOpen:false,
    isSuccess:false,
    successMessage:'',
    isError:false,
    errorMessage:'',
    isWarning:false,
    warningMessage:''
}

export const enum ACTION_TYPE {
    SEARCH,
    RESET_SEARCH,
    GET_CONTACT_ID,
    HANDLE_PAGE,
    HANDLE_PREV_PAGE,
    HANDLE_NEXT_PAGE,
    HANDLE_OPEN_FORM,
    HANDLE_OPEN_CONTACT_OR_FORM,
    HANDLE_SUCCESS_MODAL,
    HANDLE_ERROR_MODAL,
    HANDLE_WARNING_MODAL
}

interface ReducerAction {
    type: ACTION_TYPE,
    payload?:any
}

export const AppReducer = (state: stateType, action:ReducerAction): stateType => {
    switch (action.type) {
        case ACTION_TYPE.SEARCH:
            return {...state, search:action.payload}
        case ACTION_TYPE.RESET_SEARCH:
            return {...state, search:action.payload}
        case ACTION_TYPE.GET_CONTACT_ID:
            return {...state, contactId:action.payload}
        case ACTION_TYPE.HANDLE_PAGE:
            return {...state, currentPage:action.payload}
        case ACTION_TYPE.HANDLE_PREV_PAGE:
            return {...state, currentPage:action.payload - 1}
        case ACTION_TYPE.HANDLE_NEXT_PAGE:
            return {...state, currentPage:action.payload + 1}
        case ACTION_TYPE.HANDLE_OPEN_FORM:
            return {...state, openForm:action.payload}
        case ACTION_TYPE.HANDLE_OPEN_CONTACT_OR_FORM:
            return {
                ...state, 
                isPanelOpen:action.payload.isPanelOpen,
                openContactDetail:action.payload.openContactDetail,
                openPanelForm:action.payload.openPanelForm
            }
        case ACTION_TYPE.HANDLE_SUCCESS_MODAL:
            return {
                ...state,  
                isSuccess:action.payload.isSuccess,
                successMessage:action.payload.successMessage,
            }
        case ACTION_TYPE.HANDLE_ERROR_MODAL:
            return {
                ...state,  
                isError:action.payload.isError,
                errorMessage:action.payload.errorMessage,
            }
        case ACTION_TYPE.HANDLE_WARNING_MODAL:
            return {
                ...state,  
                isWarning:action.payload.isWarning,
                warningMessage:action.payload.warningMessage,
            }
        default:
            return state
    }
}