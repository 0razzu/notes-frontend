import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import store from '../store/store'


const Header = () => {
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
                <h2>
                    {store.getState().currentUser.login}
                </h2>
            </div>
        </nav>
    )
}


export default Header
