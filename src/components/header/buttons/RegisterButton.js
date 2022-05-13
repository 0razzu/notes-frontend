import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router-dom'


const RegisterButton = () => {
    return (
        <Link to={'/register'} className={'button is-link'}>
            <FormattedMessage id="register" />
        </Link>
    )
}


export default RegisterButton
