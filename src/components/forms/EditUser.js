import {bindActionCreators} from '@reduxjs/toolkit'
import {setUser} from '../../store/slices/userSlice'
import {connect} from 'react-redux'
import {useEffect, useState} from 'react'
import {getFromAPI, putToAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import LabelledInputWithIcon from './atoms/LabelledInputWithIcon'
import {FormattedMessage} from 'react-intl'
import LabelledInput from './atoms/LabelledInput'
import {Navigate} from 'react-router'


const EditUser = ({user, setUser}) => {
    const [firstName, setFirstName] = useState(user.firstName ?? '')
    const [patronymic, setPatronymic] = useState(user.patronymic ?? '')
    const [lastName, setLastName] = useState(user.lastName ?? '')
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [errors, setErrors] = useState({})
    const [done, setDone] = useState(false)


    useEffect(() => {
        if (!user.firstName)
            getFromAPI('/account')
                .then(response => {
                    setUser(response)
                    setFirstName(response.firstName)
                    setPatronymic(response.patronymic?? '')
                    setLastName(response.lastName)
                })
                .catch(e => distributeErrors(e))
    }, [setUser, user.firstName])


    const handleSubmitChange = event => {
        event.preventDefault()

        const body = {
            firstName,
            patronymic: patronymic === ''? undefined : patronymic,
            lastName,
            oldPassword,
            newPassword,
        }

        putToAPI('/accounts', body)
            .then(response => setUser({
                login: user.login,
                firstName: response.firstName,
                patronymic: response.patronymic,
                lastName: response.lastName,
            }))
            .then(() => {
                setErrors({})
                setDone(true)
            })
            .catch(e => distributeErrors(e, setErrors))
    }


    return (
        done?
            <Navigate to={'/me'} /> :
            <form className={'card form'} onSubmit={handleSubmitChange}>
                <div className={'card-content'}>
                    <div className={'field is-grouped is-grouped-multiline'}>
                        <LabelledInput id="first_name"
                                       type="text"
                                       stateMutator={setFirstName}
                                       errorIds={errors.firstName}
                                       required
                                       value={firstName} />

                        <LabelledInput id="patronymic"
                                       type="text"
                                       stateMutator={setPatronymic}
                                       errorIds={errors.patronymic}
                                       value={patronymic} />

                        <LabelledInput id="last_name"
                                       type="text"
                                       stateMutator={setLastName}
                                       errorIds={errors.lastName}
                                       required
                                       value={lastName} />
                    </div>

                    <div className={'field'}>
                        <LabelledInputWithIcon id="login"
                                               type="text"
                                               iconId="fa-user"
                                               readOnly
                                               value={user.login} />
                    </div>

                    <div className={'field'}>
                        <LabelledInputWithIcon id="old_password"
                                               type="password"
                                               stateMutator={setOldPassword}
                                               iconId="fa-lock"
                                               errorIds={errors.oldPassword}
                                               required />
                    </div>

                    <div className={'field'}>
                        <LabelledInputWithIcon id="new_password"
                                               type="password"
                                               stateMutator={setNewPassword}
                                               iconId="fa-lock"
                                               errorIds={errors.newPassword}
                                               required />
                    </div>

                    <div className={'field has-addons has-addons-centered'}>
                        <div className={'control'}>
                            <button className={'button is-primary'}><FormattedMessage id="save" /></button>
                        </div>
                    </div>
                </div>
            </form>
    )
}


const mapStateToProps = state => ({
    user: state.user,
})


const mapDispatchToProps = dispatch => ({
    setUser: bindActionCreators(setUser, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
