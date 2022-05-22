import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {getFromAPI, stringifyParams} from '../../utils/fetchFromAPI'
import {bindActionCreators} from '@reduxjs/toolkit'
import distributeErrors from '../../utils/distributeErrors'
import {Link, useParams} from 'react-router-dom'
import {setPageName} from '../../store/slices/pageSlice'
import EditSection from '../forms/EditSection'
import DeleteSection from '../forms/DeleteSection'
import Modal from '../atoms/Modal'
import useUser from '../../hooks/useUser'
import Pagination from '../atoms/Pagination'
import NoteBody from '../atoms/NoteBody'


const SectionPage = ({setPageName}) => {
    const {id} = useParams()
    const user = useUser()
    const [section, setSection] = useState({id})
    const [notes, setNotes] = useState([])
    const [from, setFrom] = useState(0)
    const [count, setCount] = useState(20)
    const [hasNext, setHasNext] = useState(false)
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


    useEffect(() => {
        getNotes(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        if (notes.length < count)
            setHasNext(false)

        else
            getFromAPI('/notes' + stringifyParams({
                from: from + count,
                count: 1,
                sectionId: id,
            }))
                .then(result => setHasNext(result.length === 1))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, notes.length])


    const getNotes = from => {
        getFromAPI('/notes' + stringifyParams({
            from,
            count,
            sectionId: id,
        }))
            .then(result => {
                setNotes(result)
                setFrom(from)
                setErrors({})
            })
            .catch(e => distributeErrors(e, setErrors))
    }


    const previousOnClick = () => {
        let newFrom = from - count
        if (newFrom <= 0)
            newFrom = 0

        getNotes(newFrom)
    }


    const nextOnClick = () => getNotes(from + count)


    const showOnClick = () => getNotes(from)


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

                        <Pagination previousOnClick={previousOnClick}
                                    previousDisabled={from <= 0}
                                    nextOnClick={nextOnClick}
                                    nextDisabled={!hasNext}
                                    count={count}
                                    setCount={setCount}
                                    countErrors={errors.count}
                                    showOnClick={showOnClick} />

                        <div className={'notes'}>
                            {notes.map(note =>
                                <div className={'card'} key={note.id}>
                                    <NoteBody note={note} />

                                    <div className={'card-footer'}>
                                        <Link to={`/users/byId/${note.authorId}`} className={'card-footer-item'}>
                                            <FormattedMessage id="to_authors_page" />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>

                    {user.id === section.creator.id &&
                        <Modal isVisible={editDialogIsActive} setIsVisible={setEditDialogIsActive}>
                            <EditSection section={section}
                                         setSection={setSection}
                                         setVisible={setEditDialogIsActive} />
                        </Modal>
                    }

                    {(user.id === section.creator.id || user.super) &&
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
