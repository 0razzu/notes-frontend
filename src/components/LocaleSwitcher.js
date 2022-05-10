import {FormattedMessage} from 'react-intl'
import LANGUAGES from '../i18n/languages'

import '../styles/LocaleSwitcher.sass'
import {bindActionCreators} from '@reduxjs/toolkit'
import {connect} from 'react-redux'
import {setLocale} from '../store/slices/locale/actionCreators'


const LocaleSwitcher = ({locale: currentLocale, setLocale}) => {
    const handleLocaleChange = event => {
        const newLocale = event.target.value
        setLocale(newLocale)
    }

    return (
        <div className={'LocaleSwitcher'}>
            <label htmlFor="language-select"><FormattedMessage id="language" /></label>
            <div className={'control has-icons-left'}>
                <div className={'select is-small'}>
                    <select id="language-select" value={currentLocale} onChange={handleLocaleChange}>
                        {
                            Object.entries(LANGUAGES).map(
                                ([locale, language]) => (<option key={locale} value={locale}>{language}</option>),
                            )
                        }
                    </select>
                </div>
                <span className={'icon is-small is-left'}>
                    <i className={'fas fa-globe'} />
                </span>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    locale: state.localeCode,
})


const mapDispatchToProps = dispatch => ({
    setLocale: bindActionCreators(setLocale, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(LocaleSwitcher)
