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
    const [users, setUsers] = useState()
    const [sectionId, setSectionId] = useState()
    const sortingTypes = [undefined, 'asc', 'desc']
    const [sortByRatingIndex, setSortByRatingIndex] = useState(0)
    const [tags, setTags] = useState()
    const [allTags, setAllTags] = useState(false)
    const [timeFrom, setTimeFrom] = useState()
    const [timeTo, setTimeTo] = useState()
    const [userId, setUserId] = useState()
    const [include, setInclude] = useState()
    const [errors, setErrors] = useState({})


    useEffect(() => {
        setPageId('search')
    }, [setPageId])


    useEffect(() => {
        getFromAPI('/sections')
            .then(response => setSections(response))
            .catch(e => distributeErrors(e))
    }, [])


    useEffect(() => {
        getFromAPI('/accounts')
            .then(result => setUsers(result))
            .catch(e => distributeErrors(e))
    }, [])


    const sortByRatingOnClick = () => setSortByRatingIndex((sortByRatingIndex + 1) % sortingTypes.length)


    return (
        <>
            <h2><FormattedMessage id="search" /></h2>
            {user.id && sections && users &&
                <article>
                    <NoteListWithPagination
                        getNotesParams={{
                            sectionId: sectionId === ''? undefined : sectionId,
                            sortByRating: sortingTypes[sortByRatingIndex],
                            tags: tags?.length? tags.split(/\s+/).join(',') : undefined,
                            allTags: tags?.length? allTags : undefined,
                            timeFrom: timeFrom === ''? undefined : timeFrom,
                            timeTo: timeTo === ''? undefined : timeTo,
                            user: userId === ''? undefined : userId,
                            include: include === ''? undefined : include,
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

                                <div className={'field is-grouped'}>
                                    <div className={classNames('control', {'is-danger': errors.tags})}>
                                        <input className={'input'}
                                               type={'text'}
                                               placeholder={intl.formatMessage({id: 'tags'})}
                                               onChange={event => handleInputChange(event, setTags)} />
                                        <FormFieldErrorCaption messageIds={errors.tags} />
                                    </div>

                                    <div className={classNames('control', {'is-danger': errors.allTags})}>
                                        <label className={'checkbox'}>
                                            <input type={'checkbox'}
                                                   onChange={event => setAllTags(event.target.checked)} />
                                            <FormattedMessage id="all_tags" />
                                        </label>
                                    </div>
                                </div>

                                <div className={'field is-grouped'}>
                                    <div className={classNames('control', {'is-danger': errors.timeFrom})}>
                                        <input className={'input'}
                                               type={'datetime-local'}
                                               onChange={event => handleInputChange(event, setTimeFrom)} />
                                        <FormFieldErrorCaption messageIds={errors.timeFrom} />
                                    </div>

                                    <div className={'control'}>—</div>

                                    <div className={classNames('control', {'is-danger': errors.timeTo})}>
                                        <input className={'input'}
                                               type={'datetime-local'}
                                               onChange={event => handleInputChange(event, setTimeTo)} />
                                        <FormFieldErrorCaption messageIds={errors.timeTo} />
                                    </div>
                                </div>

                                <div className={'field'}>
                                    <div className={classNames('control', {'is-danger': errors.user})}>
                                        <div className={'select'}>
                                            <select onChange={event => handleInputChange(event, setUserId)}>
                                                <option value={''}>
                                                    {intl.formatMessage({id: 'any_author'})}
                                                </option>
                                                {users.map(user =>
                                                    <option key={user.id}
                                                            value={user.id}>
                                                        {user.login}
                                                    </option>)}
                                            </select>
                                        </div>
                                        <FormFieldErrorCaption messageIds={errors.user} />
                                    </div>
                                </div>

                                <div className={'field'}>
                                    <div className={classNames('control', {'is-danger': errors.include})}>
                                        <div className={'select'}>
                                            <select onChange={event => handleInputChange(event, setInclude)}>
                                                <option value={''}>
                                                    {intl.formatMessage({id: 'any_author_group'})}
                                                </option>
                                                <option value={'onlyFollowings'}>
                                                    {intl.formatMessage({id: 'following'})}
                                                </option>
                                                <option value={'onlyIgnore'}>
                                                    {intl.formatMessage({id: 'ignored'})}
                                                </option>
                                                <option value={'notIgnore'}>
                                                    {intl.formatMessage({id: 'not_ignored'})}
                                                </option>
                                            </select>
                                        </div>
                                        <FormFieldErrorCaption messageIds={errors.include} />
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
