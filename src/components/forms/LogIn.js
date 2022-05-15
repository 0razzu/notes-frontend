import {useState} from 'react'
import {postToAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {FormattedMessage} from 'react-intl'
import LabelledInputWithIcon from './atoms/LabelledInputWithIcon'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setUser} from '../../store/slices/userSlice'
import {connect} from 'react-redux'


const LogIn = ({setUser}) => {
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()
    const [errors, setErrors] = useState({})


    const handleSubmitChange = event => {
        event.preventDefault()

        const body = {
            login,
            password,
        }

        postToAPI('/sessions', body)
            .then(() => setUser({login}))
            .then(() => setErrors({}))
            .catch(e => distributeErrors(e, setErrors))
    }


    return (
        <form className={'card form'} onSubmit={handleSubmitChange}>
            <div className={'card-content'}>
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
                        <button className={'button is-primary'}><FormattedMessage id="log_in" /></button>
                    </div>
                </div>
            </div>
        </form>
    )
}


const mapDispatchToProps = dispatch => ({
    setUser: bindActionCreators(setUser, dispatch)
})


export default connect(null, mapDispatchToProps)(LogIn)
