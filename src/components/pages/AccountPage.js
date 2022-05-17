import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {getFromAPI, putToAPI} from '../../utils/fetchFromAPI'
import {bindActionCreators} from '@reduxjs/toolkit'
import distributeErrors from '../../utils/distributeErrors'
import {useParams} from 'react-router-dom'
import {setPageName} from '../../store/slices/pageSlice'
import {setUser} from '../../store/slices/userSlice'


const AccountPage = ({setPageName, user, setUser}) => {
    const {login} = useParams()
    const [requestedUser, setRequestedUser] = useState()


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
                .then(response => setRequestedUser(response))
                .catch(e => distributeErrors(e))
        else
            setRequestedUser(user)
    }, [user, login])


    const makeSuper = () => {
        putToAPI(`/accounts/${requestedUser.id}/super`)
            .then(() => setRequestedUser({...requestedUser, super: true}))
            .catch(e => distributeErrors(e))
    }


    return (
        <div className={'MyAccountPage'}>
            <h2>{login}</h2>
            <article>
                <section className={'content'}>
                    <p>
                        <span className={'label is-inline'}><FormattedMessage id="id" />: </span>
                        {requestedUser?.id}
                    </p>
                    <p>
                        <span className={'label is-inline'}><FormattedMessage id="first_name" />: </span>
                        {requestedUser?.firstName}
                    </p>
                    {requestedUser?.patronymic &&
                        <p>
                            <span className={'label is-inline'}><FormattedMessage id="patronymic" />: </span>
                            {requestedUser.patronymic}
                        </p>
                    }
                    <p>
                        <span className={'label is-inline'}><FormattedMessage id="last_name" />: </span>
                        {requestedUser?.lastName}
                    </p>
                    {requestedUser?.super &&
                        <p><FormattedMessage id="superuser" /></p>
                    }
                </section>

                {!requestedUser?.super && user.super &&
                    <section className={'content'}>
                        <button className={'button is-warning'}
                                onClick={() => makeSuper()}>
                            <FormattedMessage id="make_super" />
                        </button>
                    </section>
                }
            </article>
        </div>
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
