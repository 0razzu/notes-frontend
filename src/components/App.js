import {Outlet} from 'react-router'
import '../styles/App.sass'
import {IntlProvider} from 'react-intl'
import Head from './Head'
import Header from './header/Header'
import Footer from './Footer'
import {connect} from 'react-redux'
import Errors from './Errors'


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
                    <Errors />
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
