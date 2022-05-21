import {useState} from 'react'
import {deleteFromAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {Navigate} from 'react-router'
import {FormattedMessage} from 'react-intl'


const DeleteNote = ({id}) => {
    const [done, setDone] = useState(false)


    const handleSubmit = event => {
        event.preventDefault()

        deleteFromAPI(`/notes/${id}`)
            .then(() => setDone(true))
            .catch(e => distributeErrors(e))
    }


    return (
        <>
            {done?
                <Navigate to={'/notes'} /> :
                <form className={'card form'} onSubmit={handleSubmit}>
                    <div className={'card-content'}>
                        <h2 className={'title is-4'}>
                            <FormattedMessage id="delete_note_confirmation" />
                        </h2>

                        <div className={'field has-addons has-addons-centered'}>
                            <div className={'control'}>
                                <button className={'button is-danger'}><FormattedMessage id="yes" /></button>
                            </div>
                        </div>
                    </div>
                </form>
            }
        </>
    )
}


export default DeleteNote
