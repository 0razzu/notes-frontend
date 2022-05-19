import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from '@reduxjs/toolkit'
import {clearPage} from '../../store/slices/pageSlice'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const AppIndex = ({clearPage, user}) => {
    useEffect(() => {
        clearPage()
    }, [clearPage])


    return (
        <>
            <h2><FormattedMessage id="greeting" /></h2>
            <h3 className={'subtitle'}><FormattedMessage id="app_description" /></h3>

            {!user.login &&
                <article>
                    <section className={'content'}>
                        <p>
                            <FormattedMessage id="register_or_login" values={{
                                login: <Link to={'/login'}><FormattedMessage id="register_or_login_login" /></Link>,
                                register: <Link to={'/register'}><FormattedMessage id="register_or_login_register" /></Link>
                            }} />
                        </p>
                    </section>
                </article>
            }
        </>
    )
}


const mapStateToProps = state => ({
    user: state.user,
})


const mapDispatchToProps = dispatch => ({
    clearPage: bindActionCreators(clearPage, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(AppIndex)
