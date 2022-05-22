import {FormattedMessage} from 'react-intl'
import {useEffect, useState} from 'react'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import NoteListWithPagination from '../atoms/NoteListWithPagination'


const FeedPage = ({setPageId}) => {
    const [errors, setErrors] = useState({})


    useEffect(() => {
        setPageId('feed')
    }, [setPageId])


    const getDate = () => {
        const date = new Date()
        date.setDate(date.getDate() - 7)

        return date.toISOString()
    }


    return (
        <>
            <h2><FormattedMessage id="feed" /></h2>
            <article>
                <NoteListWithPagination getNotesParams={{include: 'onlyFollowings', timeFrom: getDate()}}
                                        linksToAuthors
                                        linksToSections
                                        errors={errors}
                                        setErrors={setErrors} />
            </article>
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(FeedPage)
