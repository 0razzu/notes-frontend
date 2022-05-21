import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'
import CreateNoteButton from './buttons/CreateNoteButton'
import Tab from './Tab'
import LogoutButton from './buttons/LogoutButton'
import RegisterButton from './buttons/RegisterButton'
import LogInButton from './buttons/LogInButton'
import '../../styles/Header.sass'


const Header = ({user}) => {
    const loggedIn = (user.login !== undefined)


    return (
        <nav className={'Header'}>
            <div className={'navbar-brand'}>
                <Link to={'/'} className={'title navbar-item is-uppercase'}>
                    <FormattedMessage id="app_name" />
                </Link>
            </div>

            {loggedIn &&
                <div className={'navbar-start'}>
                    <div className={'navbar-tabs'}>
                        <Tab location={'/users'} pageName={'users'}><FormattedMessage id="users" /></Tab>
                        <Tab location={'/sections'} pageName={'sections'}><FormattedMessage id="sections" /></Tab>
                    </div>
                </div>
            }

            <div className={'navbar-end'}>
                <div className={'navbar-group'}>
                    {loggedIn?
                        <>
                            <CreateNoteButton />
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
