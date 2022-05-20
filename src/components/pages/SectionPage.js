import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {getFromAPI} from '../../utils/fetchFromAPI'
import {bindActionCreators} from '@reduxjs/toolkit'
import distributeErrors from '../../utils/distributeErrors'
import {Link, useParams} from 'react-router-dom'
import {setPageName} from '../../store/slices/pageSlice'
import {setUser} from '../../store/slices/userSlice'
import classNames from 'classnames'
import EditSection from '../forms/EditSection'
import DeleteSection from '../forms/DeleteSection'


const SectionPage = ({setPageName, user, setUser}) => {
    const {id} = useParams()
    const [section, setSection] = useState({id})
    const [editDialogIsActive, setEditDialogIsActive] = useState(false)
    const [deleteDialogIsActive, setDeleteDialogIsActive] = useState(false)


    useEffect(() => {
        setPageName(section.name)
    }, [section.name, setPageName])


    useEffect(() => {
        if (!user.super)
            getFromAPI('/account')
                .then(response => setUser(response))
    }, [user.super, setUser])


    useEffect(() => {
        getFromAPI(`/sections/${id}`)
            .then(response => setSection(response))
            .catch(e => distributeErrors(e))
    }, [id])


    return (
        <>
            <h2>{section.name ?? id}</h2>
            {section.name &&
                <>
                    <article>
                        <section className={'content'}>
                            <p>
                                <span className={'label is-inline'}><FormattedMessage id="creator" />: </span>
                                <Link to={`/users/${section.creator.login}`}>{section.creator.login}</Link>
                            </p>
                        </section>

                        {(user.id === section.creator.id || user.super) &&
                            <section className={'content'}>
                                <div className={'buttons'}>
                                    {user.id === section.creator.id &&
                                        <button className={'button is-success'}
                                                onClick={() => setEditDialogIsActive(true)}>
                                            <span className={'icon is-small'}>
                                                <i className={'fa fa-pen'} aria-hidden="true" />
                                            </span>
                                            <span><FormattedMessage id="edit" /></span>
                                        </button>
                                    }

                                    <button className={'button is-danger'}
                                            onClick={() => setDeleteDialogIsActive(true)}>
                                        <span className={'icon is-small'}>
                                            <i className={'fa fa-trash'} aria-hidden="true" />
                                        </span>
                                        <span><FormattedMessage id="delete" /></span>
                                    </button>
                                </div>
                            </section>
                        }
                    </article>

                    {user.id === section.creator.id &&
                        <div className={classNames('modal', {'is-active': editDialogIsActive})}>
                            <div className={'modal-background'} />
                            <div className={'modal-content'}>
                                <EditSection section={section}
                                             setSection={setSection}
                                             setVisible={setEditDialogIsActive} />
                            </div>
                            <button className={'modal-close is-large'}
                                    aria-label="close"
                                    onClick={() => setEditDialogIsActive(false)} />
                        </div>
                    }

                    {(user.id === section.creator.id || user.super) &&
                        <div className={classNames('modal', {'is-active': deleteDialogIsActive})}>
                            <div className={'modal-background'} />
                            <div className={'modal-content'}>
                                <DeleteSection id={section.id} />
                            </div>
                            <button className={'modal-close is-large'}
                                    aria-label="close"
                                    onClick={() => setDeleteDialogIsActive(false)} />
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


export default connect(mapStateToProps, mapDispatchToProps)(SectionPage)
