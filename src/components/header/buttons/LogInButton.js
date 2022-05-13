import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'


const LogInButton = () => {
    return (
        <Link to={'/login'} className={'button is-link is-outlined'}>
            <FormattedMessage id="log_in" />
        </Link>
    )
}


export default LogInButton
