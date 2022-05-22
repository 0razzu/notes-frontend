import {FormattedMessage, useIntl} from 'react-intl'
import {useEffect, useState} from 'react'
import {getFromAPI, stringifyParams} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {Link} from 'react-router-dom'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageName} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import useUser from '../../hooks/useUser'
import {useParams} from 'react-router'
import Pagination from '../atoms/Pagination'
import NoteBody from '../atoms/NoteBody'


const UserNotesPage = ({setPageName}) => {
    const {login: authorLogin} = useParams()
    const intl = useIntl()
    const user = useUser()
    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()
    const [notes, setNotes] = useState([])
    const [from, setFrom] = useState(0)
    const [count, setCount] = useState(20)
    const [hasNext, setHasNext] = useState(false)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        if (authorLogin === user.login)
            setTitle(intl.formatMessage({id: 'my_notes'}))

        else
            setTitle(intl.formatMessage({id: 'users_notes'}, {user: authorLogin}))
    }, [authorLogin, user.login, intl])


    useEffect(() => {
        setPageName(title)
    }, [setPageName, title])


    useEffect(() => {
        if (!author) {
            if (authorLogin === user.login)
                setAuthor(user)
            else
                getFromAPI('/accounts/' + stringifyParams({login: authorLogin}))
                    .then(response => setAuthor(response))
                    .catch(e => distributeErrors(e))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        getNotes(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [author?.id])


    useEffect(() => {
        if (notes.length < count)
            setHasNext(false)

        else
            getFromAPI('/notes' + stringifyParams({
                from: from + count,
                count: 1,
                user: author.id,
            }))
                .then(result => setHasNext(result.length === 1))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, notes.length])


    const getNotes = from => {
        if (author?.id)
            getFromAPI('/notes' + stringifyParams({
                from,
                count,
                user: author.id,
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
            <h2>{title}</h2>
            <article>
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
                                <Link to={`/sections/${note.sectionId}`} className={'card-footer-item'}>
                                    <FormattedMessage id="to_section" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageName: bindActionCreators(setPageName, dispatch),
})


export default connect(null, mapDispatchToProps)(UserNotesPage)
