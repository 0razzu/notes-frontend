import {FormattedMessage, useIntl} from 'react-intl'
import {bindActionCreators} from '@reduxjs/toolkit'
import {connect} from 'react-redux'
import {useEffect, useState} from 'react'
import {setPageId} from '../../store/slices/pageSlice'
import '../../styles/UsersPage.sass'
import HorizontalInputField from '../forms/atoms/HorizontalInputField'
import {getFromAPI, stringifyParams} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import ChangingFontAwesomeIcon from '../atoms/ChangingFontAwesomeIcon'
import {setUser} from '../../store/slices/userSlice'
import FormFieldErrorCaption from '../forms/atoms/FormFieldErrorCaption'
import classNames from 'classnames'


const UsersPage = ({setPageId, user, setUser}) => {
    const intl = useIntl()
    const [from, setFrom] = useState(0)
    const [count, setCount] = useState(20)
    const sortingTypes = [undefined, 'asc', 'desc']
    const [sortByRatingIndex, setSortByRatingIndex] = useState(0)
    const [type, setType] = useState()
    const [users, setUsers] = useState([])
    const [hasNext, setHasNext] = useState(false)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        setPageId('users')
    }, [setPageId])


    const getUsers = from => {
        getFromAPI('/accounts' + stringifyParams({
            from,
            count,
            sortByRating: sortingTypes[sortByRatingIndex],
            type,
        }))
            .then(result => {
                setUsers(result)
                setFrom(from)
            })
            .then(() => setErrors({}))
            .catch(e => distributeErrors(e, setErrors))
    }


    const previousOnClick = () => {
        let newFrom = from - count
        if (newFrom <= 0)
            newFrom = 0

        getUsers(newFrom)
    }


    const nextOnClick = () => getUsers(from + count)


    const sortByRatingOnClick = () => setSortByRatingIndex((sortByRatingIndex + 1) % sortingTypes.length)


    const typeOnChange = event => {
        const value = event.target.value
        setType(value === 'all'? undefined : value)
    }


    const showOnClick = () => getUsers(from)


    useEffect(() => {
        getUsers(0)

        if (!user.super)
            getFromAPI('/account')
                .then(response => setUser(response))
                .catch(e => distributeErrors(e))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.super])


    useEffect(() => {
        if (users.length < count)
            setHasNext(false)

        else
            getFromAPI('/accounts' + stringifyParams({
                from: from + count,
                count: 1,
                sortByRating: sortingTypes[sortByRatingIndex],
                type,
            }))
                .then(result => setHasNext(result.length === 1))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, users.length])


    return (
        <div className={'UsersPage'}>
            <h2><FormattedMessage id="users" /></h2>
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

                    <button className={'button'}
                            onClick={sortByRatingOnClick}>
                        <ChangingFontAwesomeIcon id={'fa-sort'} show={sortByRatingIndex === 0} />
                        <ChangingFontAwesomeIcon id={'fa-sort-up'} show={sortByRatingIndex === 1} />
                        <ChangingFontAwesomeIcon id={'fa-sort-down'} show={sortByRatingIndex === 2} />
                        <span><FormattedMessage id="rating" /></span>
                    </button>

                    <div className={'field is-horizontal'}>
                        <div className={classNames('select', {'is-danger': errors.type?.length > 0})}>
                            <select onChange={typeOnChange}>
                                <option value={'all'}>{intl.formatMessage({id: 'all_users'})}</option>
                                <option value={'highRating'}>{intl.formatMessage({id: 'high_rating_users'})}</option>
                                <option value={'lowRating'}>{intl.formatMessage({id: 'low_rating_users'})}</option>
                                <option value={'following'}>{intl.formatMessage({id: 'following'})}</option>
                                <option value={'followers'}>{intl.formatMessage({id: 'followers'})}</option>
                                <option value={'ignore'}>{intl.formatMessage({id: 'ignored'})}</option>
                                <option value={'ignoredBy'}>{intl.formatMessage({id: 'ignored_by'})}</option>
                                <option value={'deleted'}>{intl.formatMessage({id: 'deleted_users'})}</option>
                                {user.super &&
                                    <option value={'super'}>{intl.formatMessage({id: 'superusers'})}</option>
                                }
                            </select>
                        </div>
                        <FormFieldErrorCaption messageIds={errors.type} />
                    </div>

                    <button className={'button is-primary'} onClick={showOnClick}>
                        <FormattedMessage id="show" />
                    </button>
                </nav>

                <div className={'Users'}>
                    {users.map(user =>
                        <div className={'card'} key={user.id}>
                            <div className={'card-content'}>
                                <h3 className={'title is-4'}>{user.login}</h3>
                                <h4 className={'subtitle is-6 has-text-grey'}>
                                    {user.deleted?
                                        <FormattedMessage id="deleted" /> :
                                        <FormattedMessage id={user.online? 'online' : 'offline'} />
                                    }
                                </h4>
                                <p>{user.firstName} {user.patronymic && user.patronymic + ' '}{user.lastName}</p>
                                <p><FormattedMessage id="rating" />: {user.rating}</p>
                                <p>
                                    <FormattedMessage id="registered_on"
                                                      values={{date: intl.formatDate(user.timeRegistered)}} />
                                </p>
                                <p>{user.super && <FormattedMessage id="superuser" />}</p>
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </div>
    )
}


const mapStateToProps = state => ({
    user: state.user,
})


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
    setUser: bindActionCreators(setUser, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)
