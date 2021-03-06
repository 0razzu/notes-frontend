import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {getFromAPI} from '../../utils/fetchFromAPI'
import {bindActionCreators} from '@reduxjs/toolkit'
import distributeErrors from '../../utils/distributeErrors'
import {Link, useParams} from 'react-router-dom'
import {setPageName} from '../../store/slices/pageSlice'
import EditSection from '../forms/EditSection'
import DeleteSection from '../forms/DeleteSection'
import Modal from '../atoms/Modal'
import useUser from '../../hooks/useUser'
import NoteListWithPagination from '../atoms/NoteListWithPagination'
import useUserIdToLogin from '../../hooks/useUserIdToLogin'


const SectionPage = ({setPageName}) => {
    const {id} = useParams()
    const user = useUser()
    const [section, setSection] = useState({id})
    const creatorLogin = useUserIdToLogin(section?.creatorId)
    const [errors, setErrors] = useState({})
    const [editDialogIsActive, setEditDialogIsActive] = useState(false)
    const [deleteDialogIsActive, setDeleteDialogIsActive] = useState(false)


    useEffect(() => {
        setPageName(section.name)
    }, [section.name, setPageName])


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
                        {creatorLogin &&
                            <section className={'content'}>
                                <p>
                                    <span className={'label is-inline'}><FormattedMessage id="creator" />: </span>
                                    <Link to={`/users/${creatorLogin}`}>{creatorLogin}</Link>
                                </p>
                            </section>
                        }

                        {(user.id === section.creatorId || user.super) &&
                            <section className={'content'}>
                                <div className={'buttons'}>
                                    {user.id === section.creatorId &&
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

                        <NoteListWithPagination getNotesParams={{sectionId: id}} linksToAuthors errors={errors} setErrors={setErrors} />
                    </article>

                    {user.id === section.creatorId &&
                        <Modal isVisible={editDialogIsActive} setIsVisible={setEditDialogIsActive}>
                            <EditSection section={section}
                                         setSection={setSection}
                                         setIsVisible={setEditDialogIsActive} />
                        </Modal>
                    }

                    {(user.id === section.creatorId || user.super) &&
                        <Modal isVisible={deleteDialogIsActive} setIsVisible={setDeleteDialogIsActive}>
                            <DeleteSection id={section.id} />
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


export default connect(null, mapDispatchToProps)(SectionPage)
