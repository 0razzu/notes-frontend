import {useEffect, useState} from 'react'
import {getFromAPI, putToAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {Navigate} from 'react-router'
import LabelledSelect from './atoms/LabelledSelect'
import TextArea from './atoms/TextArea'
import {FormattedMessage} from 'react-intl'


const EditNote = ({note}) => {
    const [sections, setSections] = useState([])
    const [sectionId, setSectionId] = useState(note.sectionId)
    const [body, setBody] = useState(note.body)
    const [errors, setErrors] = useState({})
    const [done, setDone] = useState(false)


    useEffect(() => {
        getFromAPI('/sections')
            .then(response => setSections(response))
            .catch(e => distributeErrors(e))
    }, [])


    const handleSubmit = event => {
        event.preventDefault()

        putToAPI(`/notes/${note.id}`, {
            sectionId: sectionId === note.sectionId? undefined : sectionId,
            body: body === note.body? undefined : body,
        })
            .then(() => {
                setErrors({})
                setDone(true)
            })
            .catch(e => distributeErrors(e, setErrors))
    }


    return (
        done?
            <Navigate to={`/notes/${note.id}`} /> :
            <form className={'card form'} onSubmit={handleSubmit}>
                <div className={'card-content'}>
                    <div className={'field'}>
                        <LabelledSelect id="section"
                                        stateMutator={sectionId => setSectionId(Number(sectionId))}
                                        value={sectionId}
                                        errorIds={errors.sectionId}>
                            {sections.map(section =>
                                <option key={section.id}
                                        value={section.id} >
                                    {section.name}
                                </option>)}
                        </LabelledSelect>
                    </div>

                    <div className={'field'}>
                        <TextArea id={'body'}
                                  stateMutator={setBody}
                                  value={body}
                                  required
                                  errorIds={errors.body} />
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


export default EditNote
