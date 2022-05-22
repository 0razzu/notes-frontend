import {useIntl} from 'react-intl'
import {useEffect, useState} from 'react'
import {getFromAPI, stringifyParams} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageName} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import useUser from '../../hooks/useUser'
import {useParams} from 'react-router'
import Notes from '../atoms/Notes'


const UserNotesPage = ({setPageName}) => {
    const {login: authorLogin} = useParams()
    const intl = useIntl()
    const user = useUser()
    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()


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


    return (
        <>
            <h2>{title}</h2>
            {author &&
                <article>
                    <Notes getNotesParams={{user: author.id}} />
                </article>
            }
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageName: bindActionCreators(setPageName, dispatch),
})


export default connect(null, mapDispatchToProps)(UserNotesPage)
