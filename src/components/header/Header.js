import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'
import LogoutButton from './buttons/LogoutButton'
import RegisterButton from './buttons/RegisterButton'
import LogInButton from './buttons/LogInButton'
import '../../styles/Header.sass'


const Header = ({user}) => {
    const loggedIn = (user.login !== undefined)


    return (
        <nav className={'navbar has-shadow'}>
            <div className={'navbar-start'}>
                <div className={'navbar-brand'}>
                    <h1 className={'title'}>
                        <Link to={'/'} className={'navbar-item'}><FormattedMessage id="app_name" /></Link>
                    </h1>
                </div>
            </div>

            <div className={'navbar-end'}>
                {
                    loggedIn?
                        <>
                            <Link to={'/me'} className={'navbar-item'}>{user.login}</Link>
                            <div className={'navbar-item'}>
                                <LogoutButton />
                            </div>
                        </> :
                        <>
                            <div className={'navbar-item'}>
                                <RegisterButton />
                                <LogInButton />
                            </div>
                        </>
                }
            </div>
        </nav>
    )
}


const mapStateToProps = state => ({
    user: state.user,
})


export default connect(mapStateToProps)(Header)
