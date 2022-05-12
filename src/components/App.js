import {Outlet} from 'react-router'
import '../styles/App.sass'
import {IntlProvider} from 'react-intl'
import Head from './Head'
import Header from './Header'
import Footer from './Footer'
import {connect} from 'react-redux'
import ErrorHandler from './Errors'


const App = ({locale}) => {
    return (
        <>
            <IntlProvider locale={locale.code}
                          defaultLocale={locale.defaultLocale}
                          messages={locale.messages}>
                <Head />

                <Header />

                <main>
                    <Outlet />
                    <ErrorHandler />
                </main>

                <Footer />
            </IntlProvider>
        </>
    )
}


const mapStateToProps = state => ({
    locale: {code: state.localeCode, ...state.localeData}
})


export default connect(mapStateToProps)(App)
