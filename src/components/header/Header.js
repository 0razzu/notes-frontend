import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'
import Tab from './Tab'
import LogoutButton from './buttons/LogoutButton'
import RegisterButton from './buttons/RegisterButton'
import LogInButton from './buttons/LogInButton'
import '../../styles/Header.sass'


const Header = ({user}) => {
    const loggedIn = (user.login !== undefined)


    return (
        <nav className={'navbar'}>
            <div className={'navbar-brand'}>
                <Link to={'/'} className={'title navbar-item is-uppercase has-background-white-ter'}>
                    <FormattedMessage id="app_name" />
                </Link>
            </div>

            {loggedIn &&
                <div className={'navbar-start'}>
                    <div className={'navbar-tabs'}>
                        <Tab location={'/users'} pageName={'users'}><FormattedMessage id="users" /></Tab>
                    </div>
                </div>
            }

            <div className={'navbar-end'}>
                <div className={'navbar-group'}>
                    {
                        loggedIn?
                            <>
                                <Tab location={'/me'} pageName={'my_account'}>{user.login}</Tab>
                                <LogoutButton />
                            </> :
                            <>
                                <RegisterButton />
                                <LogInButton />
                            </>
                    }
                </div>
            </div>
        </nav>
    )
}


const mapStateToProps = state => ({
    user: state.user,
})


export default connect(mapStateToProps)(Header)
