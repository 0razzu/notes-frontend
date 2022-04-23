import {FormattedMessage} from 'react-intl'
import {useState} from 'react'
import '../styles/Register.sass'
import fetchFromAPI from '../utils/fetchFromAPI'


const Register = () => {
    const [firstName, setFirstName] = useState()
    const [patronymic, setPatronymic] = useState()
    const [lastName, setLastName] = useState()
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()


    const handleInputChange = (event, stateMutator) => {
        event.preventDefault()
        stateMutator(event.target.value)
    }


    const handleSubmitChange = event => {
        event.preventDefault()
        const body = JSON.stringify({
            firstName,
            patronymic: patronymic === ''? undefined : patronymic,
            lastName,
            login,
            password,
        })
        console.dir(body)

        console.dir(fetchFromAPI('POST', '/accounts', body))
    }


    return (
        <>
            <h2><FormattedMessage id="registration" /></h2>
            <form className={'card form'} onSubmit={handleSubmitChange}>
                <div className={'card-content'}>
                    <div className={'field is-grouped is-grouped-multiline'}>
                        <div className={'control is-expanded'}>
                            <label className={'label'}><FormattedMessage id="first_name" /></label>
                            <input className={'input'}
                                   type="text"
                                   onChange={event => handleInputChange(event, setFirstName)}
                                   required />
                        </div>

                        <div className={'control is-expanded'}>
                            <label className={'label'}><FormattedMessage id="patronymic" /></label>
                            <input className={'input'}
                                   type="text"
                                   onChange={event => handleInputChange(event, setPatronymic)} />
                        </div>

                        <div className={'control is-expanded'}>
                            <label className={'label'}><FormattedMessage id="last_name" /></label>
                            <input className={'input'}
                                   type="text"
                                   onChange={event => handleInputChange(event, setLastName)}
                                   required />
                        </div>
                    </div>

                    <div className={'field'}>
                        <label className={'label'}><FormattedMessage id="login" /></label>
                        <div className={'control has-icons-left'}>
                            <input className={'input'}
                                   type="text"
                                   onChange={event => handleInputChange(event, setLogin)}
                                   required />
                            <span className={'icon is-left'}>
                            <i className={'fas fa-user'} />
                        </span>
                        </div>
                    </div>

                    <div className={'field'}>
                        <label className={'label'}><FormattedMessage id="password" /></label>
                        <div className={'control has-icons-left'}>
                            <input className={'input'}
                                   type="password"
                                   onChange={event => handleInputChange(event, setPassword)}
                                   required />
                            <span className={'icon is-left'}>
                            <i className={'fas fa-lock'} />
                        </span>
                        </div>
                    </div>

                    <div className={'field has-addons has-addons-centered'}>
                        <div className={'control'}>
                            <button className={'button is-primary'}><FormattedMessage id="register" /></button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}


export default Register
