import {Link, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {getFromAPI} from '../../../utils/fetchFromAPI'
import distributeErrors from '../../../utils/distributeErrors'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageName} from '../../../store/slices/pageSlice'
import {connect} from 'react-redux'
import {FormattedMessage, useIntl} from 'react-intl'
import {nanoid} from 'nanoid'
import useUser from '../../../hooks/useUser'
import Modal from '../../atoms/Modal'
import DeleteNote from '../../forms/DeleteNote'
import '../../../styles/NotePage.sass'
import NoteComments from './NoteComments'
import RateNote from '../../forms/RateNote'
import useUserIdToLogin from '../../../hooks/useUserIdToLogin'


const NotePage = ({setPageName}) => {
    const {id} = useParams()
    const intl = useIntl()
    const user = useUser()
    const [note, setNote] = useState()
    const authorLogin = useUserIdToLogin(note?.authorId)
    const [sectionName, setSectionName] = useState()
    const [mark, setMark] = useState()
    const [revisions, setRevisions] = useState([])
    const [rateNoteDialogIsActive, setRateNoteDialogIsActive] = useState(false)
    const [revisionsModalIsActive, setRevisionsModalIsActive] = useState(false)
    const [deleteDialogIsActive, setDeleteDialogIsActive] = useState(false)


    useEffect(() => {
        setPageName(note?.subject)
    }, [note?.subject, setPageName])


    useEffect(() => {
        getFromAPI(`/notes/${id}`)
            .then(response => setNote(response))
            .catch(e => distributeErrors(e))
    }, [id])


    useEffect(() => {
        if (note?.sectionId)
            getFromAPI(`/sections/${note.sectionId}`)
                .then(response => setSectionName(response.name))
                .catch(e => distributeErrors(e))
    }, [note?.sectionId])


    useEffect(() => {
        getFromAPI(`/notes/${id}/rating`)
            .then(response => setMark(response.rating))
            .catch(e => distributeErrors(e))
    }, [id])


    const viewRevisions = () => {
        if (revisions.length === 0)
            getFromAPI(`/notes/${id}/revisions`)
                .then(response => setRevisions(response))
                .catch(e => distributeErrors(e))

        setRevisionsModalIsActive(true)
    }


    return (
        <>
            <h2>{note?.subject ?? id}</h2>

            {note &&
                <>
                    <h3 className={'subtitle is-6 has-text-grey'}>
                        <p>
                            <FormattedMessage id="note_created_on_at" values={{
                                date: intl.formatDate(note.created),
                                time: intl.formatTime(note.created),
                            }} />
                        </p>
                        <p>
                            <FormattedMessage id="revision_id" />: {note.revisionId}
                        </p>
                    </h3>

                    <article>
                        <section className={'content'}>
                            {note.body.split('\n').map(par => <p key={nanoid()}>{par}</p>)}
                        </section>

                        <section className={'content'}>
                            <p>
                                <strong><FormattedMessage id="author" />: </strong>
                                {authorLogin?
                                    <Link to={`/users/${authorLogin}`}>{authorLogin}</Link> :
                                    <Link to={`/users/byId/${note.authorId}`}>{note.authorId}</Link>
                                }
                                <br />
                                <strong><FormattedMessage id="section" />: </strong>
                                <Link to={`/sections/${note.sectionId}`}>{sectionName ?? note.sectionId}</Link>

                                {user.id !== note.authorId && mark &&
                                    <>
                                        <br />
                                        <strong><FormattedMessage id="your_mark_for_note" />: </strong>
                                        {mark}
                                    </>
                                }
                            </p>
                        </section>

                        <section className={'content'}>
                            <div className={'buttons'}>
                                <button className={'button is-link'} onClick={viewRevisions}>
                                    <FormattedMessage id="view_revisions" />
                                </button>

                                {user.id !== note.authorId &&
                                    <button className={'button is-warning'}
                                            onClick={() => setRateNoteDialogIsActive(true)}>
                                        {mark?
                                            <FormattedMessage id="change_mark" /> :
                                            <FormattedMessage id="rate" />
                                        }
                                    </button>
                                }

                                {(user.id === note.authorId || user.super) &&
                                    <>
                                        {user.id === note.authorId &&
                                            <Link to={`/notes/${id}/edit`} className={'button is-success'}>
                                                <span className={'icon is-small'}>
                                                    <i className={'fa fa-pen'} aria-hidden="true" />
                                                </span>
                                                <span><FormattedMessage id="edit" /></span>
                                            </Link>
                                        }

                                        <button className={'button is-danger'}
                                                onClick={() => setDeleteDialogIsActive(true)}>
                                            <span className={'icon is-small'}>
                                                <i className={'fa fa-trash'} aria-hidden="true" />
                                            </span>
                                            <span><FormattedMessage id="delete" /></span>
                                        </button>
                                    </>
                                }
                            </div>
                        </section>
                    </article>

                    <NoteComments note={note} />

                    <Modal isVisible={revisionsModalIsActive} setIsVisible={setRevisionsModalIsActive}>
                        <div className={'revisions'}>
                            <h2 className={'title'}><FormattedMessage id="revisions" /></h2>

                            {revisions.map(revision =>
                                <div className={'card'} key={revision.id}>
                                    <div className={'card-content'}>
                                        <h3 className={'title is-4'}>
                                            <FormattedMessage id="revision" /> {revision.id}
                                        </h3>
                                        <h4 className={'subtitle is-6 has-text-grey'}>
                                            <FormattedMessage id="note_created_on_at" values={{
                                                date: intl.formatDate(revision.created),
                                                time: intl.formatTime(revision.created),
                                            }} />
                                        </h4>
                                        <article>
                                            <section className={'content'}>
                                                {revision.body.split('\n').map(par => <p key={nanoid()}>{par}</p>)}
                                            </section>
                                        </article>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Modal>

                    {user.id !== note.authorId &&
                        <Modal isVisible={rateNoteDialogIsActive} setIsVisible={setRateNoteDialogIsActive}>
                            <RateNote noteId={note.id}
                                      mark={mark}
                                      setMark={setMark}
                                      setIsVisible={setRateNoteDialogIsActive} />
                        </Modal>
                    }

                    {(user.id === note.authorId || user.super) &&
                        <Modal isVisible={deleteDialogIsActive} setIsVisible={setDeleteDialogIsActive}>
                            <DeleteNote id={note.id} />
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


export default connect(null, mapDispatchToProps)(NotePage)
