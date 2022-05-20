import {deleteFromAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {FormattedMessage} from 'react-intl'
import {useState} from 'react'
import {Navigate} from 'react-router'


const DeleteSection = ({id}) => {
    const [done, setDone] = useState(false)


    const handleSubmit = event => {
        event.preventDefault()

        deleteFromAPI(`/sections/${id}`)
            .then(() => setDone(true))
            .catch(e => distributeErrors(e))
    }


    return (
        <>
            {done?
                <Navigate to={'/sections'} /> :
                <form className={'card form'} onSubmit={handleSubmit}>
                    <div className={'card-content'}>
                        <h2 className={'title is-4'}>
                            <FormattedMessage id="delete_section_confirmation" />
                        </h2>
                        <h3 className={'subtitle'}>
                            <FormattedMessage id="delete_section_confirmation_descr" />
                        </h3>

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


export default DeleteSection
