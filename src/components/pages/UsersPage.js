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


const UsersPage = ({setPageId}) => {
    const intl = useIntl()
    const [from, setFrom] = useState(0)
    const [count, setCount] = useState(20)
    const sortingTypes = [undefined, 'asc', 'desc']
    const [sortByRatingIndex, setSortByRatingIndex] = useState(0)
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
        }))
            .then(result => {
                setUsers(result)
                setFrom(from)
            })
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


    const showOnClick = () => getUsers(from)


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


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(UsersPage)
