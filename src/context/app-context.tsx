import React, { ChangeEvent, ReactElement, createContext, useReducer, useCallback } from "react";
import { initialState } from "./reducers/app-reducers";
import { AppReducer, ACTION_TYPE, stateType } from "./reducers/app-reducers";  
import { panelProps, successProps, errorProps, warningProps } from "./types/context-type";

const useAppContext = (initialState: stateType) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
    const handleSearch = useCallback((e:ChangeEvent<HTMLInputElement>) => { 
            dispatch({ 
                type: ACTION_TYPE.SEARCH, 
                payload: e.target.value
            })
        },[])
    const handleResetSearch = useCallback((value:string) => {
            dispatch({ 
                type: ACTION_TYPE.RESET_SEARCH,
                payload:value,
            })
        },[])
    const handleGetId = useCallback((id:number) => {
        dispatch({ 
            type: ACTION_TYPE.GET_CONTACT_ID,
            payload:id,
        })
    },[])
    const handleCurrentPage = useCallback((page:number) => {
        dispatch({ 
            type: ACTION_TYPE.HANDLE_PAGE,
            payload:page,
        })
    },[])
    const handlePrevPage = useCallback((page:number) => {
        dispatch({
            type:ACTION_TYPE.HANDLE_PREV_PAGE,
            payload:page
        })
    },[])
    const handleNextPage = useCallback((page:number) => {
        dispatch({
            type:ACTION_TYPE.HANDLE_NEXT_PAGE,
            payload:page
        })
    },[])
    const handleOpenForm = useCallback((value:boolean) => {
        dispatch({
            type:ACTION_TYPE.HANDLE_OPEN_FORM,
            payload:value
        })
    },[])
    const handleOpenContactOrForm = useCallback((props:panelProps) => {
        dispatch({
            type:ACTION_TYPE.HANDLE_OPEN_CONTACT_OR_FORM,
            payload:props
        })
    },[])
    const handleSuccessModal = useCallback((props:successProps) => {
        dispatch({
            type:ACTION_TYPE.HANDLE_SUCCESS_MODAL,
            payload:props
        })
    },[])
    const handleErrorModal = useCallback((props:errorProps) => {
        dispatch({
            type:ACTION_TYPE.HANDLE_ERROR_MODAL,
            payload:props
        })
    },[])
    const handleWarningModal = useCallback((props:warningProps) => {
        dispatch({
            type:ACTION_TYPE.HANDLE_WARNING_MODAL,
            payload:props
        })
    },[])
    return { 
        state, 
        handleSearch, 
        handleResetSearch, 
        handleGetId, 
        handleCurrentPage, 
        handlePrevPage, 
        handleNextPage, 
        handleOpenForm, 
        handleOpenContactOrForm, 
        handleSuccessModal, 
        handleErrorModal, 
        handleWarningModal 
    }
}

type useAppContextType = ReturnType<typeof useAppContext>

const initContextState: useAppContextType = {
    state: initialState,
    handleSearch: (e:ChangeEvent<HTMLInputElement>) => {},
    handleResetSearch: (value:string) => {},
    handleGetId: (id:number) => {},
    handleCurrentPage: (page:number) => {},
    handlePrevPage: (page:number) => {},
    handleNextPage: (page:number) => {},
    handleOpenForm: (value:boolean) => {},
    handleOpenContactOrForm: (props:panelProps) => {},
    handleSuccessModal: (props:successProps) => {},
    handleErrorModal: (props:errorProps) => {},
    handleWarningModal: (props:warningProps) => {}
}

export const AppContext = createContext<useAppContextType>(initContextState)

interface ChildrenType {
    children?: ReactElement | undefined
}

export const AppProvider = ({children, ...initialState}:ChildrenType & stateType): ReactElement => {
    return <AppContext.Provider value={useAppContext(initialState)}>{children}</AppContext.Provider>
}


