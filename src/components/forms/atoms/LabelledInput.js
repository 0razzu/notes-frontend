import {FormattedMessage} from 'react-intl'
import FormFieldErrorCaption from './FormFieldErrorCaption'
import Input from './Input'


const LabelledInput = ({id, type, stateMutator, errorIds, ...rest}) => {
    return (
        <div className={'control'}>
            <label className={'label'}><FormattedMessage id={id} /></label>
            <Input type={type}
                   stateMutator={stateMutator}
                   hasErrors={errorIds?.length}
                   required={rest.required}
                   readOnly={rest.readOnly}
                   value={rest.value} />
            <FormFieldErrorCaption messageIds={errorIds} />
        </div>
    )
}

export default LabelledInput
