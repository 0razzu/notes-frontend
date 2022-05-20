import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import HorizontalInputField from '../forms/atoms/HorizontalInputField'
import {Link} from 'react-router-dom'
import {getFromAPI, stringifyParams} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import '../../styles/FeedPage.sass'
import {nanoid} from 'nanoid'


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
        date.setDate(date.getDate() - 1)

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
                <nav className={'pagination'}
                     role={'navigation'}
                     aria-label={'pagination'}>
                    <div>
                        <button className={'pagination-previous'} onClick={previousOnClick} disabled={from <= 0}>
                            <i className={'fas fa-arrow-left'} />
                        </button>
                        <button className={'pagination-next'} onClick={nextOnClick} disabled={!hasNext}>
                            <i className={'fas fa-arrow-right'} />
                        </button>
                    </div>

                    <HorizontalInputField id={'on_page'}
                                          type={'number'}
                                          inputMode={'numeric'}
                                          min={1}
                                          value={count}
                                          onChange={event => setCount(Number(event.target.value))}
                                          errorIds={errors.count} />

                    <button className={'button is-primary'} onClick={showOnClick}>
                        <FormattedMessage id="show" />
                    </button>
                </nav>

                <div className={'notes'}>
                    {notes.map(note =>
                        <div className={'card'} key={note.id}>
                            <div className={'card-content'}>
                                <h3 className={'title is-4'}><Link to={`/notes/${note.id}`}>{note.subject}</Link></h3>
                                <article className={'content'}>
                                    {note.body.split('\n').map(par => <p key={nanoid()}>{par}</p>)}
                                </article>
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
