import {useEffect, useState} from 'react'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import NoteListWithPagination from '../atoms/NoteListWithPagination'
import ChangingFontAwesomeIcon from '../atoms/ChangingFontAwesomeIcon'
import useUser from '../../hooks/useUser'


const NotesPage = ({setPageId}) => {
    const user = useUser()
    const sortingTypes = [undefined, 'asc', 'desc']
    const [sortByRatingIndex, setSortByRatingIndex] = useState(0)


    useEffect(() => {
        setPageId('search')
    }, [setPageId])


    const sortByRatingOnClick = () => setSortByRatingIndex((sortByRatingIndex + 1) % sortingTypes.length)


    return (
        <>
            <h2><FormattedMessage id="search" /></h2>
            <article>
                <NoteListWithPagination getNotesParams={{
                    sortByRating: sortingTypes[sortByRatingIndex]
                }}
                                        linksToAuthors
                                        linksToSections
                                        paginationChildren={
                                            <>
                                                <button className={'button'}
                                                        onClick={sortByRatingOnClick}>
                                                    <ChangingFontAwesomeIcon id={'fa-sort'}
                                                                             show={sortByRatingIndex === 0} />
                                                    <ChangingFontAwesomeIcon id={'fa-sort-up'}
                                                                             show={sortByRatingIndex === 1} />
                                                    <ChangingFontAwesomeIcon id={'fa-sort-down'}
                                                                             show={sortByRatingIndex === 2} />
                                                    <span><FormattedMessage id="rating" /></span>
                                                </button>
                                            </>
                                        } />
            </article>
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(NotesPage)
