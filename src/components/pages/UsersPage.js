import {FormattedMessage, useIntl} from 'react-intl'
import {bindActionCreators} from '@reduxjs/toolkit'
import {connect} from 'react-redux'
import {useEffect, useState} from 'react'
import {setPageId} from '../../store/slices/pageSlice'
import {addAllUserIdToLogin} from '../../store/slices/userIdToLoginSlice'
import '../../styles/UsersPage.sass'
import {getFromAPI, stringifyParams} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import ChangingFontAwesomeIcon from '../atoms/ChangingFontAwesomeIcon'
import FormFieldErrorCaption from '../forms/atoms/FormFieldErrorCaption'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import useUser from '../../hooks/useUser'
import Pagination from '../atoms/Pagination'


const UsersPage = ({setPageId, addAllUserIdToLogin}) => {
    const intl = useIntl()
    const user = useUser()
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


    useEffect(() => {
        getUsers(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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

                return result
            })
            .then(result => addAllUserIdToLogin(result.map(user => ({[user.id]: user.login}))))
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


    return (
        <>
            <h2><FormattedMessage id="users" /></h2>
            <article>
                <Pagination previousOnClick={previousOnClick}
                            previousDisabled={from <= 0}
                            nextOnClick={nextOnClick}
                            nextDisabled={!hasNext}
                            count={count}
                            setCount={setCount}
                            countErrors={errors.count}
                            showOnClick={showOnClick}>
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
                </Pagination>

                <div className={'users'}>
                    {users.map(user =>
                        <div className={'card'} key={user.id}>
                            <div className={'card-content'}>
                                <h3 className={'title is-4'}><Link to={`/users/${user.login}`}>{user.login}</Link></h3>
                                <h4 className={'subtitle is-6'}>
                                    {user.deleted?
                                        <span className={'tag is-danger is-light'}><FormattedMessage id="deleted" /></span> :
                                        user.online?
                                            <span className={'tag is-success is-light'}><FormattedMessage id="online" /></span> :
                                            <span className={'tag'}><FormattedMessage id="offline" /></span>
                                    }
                                </h4>
                                <p>{user.firstName} {user.patronymic && user.patronymic + ' '}{user.lastName}</p>
                                <p><FormattedMessage id="rating" />: {user.rating}</p>
                                <p>
                                    <FormattedMessage id="registered_on"
                                                      values={{date: intl.formatDate(user.timeRegistered)}} />
                                </p>
                                {user.super &&
                                    <p className={'mt-2'}>
                                        <span className={'tag is-warning'}><FormattedMessage id="superuser" /></span>
                                    </p>
                                }
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
    addAllUserIdToLogin: bindActionCreators(addAllUserIdToLogin, dispatch),
})


export default connect(null, mapDispatchToProps)(UsersPage)
