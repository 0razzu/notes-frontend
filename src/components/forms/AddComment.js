import {useState} from 'react'
import {postToAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {FormattedMessage} from 'react-intl'
import TextArea from './atoms/TextArea'


const AddComment = ({noteId, currentRevComments, setCurrentRevComments, setIsVisible}) => {
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState({})


    const handleSubmit = event => {
        event.preventDefault()

        postToAPI('/comments', {
            body,
            noteId,
        })
            .then(response => setCurrentRevComments([...currentRevComments, response]))
            .then(() => {
                setErrors({})
                setIsVisible(false)
                setBody('')
            })
            .catch(e => distributeErrors(e, setErrors))
    }


    return (
        <form className={'card form'} onSubmit={handleSubmit}>
            <div className={'card-content'}>
                <div className={'field'}>
                    <TextArea id={'body'}
                              stateMutator={setBody}
                              value={body}
                              required
                              errorIds={errors.body} />
                </div>

                <div className={'field has-addons has-addons-centered'}>
                    <div className={'control'}>
                        <button className={'button is-link'}><FormattedMessage id="save" /></button>
                    </div>
                </div>
            </div>
        </form>
    )
}


export default AddComment
