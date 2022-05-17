import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {getFromAPI} from '../../utils/fetchFromAPI'
import {bindActionCreators} from '@reduxjs/toolkit'
import distributeErrors from '../../utils/distributeErrors'
import {useParams} from 'react-router-dom'
import {setPageName} from '../../store/slices/pageSlice'
import {setUser} from '../../store/slices/userSlice'
import classNames from 'classnames'
import MakeSuper from '../forms/MakeSuper'


const AccountPage = ({setPageName, user, setUser}) => {
    const {login} = useParams()
    const [requestedUser, setRequestedUser] = useState()
    const [makeSuperDialogIsActive, setMakeSuperDialogIsActive] = useState(false)


    useEffect(() => {
        setPageName(login)
    }, [setPageName, login])


    useEffect(() => {
        if (!user.super)
            getFromAPI('/account')
                .then(response => setUser(response))
                .catch(e => distributeErrors(e))
    }, [user.super, setUser])


    useEffect(() => {
        if (user.login !== login)
            getFromAPI('/accounts/' + login)
                .then(response => setRequestedUser({...response, login}))
                .catch(e => distributeErrors(e))
        else
            setRequestedUser(user)
    }, [user, login])


    return (
        <>
            <h2>{login}</h2>
            {requestedUser &&
                <>
                    <article>
                        <section className={'content'}>
                            <p>
                                <span className={'label is-inline'}><FormattedMessage id="id" />: </span>
                                {requestedUser.id}
                            </p>
                            <p>
                                <span className={'label is-inline'}><FormattedMessage id="first_name" />: </span>
                                {requestedUser.firstName}
                            </p>
                            {requestedUser.patronymic &&
                                <p>
                                    <span className={'label is-inline'}><FormattedMessage id="patronymic" />: </span>
                                    {requestedUser.patronymic}
                                </p>
                            }
                            <p>
                                <span className={'label is-inline'}><FormattedMessage id="last_name" />: </span>
                                {requestedUser.lastName}
                            </p>
                            {requestedUser.super &&
                                <p><FormattedMessage id="superuser" /></p>
                            }
                        </section>

                        {!requestedUser.super && user.super &&
                            <section className={'content'}>
                                <button className={'button is-warning'}
                                        onClick={() => setMakeSuperDialogIsActive(true)}>
                                    <FormattedMessage id="make_super" />
                                </button>
                            </section>
                        }
                    </article>

                    {!requestedUser.super && user.super &&
                        <div className={classNames('modal', {'is-active': makeSuperDialogIsActive})}>
                            <div className="modal-background" />
                            <div className="modal-content">
                                <MakeSuper requestedUser={requestedUser}
                                           setRequestedUser={setRequestedUser}
                                           onSuccess={() => setMakeSuperDialogIsActive(false)} />
                            </div>
                            <button className="modal-close is-large"
                                    aria-label="close"
                                    onClick={() => setMakeSuperDialogIsActive(false)} />
                        </div>
                    }
                </>
            }
        </>
    )
}


const mapStateToProps = state => ({
    user: state.user,
})


const mapDispatchToProps = dispatch => ({
    setPageName: bindActionCreators(setPageName, dispatch),
    setUser: bindActionCreators(setUser, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)
