import { ChangeEvent } from 'react'

export interface panelProps {
    isPanelOpen:boolean,
    openContactDetail:boolean,
    openPanelForm:boolean
}

export interface successProps {
    isSuccess:boolean,
    successMessage:string
}

export interface errorProps {
    isError:boolean,
    errorMessage:string
}

export interface warningProps {
    isWarning:boolean,
    warningMessage:string
}

export type UseSearchHookType = {
    search:string,
    handleSearch: (e:ChangeEvent<HTMLInputElement>) => void
    handleResetSearch: (value:string) => void
}

export type useGetIdHookType = {
    contactId: number,
    handleGetId: (id:number) => void
}

export type useHandlePageHookType = {
    currentPage: number,
    handleCurrentPage: (page:number) => void,
    handlePrevPage: (page:number) => void,
    handleNextPage: (page:number) => void
}

export type useHandleFormHookType = {
    openForm: boolean,
    handleOpenForm: (value:boolean) => void,
}

export type usePanelHookType = {
    openContactDetail: boolean,
    openPanelForm:boolean,
    isPanelOpen:boolean,
    handleOpenContactOrForm: (props:panelProps) => void,
}

export type useSuccessHookType = {
    isSuccess:boolean,
    successMessage:string,
    handleSuccessModal: (props:successProps) => void
}

export type useErrorHookType = {
    isError:boolean,
    errorMessage:string,
    handleErrorModal: (props:errorProps) => void
}

export type useWarningHookType = {
    isWarning:boolean,
    warningMessage:string,
    handleWarningModal: (props:warningProps) => void
}