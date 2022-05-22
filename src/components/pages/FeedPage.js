import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getFromAPI, stringifyParams} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import '../../styles/FeedPage.sass'
import Pagination from '../atoms/Pagination'
import NoteBody from '../atoms/NoteBody'


const FeedPage = ({setPageId}) => {
    const [notes, setNotes] = useState([])
    const [from, setFrom] = useState(0)
    const [count, setCount] = useState(20)
    const [hasNext, setHasNext] = useState(false)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        setPageId('feed')
    }, [setPageId])


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
                include: 'onlyFollowings',
                timeFrom: getDate(),
            }))
                .then(result => setHasNext(result.length === 1))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, notes.length])


    const getDate = () => {
        const date = new Date()
        date.setDate(date.getDate() - 7)

        return date.toISOString()
    }


    const getNotes = from => {
        getFromAPI('/notes' + stringifyParams({
            from,
            count,
            include: 'onlyFollowings',
            timeFrom: getDate(),
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
            <h2><FormattedMessage id="feed" /></h2>
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
            </article>
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(FeedPage)
