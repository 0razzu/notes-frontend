import {FormattedMessage} from 'react-intl'
import FormFieldErrorCaption from './FormFieldErrorCaption'
import Input from './Input'


const LabelledInput = ({id, stateMutator, errorIds, ...rest}) => {
    return (
        <div className={'control'}>
            <label className={'label'}><FormattedMessage id={id} /></label>
            <Input stateMutator={stateMutator}
                   hasErrors={errorIds?.length}
                   {...rest} />
            <FormFieldErrorCaption messageIds={errorIds} />
        </div>
    )
}

export default LabelledInput
