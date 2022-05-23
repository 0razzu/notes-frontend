import {deleteFromAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {FormattedMessage} from 'react-intl'


const DeleteComment = ({commentId, setIsVisible, onDelete}) => {
    const handleSubmit = event => {
        event.preventDefault()

        deleteFromAPI(`/comments/${commentId}`)
            .then(() => {
                setIsVisible(false)
                onDelete()
            })
            .catch(e => distributeErrors(e))
    }


    return (
        <form className={'card form'} onSubmit={handleSubmit}>
            <div className={'card-content'}>
                <h2 className={'title is-4'}>
                    <FormattedMessage id="delete_comment_confirmation" />
                </h2>

                <div className={'field has-addons has-addons-centered'}>
                    <div className={'control'}>
                        <button className={'button is-danger'}><FormattedMessage id="yes" /></button>
                    </div>
                </div>
            </div>
        </form>
    )
}


export default DeleteComment
