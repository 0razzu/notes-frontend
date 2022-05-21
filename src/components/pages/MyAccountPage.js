import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {bindActionCreators} from '@reduxjs/toolkit'
import {Link} from 'react-router-dom'
import {setPageId} from '../../store/slices/pageSlice'
import DeleteAccount from '../forms/DeleteAccount'
import Modal from '../atoms/Modal'
import useUser from '../../hooks/useUser'


const MyAccountPage = ({setPageId}) => {
    const user = useUser()
    const [deleteDialogIsActive, setDeleteDialogIsActive] = useState(false)


    useEffect(() => {
        setPageId('my_account')
    }, [setPageId])


    return (
        <>
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
                            <span className={'tag is-warning'}><FormattedMessage id="superuser" /></span>
                        </p>
                    }
                </section>

                <section className={'content'}>
                    <div className={'buttons'}>
                        <Link to={'/me/edit'} className={'button is-success'}>
                            <span className={'icon is-small'}>
                                <i className={'fa fa-pen'} aria-hidden="true" />
                            </span>
                            <span><FormattedMessage id="edit" /></span>
                        </Link>

                        <button className={'button is-danger'}
                                onClick={() => setDeleteDialogIsActive(true)}>
                            <span className={'icon is-small'}>
                                <i className={'fa fa-trash'} aria-hidden="true" />
                            </span>
                            <span><FormattedMessage id="delete_account" /></span>
                        </button>
                    </div>
                </section>
            </article>

            <Modal isVisible={deleteDialogIsActive} setIsVisible={setDeleteDialogIsActive}>
                <DeleteAccount />
            </Modal>
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(MyAccountPage)
