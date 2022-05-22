import {useEffect, useState} from 'react'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import {FormattedMessage, useIntl} from 'react-intl'
import NoteListWithPagination from '../atoms/NoteListWithPagination'
import ChangingFontAwesomeIcon from '../atoms/ChangingFontAwesomeIcon'
import useUser from '../../hooks/useUser'
import {getFromAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import classNames from 'classnames'
import {handleInputChange} from '../forms/actions'
import FormFieldErrorCaption from '../forms/atoms/FormFieldErrorCaption'


const NotesPage = ({setPageId}) => {
    const intl = useIntl()
    const user = useUser()
    const [sections, setSections] = useState()
    const [sectionId, setSectionId] = useState()
    const sortingTypes = [undefined, 'asc', 'desc']
    const [sortByRatingIndex, setSortByRatingIndex] = useState(0)
    const [tags, setTags] = useState()
    const [allTags, setAllTags] = useState(false)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        setPageId('search')
    }, [setPageId])


    useEffect(() => {
        getFromAPI('/sections')
            .then(response => setSections(response))
            .catch(e => distributeErrors(e))
    }, [])


    const sortByRatingOnClick = () => setSortByRatingIndex((sortByRatingIndex + 1) % sortingTypes.length)


    return (
        <>
            <h2><FormattedMessage id="search" /></h2>
            {user.id && sections &&
                <article>
                    <NoteListWithPagination getNotesParams={{
                        sectionId: sectionId === ''? undefined : sectionId,
                        sortByRating: sortingTypes[sortByRatingIndex],
                        tags: tags?.length? tags.split(/\s+/).join(',') : undefined,
                        allTags: tags?.length? allTags : undefined,
                    }}
                                            linksToAuthors
                                            linksToSections
                                            paginationChildren={
                                                <>
                                                    <div className={'field'}>
                                                        <div className={classNames('control', {'is-danger': errors.sectionId})}>
                                                            <div className={'select'}>
                                                                <select onChange={event => handleInputChange(event, setSectionId)}>
                                                                    <option value={''}>
                                                                        {intl.formatMessage({id: 'any_section'})}
                                                                    </option>
                                                                    {sections.map(section =>
                                                                        <option key={section.id}
                                                                                value={section.id}>
                                                                            {section.name}
                                                                        </option>)}
                                                                </select>
                                                            </div>
                                                            <FormFieldErrorCaption messageIds={errors.sectionId} />
                                                        </div>
                                                    </div>

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

                                                    <div className={'field'}>
                                                        <div className={classNames('control', {'is-danger': errors.tags})}>
                                                            <input className={'input'}
                                                                   type={'text'}
                                                                   placeholder={intl.formatMessage({id: 'tags'})}
                                                                   onChange={event => handleInputChange(event, setTags)} />
                                                            <FormFieldErrorCaption messageIds={errors.tags} />
                                                        </div>
                                                    </div>

                                                    <div className={'field'}>
                                                        <div className={classNames('control', {'is-danger': errors.allTags})}>
                                                            <label className={'checkbox'}>
                                                                <input type={'checkbox'}
                                                                       onChange={event => setAllTags(event.target.checked)} />
                                                                <FormattedMessage id="all_tags" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            errors={errors}
                                            setErrors={setErrors} />
                </article>
            }
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(NotesPage)
