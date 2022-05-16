import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {getFromAPI} from '../../utils/fetchFromAPI'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setUser} from '../../store/slices/userSlice'
import distributeErrors from '../../utils/distributeErrors'
import {Link} from 'react-router-dom'
import {setPageId} from '../../store/slices/pageSlice'
import classNames from 'classnames'
import DeleteAccount from '../forms/DeleteAccount'


const MyAccountPage = ({setPageId, user, setUser}) => {
    const [deleteDialogIsActive, setDeleteDialogIsActive] = useState(false)


    useEffect(() => {
        setPageId('my_account')
    }, [setPageId])


    useEffect(() => {
        getFromAPI('/account')
            .then(response => setUser(response))
            .catch(e => distributeErrors(e))
    }, [setUser])


    return (
        <div className={'MyAccountPage'}>
            <h2><FormattedMessage id="my_account" /></h2>
            <article>
                <section className={'content'}>
                    <p>
                        <span className={'label is-inline'}><FormattedMessage id="id" />: </span>
                        {user.id}
                    </p>
                    <p>
                        <span className={'label is-inline'}><FormattedMessage id="first_name" />: </span>
                        {user.firstName}
                    </p>
                    {user.patronymic &&
                        <p>
                            <span className={'label is-inline'}><FormattedMessage id="patronymic" />: </span>
                            {user.patronymic}
                        </p>
                    }
                    <p>
                        <span className={'label is-inline'}><FormattedMessage id="last_name" />: </span>
                        {user.lastName}
                    </p>
                    <p>
                        <span className={'label is-inline'}><FormattedMessage id="login" />: </span>
                        <span>{user.login}</span>
                    </p>
                    {user.super &&
                        <p>
                            <FormattedMessage id="superuser" />
                        </p>
                    }
                </section>

                <section className={'content'}>
                    <div className={'buttons'}>
                        <Link to={'/me/edit'} className={'button is-link is-outlined'}>
                            <span className={'icon is-small'}>
                                <i className={'fa fa-pen'} aria-hidden="true" />
                            </span>
                            <span><FormattedMessage id="edit" /></span>
                        </Link>

                        <button className={'button is-danger is-outlined'}
                                onClick={() => setDeleteDialogIsActive(true)}>
                            <span className={'icon is-small'}>
                                <i className={'fa fa-trash'} aria-hidden="true" />
                            </span>
                            <span><FormattedMessage id="delete_account" /></span>
                        </button>
                    </div>
                </section>
            </article>

            <div className={classNames('modal', {'is-active': deleteDialogIsActive})}>
                <div className="modal-background" />
                <div className="modal-content">
                    <DeleteAccount />
                </div>
                <button className="modal-close is-large"
                        aria-label="close"
                        onClick={() => setDeleteDialogIsActive(false)} />
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    user: state.user,
})


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
    setUser: bindActionCreators(setUser, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(MyAccountPage)
