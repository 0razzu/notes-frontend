import {useEffect, useState} from 'react'
import {postToAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {FormattedMessage} from 'react-intl'
import FormFieldErrorCaption from './atoms/FormFieldErrorCaption'


const RateNote = ({noteId, mark, setMark, setIsVisible}) => {
    const [newMark, setNewMark] = useState(mark)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        if (!newMark)
            setNewMark(mark)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mark])


    const handleSubmit = event => {
        event.preventDefault()

        postToAPI(`/notes/${noteId}/rating`, {rating: newMark})
            .then(() => {
                setMark(newMark)
                setErrors({})
                setIsVisible(false)
            })
            .catch(e => distributeErrors(e, setErrors))
    }


    return (
        <form className={'card form'} onSubmit={handleSubmit}>
            <div className={'card-content'}>
                <div className={'field'}>
                    <label className={'label'}><FormattedMessage id={'mark'} /></label>
                    <div className={'control'}>
                        {[1, 2, 3, 4, 5].map(value =>
                            <label key={value} className={'radio'}>
                                <input type={'radio'}
                                       name={'mark'}
                                       onClick={() => setNewMark(value)}
                                       defaultChecked={value === mark} />
                                {value}
                            </label>
                        )}
                    </div>
                    <FormFieldErrorCaption messageIds={errors.rating} />
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


export default RateNote
