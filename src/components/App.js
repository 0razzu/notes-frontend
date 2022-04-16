import {Outlet} from 'react-router'
import '../styles/App.css'
import {IntlProvider} from 'react-intl'
import LOCALES from '../i18n/locales'
import {useState} from 'react'
import MESSAGES from '../i18n/messages'
import Head from './Head'
import Header from './Header'
import Footer from './Footer'


const App = () => {
    const defaultLocale = LOCALES.ENGLISH
    const [currentLocale, setCurrentLocale] = useState(localStorage.getItem('locale') ?? defaultLocale)


    return (
        <>
            <IntlProvider locale={currentLocale}
                          defaultLocale={defaultLocale}
                          messages={{...MESSAGES[defaultLocale], ...MESSAGES[currentLocale]}}>
                <Head />

                <Header />

                <main>
                    <Outlet />
                </main>

                <Footer localeState={{currentLocale, setCurrentLocale}} />
            </IntlProvider>
        </>
    )
}

export default App
