import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import {useEffect, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import EditNote from '../forms/EditNote'
import {useParams} from 'react-router-dom'
import useUser from '../../hooks/useUser'
import {getFromAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {Navigate} from 'react-router'


const EditNotePage = ({setPageId}) => {
    const {id} = useParams()
    const user = useUser()
    const [note, setNote] = useState()


    useEffect(() => {
        setPageId('note_editing')
    }, [setPageId])


    useEffect(() => {
        getFromAPI(`/notes/${id}`)
            .then(response => setNote(response))
            .catch(e => distributeErrors(e))
    }, [id])


    return (
        note && user.id && note.authorId !== user.id?
            <Navigate to={'/403'} /> :
            <div className={'form-only-page'}>
                <h2><FormattedMessage id="note_editing" /></h2>
                {note &&
                    <EditNote note={note} />
                }
            </div>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(EditNotePage)
