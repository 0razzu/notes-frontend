import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {getFromAPI} from '../../utils/fetchFromAPI'
import {bindActionCreators} from '@reduxjs/toolkit'
import distributeErrors from '../../utils/distributeErrors'
import {useParams} from 'react-router-dom'
import {setPageName} from '../../store/slices/pageSlice'


const AccountPage = ({setPageName}) => {
    const {login} = useParams()
    const [requestedUser, setRequestedUser] = useState()


    useEffect(() => {
        setPageName(login)
    }, [setPageName, login])


    useEffect(() => {
        getFromAPI('/accounts/' + login)
            .then(response => setRequestedUser(response))
            .catch(e => distributeErrors(e))
    }, [login])


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
                </section>
            </article>
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageName: bindActionCreators(setPageName, dispatch),
})


export default connect(null, mapDispatchToProps)(AccountPage)
