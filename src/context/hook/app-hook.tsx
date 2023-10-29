import { useContext } from 'react'
import { 
    UseSearchHookType, 
    useGetIdHookType, 
    useHandlePageHookType, 
    useHandleFormHookType, 
    usePanelHookType, 
    useErrorHookType, 
    useSuccessHookType, 
    useWarningHookType 
} from "../types/context-type";
import { AppContext } from '../app-context';

export const useSearch = ():UseSearchHookType => {
    const { state: {search}, handleSearch, handleResetSearch } = useContext(AppContext)
    return { search, handleSearch, handleResetSearch }
}

export const useGetId = ():useGetIdHookType => {
    const { state: {contactId}, handleGetId } = useContext(AppContext)
    return { contactId, handleGetId }
}

export const useHandlePage = ():useHandlePageHookType => {
    const { state: {currentPage}, handleCurrentPage, handlePrevPage, handleNextPage } = useContext(AppContext)
    return { currentPage, handleCurrentPage, handlePrevPage, handleNextPage }
}

export const useHandleForm = ():useHandleFormHookType => {
    const { state: {openForm}, handleOpenForm } = useContext(AppContext)
    return { openForm, handleOpenForm }
}

export const useHandleContactOrForm = ():usePanelHookType => {
    const { state: {openContactDetail, openPanelForm, isPanelOpen}, handleOpenContactOrForm } = useContext(AppContext)
    return { openContactDetail, openPanelForm,  isPanelOpen, handleOpenContactOrForm }
}

export const useHandleSuccessModal = ():useSuccessHookType => {
    const { state: {isSuccess, successMessage}, handleSuccessModal } = useContext(AppContext)
    return { isSuccess, successMessage, handleSuccessModal }
}

export const useHandleErrorModal = ():useErrorHookType => {
    const { state: {isError, errorMessage}, handleErrorModal } = useContext(AppContext)
    return { isError, errorMessage, handleErrorModal }
}

export const useHandleWarningModal = ():useWarningHookType => {
    const { state: {isWarning, warningMessage}, handleWarningModal } = useContext(AppContext)
    return { isWarning, warningMessage, handleWarningModal }
}