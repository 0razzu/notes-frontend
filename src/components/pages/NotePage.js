import {Link, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {getFromAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageName} from '../../store/slices/pageSlice'
import {setUser} from '../../store/slices/userSlice'
import {connect} from 'react-redux'
import {FormattedMessage, useIntl} from 'react-intl'
import {nanoid} from 'nanoid'


const NotePage = ({setPageName, user, setUser}) => {
    const {id} = useParams()
    const intl = useIntl()
    const [note, setNote] = useState()
    const [authorLogin, setAuthorLogin] = useState()
    const [sectionName, setSectionName] = useState()


    useEffect(() => {
        setPageName(note?.subject)
    }, [note?.subject, setPageName])


    useEffect(() => {
        if (!user.super)
            getFromAPI(`/account`)
                .then(response => setUser(response))
    }, [setUser, user.super])


    useEffect(() => {
        getFromAPI(`/notes/${id}`)
            .then(response => setNote(response))
            .catch(e => distributeErrors(e))
    }, [id])


    useEffect(() => {
        const authorId = note?.authorId

        if (authorId) {
            if (user.id === authorId)
                setAuthorLogin(user.login)

            else
                getFromAPI(`/accounts/${authorId}`)
                    .then(response => setAuthorLogin(response.login))
                    .catch(e => distributeErrors(e))
        }
    }, [note?.authorId, user.id, user.login])


    useEffect(() => {
        if (note?.sectionId)
            getFromAPI(`/sections/${note.sectionId}`)
                .then(response => setSectionName(response.name))
                .catch(e => distributeErrors(e))
    }, [note?.sectionId])


    return (
        <>
            <h2>{note?.subject ?? id}</h2>

            {note &&
                <>
                    <h3 className={'subtitle is-6 has-text-grey'}>
                        <p>
                            <FormattedMessage id="created_on_at" values={{
                                date: intl.formatDate(note.created),
                                time: intl.formatTime(note.created),
                            }} />
                        </p>
                        <p>
                            <FormattedMessage id="revision_id" />: {note.revisionId}
                        </p>
                    </h3>

                    <article>
                        <section className={'content'}>
                            {note.body.split('\n').map(par => <p key={nanoid()}>{par}</p>)}
                        </section>

                        <section>
                            <p>
                                <strong><FormattedMessage id="author" />: </strong>
                                {authorLogin?
                                    <Link to={`/users/${authorLogin}`}>{authorLogin}</Link> :
                                    <Link to={`/users/byId/${note.authorId}`}>{note.authorId}</Link>
                                }
                            </p>
                            <p>
                                <strong><FormattedMessage id="section" />: </strong>
                                <Link to={`/sections/${note.sectionId}`}>{sectionName ?? note.sectionId}</Link>
                            </p>
                        </section>
                    </article>
                </>
            }
        </>
    )
}


const mapStateToProps = state => ({
    user: state.user,
})


const mapDispatchToProps = dispatch => ({
    setPageName: bindActionCreators(setPageName, dispatch),
    setUser: bindActionCreators(setUser, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(NotePage)
