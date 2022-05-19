import {useState} from 'react'
import {postToAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {FormattedMessage} from 'react-intl'
import LabelledInput from './atoms/LabelledInput'


const CreateSection = ({sections, setSections, setVisible}) => {
    const [name, setName] = useState()
    const [errors, setErrors] = useState({})


    const handleSubmit = event => {
        event.preventDefault()

        postToAPI('/sections', {name})
            .then((response) => setSections([...sections, response]))
            .then(() => {
                setErrors({})
                setVisible(false)
                setName('')
            })
            .catch(e => distributeErrors(e, setErrors))
    }


    return (
        <form className={'card form'} onSubmit={handleSubmit}>
            <div className={'card-content'}>
                <div className={'field'}>
                    <LabelledInput id="name"
                                   type="text"
                                   stateMutator={setName}
                                   required
                                   errorIds={errors.name} />
                </div>

                <div className={'field has-addons has-addons-centered'}>
                    <div className={'control'}>
                        <button className={'button is-success'}><FormattedMessage id="create" /></button>
                    </div>
                </div>
            </div>
        </form>
    )
}


export default CreateSection
