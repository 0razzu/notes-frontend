import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {getFromAPI, postToAPI} from '../../utils/fetchFromAPI'
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
    }, [user.super, setUser])


    useEffect(() => {
        if (user.login !== login)
            getFromAPI('/accounts/' + login)
                .then(response => setRequestedUser({...response, login}))
                .catch(e => distributeErrors(e))
        else
            setRequestedUser(user)
    }, [user, login])


    const subscribe = () => {
        postToAPI('/followings', {login})
            .then(() => setRequestedUser({...requestedUser, followed: true, ignored: false}))
            .catch(e => distributeErrors(e))
    }


    const ignore = () => {
        postToAPI('/ignore', {login})
            .then(() => setRequestedUser({...requestedUser, ignored: true, followed: false}))
            .catch(e => distributeErrors(e))
    }


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

                                {!requestedUser.followed &&
                                    <button className={'button is-link'}
                                            onClick={subscribe}>
                                        <FormattedMessage id="subscribe" />
                                    </button>
                                }

                                {!requestedUser.ignored &&
                                    <button className={'button is-danger'}
                                            onClick={ignore}>
                                        <FormattedMessage id="ignore" />
                                    </button>
                                }
                            </div>
                        </section>
                    </article>

                    {!requestedUser.super && user.super &&
                        <div className={classNames('modal', {'is-active': makeSuperDialogIsActive})}>
                            <div className={'modal-background'} />
                            <div className={'modal-content'}>
                                <MakeSuper requestedUser={requestedUser}
                                           setRequestedUser={setRequestedUser}
                                           onSuccess={() => setMakeSuperDialogIsActive(false)} />
                            </div>
                            <button className={'modal-close is-large'}
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
