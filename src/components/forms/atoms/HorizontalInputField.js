import {FormattedMessage} from 'react-intl'
import FormFieldErrorCaption from './FormFieldErrorCaption'
import Input from './Input'
import '../../../styles/HorizontalInputField.sass'


const HorizontalInputField = ({id, stateMutator, errorIds, ...rest}) => {
    return (
        <div className={'HorizontalInputField'}>
            <div className={'field-label'}>
                <label className={'label'}><FormattedMessage id={id} /></label>
            </div>
            <div className={'field-body'}>
                <div className={'field'}>
                    <p className={'control'}>
                        <Input stateMutator={stateMutator}
                               hasErrors={errorIds?.length}
                               {...rest} />
                    </p>
                </div>
                <FormFieldErrorCaption messageIds={errorIds} />
            </div>
        </div>
    )
}

export default HorizontalInputField
