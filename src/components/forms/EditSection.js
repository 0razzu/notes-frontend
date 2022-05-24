import {useState} from 'react'
import {putToAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {FormattedMessage} from 'react-intl'
import LabelledInput from './atoms/LabelledInput'


const EditSection = ({section, setSection, setIsVisible}) => {
    const [name, setName] = useState(section.name)
    const [errors, setErrors] = useState({})


    const handleSubmit = event => {
        event.preventDefault()

        putToAPI(`/sections/${section.id}`, {name})
            .then(response => {
                setSection({...section, name:  response.name})
                setErrors({})
                setIsVisible(false)
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
                                   value={name}
                                   required
                                   errorIds={errors.name} />
                </div>

                <div className={'field has-addons has-addons-centered'}>
                    <div className={'control'}>
                        <button className={'button is-success'}><FormattedMessage id="save" /></button>
                    </div>
                </div>
            </div>
        </form>
    )
}


export default EditSection
