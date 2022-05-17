import {FormattedMessage} from 'react-intl'
import {useState} from 'react'
import {postToAPI} from '../../utils/fetchFromAPI'
import {setUser} from '../../store/slices/userSlice'
import {bindActionCreators} from '@reduxjs/toolkit'
import {connect} from 'react-redux'
import LabelledInput from './atoms/LabelledInput'
import LabelledInputWithIcon from './atoms/LabelledInputWithIcon'
import distributeErrors from '../../utils/distributeErrors'


const Register = ({setUser}) => {
    const [firstName, setFirstName] = useState()
    const [patronymic, setPatronymic] = useState()
    const [lastName, setLastName] = useState()
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()
    const [errors, setErrors] = useState({})


    const handleSubmit = event => {
        event.preventDefault()

        const body = {
            firstName,
            patronymic: patronymic === ''? undefined : patronymic,
            lastName,
            login,
            password,
        }

        postToAPI('/accounts', body)
            .then(response => setUser(response))
            .then(() => setErrors({}))
            .catch(e => distributeErrors(e, setErrors))
    }


    return (
        <form className={'card form'} onSubmit={handleSubmit}>
            <div className={'card-content'}>
                <div className={'field is-grouped is-grouped-multiline'}>
                    <LabelledInput id="first_name"
                                   type="text"
                                   stateMutator={setFirstName}
                                   required
                                   errorIds={errors.firstName} />

                    <LabelledInput id="patronymic"
                                   type="text"
                                   stateMutator={setPatronymic}
                                   errorIds={errors.patronymic} />

                    <LabelledInput id="last_name"
                                   type="text"
                                   stateMutator={setLastName}
                                   required
                                   errorIds={errors.lastName} />
                </div>

                <div className={'field'}>
                    <LabelledInputWithIcon id="login"
                                           type="text"
                                           stateMutator={setLogin}
                                           required
                                           iconId="fa-user"
                                           errorIds={errors.login} />
                </div>

                <div className={'field'}>
                    <LabelledInputWithIcon id="password"
                                           type="password"
                                           stateMutator={setPassword}
                                           required
                                           iconId="fa-lock"
                                           errorIds={errors.password} />
                </div>

                <div className={'field has-addons has-addons-centered'}>
                    <div className={'control'}>
                        <button className={'button is-primary'}><FormattedMessage id="register" /></button>
                    </div>
                </div>
            </div>
        </form>
    )
}


const mapDispatchToProps = dispatch => ({
    setUser: bindActionCreators(setUser, dispatch)
})


export default connect(null, mapDispatchToProps)(Register)
