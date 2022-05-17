import {useState} from 'react'
import {deleteFromAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import LabelledInputWithIcon from './atoms/LabelledInputWithIcon'
import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from '@reduxjs/toolkit'
import {clearUser} from '../../store/slices/userSlice'
import {connect} from 'react-redux'


const DeleteAccount = ({clearUser}) => {
    const [password, setPassword] = useState()
    const [errors, setErrors] = useState({})


    const handleSubmit = event => {
        event.preventDefault()

        deleteFromAPI('/accounts', {password})
            .then(() => clearUser())
            .then(() => setErrors({}))
            .catch(e => distributeErrors(e, setErrors))
    }


    return (
        <form className={'card form'} onSubmit={handleSubmit}>
            <div className={'card-content'}>
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
                        <button className={'button is-danger'}><FormattedMessage id="delete_account" /></button>
                    </div>
                </div>
            </div>
        </form>
    )
}


const mapDispatchToProps = dispatch => ({
    clearUser: bindActionCreators(clearUser, dispatch)
})


export default connect(null, mapDispatchToProps)(DeleteAccount)
