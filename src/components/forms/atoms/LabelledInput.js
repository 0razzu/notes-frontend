import {FormattedMessage} from 'react-intl'
import classNames from 'classnames'
import FormFieldErrorCaption from './FormFieldErrorCaption'
import {handleInputChange} from '../actions'


const LabelledInput = ({id, type, stateMutator, required = false, errorId}) => {
    return (
        <div className={'control'}>
            <label className={'label'}><FormattedMessage id={id} /></label>
            <input className={classNames('input', {'is-danger': errorId})}
                   type={type}
                   onChange={event => handleInputChange(event, stateMutator)}
                   required={required} />
            <FormFieldErrorCaption messageId={errorId} />
        </div>
    )
}

export default LabelledInput
