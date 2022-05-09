import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'


const Header = ({login}) => {
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
                <div className={'navbar-item'}>
                    <h2>{login}</h2>
                </div>
            </div>
        </nav>
    )
}


const mapStateToProps = state => ({
    login: state.currentUser.login,
})


export default connect(mapStateToProps)(Header)
