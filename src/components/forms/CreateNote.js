import {useEffect, useState} from 'react'
import {getFromAPI, postToAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {FormattedMessage} from 'react-intl'
import LabelledInput from './atoms/LabelledInput'
import TextArea from './atoms/TextArea'
import LabelledSelect from './atoms/LabelledSelect'
import {Navigate} from 'react-router'


const CreateNote = () => {
    const [sections, setSections] = useState([])
    const [subject, setSubject] = useState()
    const [sectionId, setSectionId] = useState()
    const [body, setBody] = useState()
    const [noteId, setNoteId] = useState()
    const [errors, setErrors] = useState({})


    useEffect(() => {
        getFromAPI('/sections')
            .then(response => {
                setSections(response)
                setSectionId(response[0].id)
            })
            .catch(e => distributeErrors(e))
    }, [])


    const handleSubmit = event => {
        event.preventDefault()

        postToAPI('/notes', {
            subject,
            sectionId,
            body,
        })
            .then(response => {
                setErrors({})
                setNoteId(response.id)
            })
            .catch(e => distributeErrors(e, setErrors))
    }


    return (
        <>
            {noteId?
                <Navigate to={`/notes/${noteId}`} /> :
                <form className={'card form'} onSubmit={handleSubmit}>
                    <div className={'card-content'}>
                        <div className={'field'}>
                            <LabelledInput id="subject"
                                           type="text"
                                           stateMutator={setSubject}
                                           required
                                           errorIds={errors.subject} />
                        </div>

                        <div className={'field'}>
                            <LabelledSelect id="section"
                                            stateMutator={setSectionId}
                                            errorIds={errors.sectionId}>
                                {sections.map(section => <option key={section.id}
                                                                 value={section.id}>{section.name}</option>)}
                            </LabelledSelect>
                        </div>

                        <div className={'field'}>
                            <TextArea id={'body'}
                                      stateMutator={setBody}
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
            }
        </>
    )
}


export default CreateNote
