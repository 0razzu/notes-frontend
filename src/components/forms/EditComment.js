import {useState} from 'react'
import {putToAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {FormattedMessage} from 'react-intl'
import TextArea from './atoms/TextArea'


const EditComment = ({commentId, currentBody, setIsVisible, onEdit}) => {
    const [body, setBody] = useState(currentBody)
    const [errors, setErrors] = useState({})


    const handleSubmit = event => {
        event.preventDefault()

        putToAPI(`/comments/${commentId}`, {body})
            .then(() => {
                setErrors({})
                setIsVisible(false)
                onEdit(body)
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


export default EditComment
