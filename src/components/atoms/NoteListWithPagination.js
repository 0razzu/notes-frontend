import Pagination from './Pagination'
import {Link} from 'react-router-dom'
import {FormattedMessage, useIntl} from 'react-intl'
import {nanoid} from 'nanoid'
import {useEffect, useState} from 'react'
import {getFromAPI, stringifyParams} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import '../../styles/NoteListWithPagination.sass'


const NoteListWithPagination = ({getNotesParams}) => {
    const intl = useIntl()
    const [notes, setNotes] = useState([])
    const [from, setFrom] = useState(0)
    const [count, setCount] = useState(20)
    const [hasNext, setHasNext] = useState(false)
    const [errors, setErrors] = useState({})


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
                ...getNotesParams,
            }))
                .then(result => setHasNext(result.length === 1))
                .catch(e => distributeErrors(e))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, notes.length])


    const getNotes = from => {
        if (paramsLoaded())
            getFromAPI('/notes' + stringifyParams({
                from,
                count,
                ...getNotesParams,
            }))
                .then(result => {
                    setNotes(result)
                    setFrom(from)
                    setErrors({})
                })
                .catch(e => distributeErrors(e, setErrors))
    }


    const paramsLoaded = () => {
        for (const param in getNotesParams)
            if (getNotesParams[param] === undefined)
                return false

        return true
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
                        <div className={'card-content'}>
                            <h3 className={'title is-4'}><Link to={`/notes/${note.id}`}>{note.subject}</Link></h3>
                            <h4 className={'subtitle is-6 has-text-grey'}>
                                <FormattedMessage id="created_on_at" values={{
                                    date: intl.formatDate(note.created),
                                    time: intl.formatTime(note.created),
                                }} />
                            </h4>

                            <article>
                                <section className={'content'}>
                                    {note.body.split('\n').map(par => <p key={nanoid()}>{par}</p>)}
                                </section>
                            </article>
                        </div>

                        <div className={'card-footer'}>
                            <Link to={`/users/byId/${note.authorId}`} className={'card-footer-item'}>
                                <FormattedMessage id="to_authors_page" />
                            </Link>
                            <Link to={`/sections/${note.sectionId}`} className={'card-footer-item'}>
                                <FormattedMessage id="to_section" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}


export default NoteListWithPagination
