import {FormattedMessage} from 'react-intl'
import classNames from 'classnames'
import FormFieldErrorCaption from './FormFieldErrorCaption'
import {handleInputChange} from '../actions'


const LabelledInput = ({id, type, stateMutator, required = false, errorIds}) => {
    return (
        <div className={'control'}>
            <label className={'label'}><FormattedMessage id={id} /></label>
            <input className={classNames('input', {'is-danger': errorIds})}
                   type={type}
                   onChange={event => handleInputChange(event, stateMutator)}
                   required={required} />
            <FormFieldErrorCaption messageIds={errorIds} />
        </div>
    )
}

export default LabelledInput
