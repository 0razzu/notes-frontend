import {deleteFromAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {FormattedMessage} from 'react-intl'


const DeleteCurrentRevisionComments = ({id, removeCurrentComments, setIsVisible}) => {
    const handleSubmit = event => {
        event.preventDefault()

        deleteFromAPI(`/notes/${id}/comments`)
            .then(() => removeCurrentComments())
            .then(() => setIsVisible(false))
            .catch(e => distributeErrors(e))
    }


    return (
        <form className={'card form'} onSubmit={handleSubmit}>
            <div className={'card-content'}>
                <h2 className={'title is-4'}>
                    <FormattedMessage id="delete_current_rev_comments_confirmation" />
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


export default DeleteCurrentRevisionComments
