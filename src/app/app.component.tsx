import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from '../context/app-context'
import { initialState } from '../context/reducers/app-reducers'

import { MainContainer, AppContainer, ContactListContainer, ContactDetailContainer } from './app-style'

import ContactList from '../components/contact-list/contact-list.component'
import ContactDetail from '../pages/contact-detail/contact-detail'
import FormModal from '../components/modal/form-modal/form-modal'
import './app.css'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import SuccessModal from '../components/modal/message-modal/success-modal'
import WarningModal from '../components/modal/message-modal/warning-modal'
import ErrorModal from '../components/modal/message-modal/error-modal'
import SlideUpPanel from '../components/slide-up-panel/slide-up-panel.component'

const client = new ApolloClient({
    uri: `https://wpe-hiring.tokopedia.net/graphql`,
    cache: new InMemoryCache()
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
        <AppProvider 
            search={initialState.search} 
            contactId={initialState.contactId} 
            currentPage={initialState.currentPage}
            openForm={initialState.openForm}
            openContactDetail={initialState.openContactDetail}
            openPanelForm={initialState.openPanelForm}
            isPanelOpen={initialState.isPanelOpen}
            isSuccess={initialState.isSuccess}
            successMessage={initialState.successMessage}
            isError={initialState.isError}
            errorMessage={initialState.errorMessage}
            isWarning={initialState.isWarning}
            warningMessage={initialState.warningMessage}
        >
            <div className={MainContainer}>
                <div className={AppContainer}>
                    <BrowserRouter>
                        <div className={ContactListContainer}>
                            <ContactList/>
                        </div>
                        <div className={ContactDetailContainer}>
                            <Routes>
                                <Route path='/phonebook-project' element={<ContactDetail/>}/>
                            </Routes>
                        </div>
                    </BrowserRouter>
                    <SlideUpPanel/>
                    <FormModal/>
                    <SuccessModal/>
                    <WarningModal/>
                    <ErrorModal/>
                </div>
            </div>
        </AppProvider>
    </ApolloProvider>
  )
}

export default App
