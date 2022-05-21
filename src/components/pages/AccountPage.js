import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {deleteFromAPI, getFromAPI, postToAPI} from '../../utils/fetchFromAPI'
import {bindActionCreators} from '@reduxjs/toolkit'
import distributeErrors from '../../utils/distributeErrors'
import {useParams} from 'react-router-dom'
import {setPageName} from '../../store/slices/pageSlice'
import MakeSuper from '../forms/MakeSuper'
import Modal from '../atoms/Modal'
import useUser from '../../hooks/useUser'


const AccountPage = ({setPageName}) => {
    const {id, login} = useParams()
    const user = useUser()
    const [requestedUser, setRequestedUser] = useState()
    const [makeSuperDialogIsActive, setMakeSuperDialogIsActive] = useState(false)


    useEffect(() => {
        setPageName(requestedUser?.login)
    }, [setPageName, requestedUser])


    useEffect(() => {
        if (id)
            getFromAPI(`/accounts/${id}`)
                .then(response => setRequestedUser(response))
                .catch(e => distributeErrors(e))
        else
            getFromAPI(`/accounts/?login=${login}`)
                .then(response => setRequestedUser(response))
                .catch(e => distributeErrors(e))
    }, [id, login])


    const subscribe = () => {
        postToAPI('/followings', {login: requestedUser.login})
            .then(() => setRequestedUser({...requestedUser, followed: true, ignored: false}))
            .catch(e => distributeErrors(e))
    }


    const unsubscribe = () => {
        deleteFromAPI(`/followings/${requestedUser.login}`)
            .then(() => setRequestedUser({...requestedUser, followed: false}))
            .catch(e => distributeErrors(e))
    }


    const ignore = () => {
        postToAPI('/ignore', {login: requestedUser.login})
            .then(() => setRequestedUser({...requestedUser, ignored: true, followed: false}))
            .catch(e => distributeErrors(e))
    }


    const unignore = () => {
        deleteFromAPI(`/ignore/${requestedUser.login}`)
            .then(() => setRequestedUser({...requestedUser, ignored: false}))
            .catch(e => distributeErrors(e))
    }


    return (
        <>
            <h2>{login ?? requestedUser?.login ?? id}</h2>
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

                            {(requestedUser.followed || requestedUser.ignored || requestedUser.super) &&
                                <p>
                                    {requestedUser.super &&
                                        <span className={'tag is-warning'}><FormattedMessage id="superuser" /></span>
                                    }
                                    {requestedUser.followed &&
                                        <span className={'tag is-link'}><FormattedMessage id="followed_by_me" /></span>
                                    }
                                    {requestedUser.ignored &&
                                        <span className={'tag is-danger'}><FormattedMessage id="ignored_by_me" /></span>
                                    }
                                </p>
                            }
                        </section>

                        <section className={'content'}>
                            <div className={'buttons'}>
                                {!requestedUser.super && user.super &&
                                    <button className={'button is-warning'}
                                            onClick={() => setMakeSuperDialogIsActive(true)}>
                                        <FormattedMessage id="make_super" />
                                    </button>
                                }

                                {requestedUser.followed?
                                    <button className={'button is-link is-outlined'}
                                            onClick={unsubscribe}>
                                        <FormattedMessage id="unsubscribe" />
                                    </button> :
                                    <button className={'button is-link'}
                                            onClick={subscribe}>
                                        <FormattedMessage id="subscribe" />
                                    </button>
                                }

                                {requestedUser.ignored?
                                    <button className={'button is-danger is-outlined'}
                                            onClick={unignore}>
                                        <FormattedMessage id="unignore" />
                                    </button> :
                                    <button className={'button is-danger'}
                                            onClick={ignore}>
                                        <FormattedMessage id="ignore" />
                                    </button>
                                }
                            </div>
                        </section>
                    </article>

                    {!requestedUser.super && user.super &&
                        <Modal isVisible={makeSuperDialogIsActive} setIsVisible={setMakeSuperDialogIsActive}>
                            <MakeSuper requestedUser={requestedUser} setRequestedUser={setRequestedUser} />
                        </Modal>
                    }
                </>
            }
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageName: bindActionCreators(setPageName, dispatch),
})


export default connect(null, mapDispatchToProps)(AccountPage)
