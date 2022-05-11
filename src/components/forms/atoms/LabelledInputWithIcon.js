import {FormattedMessage} from 'react-intl'
import classNames from 'classnames'
import FormFieldErrorCaption from './FormFieldErrorCaption'
import {handleInputChange} from '../actions'


const LabelledInputWithIcon = ({id, type, stateMutator, required = false, iconId, errorId}) => {
    return (
        <>
            <label className={'label'}><FormattedMessage id={id} /></label>
            <div className={'control has-icons-left'}>
                <input className={classNames('input', {'is-danger': errorId})}
                       type={type}
                       onChange={event => handleInputChange(event, stateMutator)}
                       required={required} />
                <span className={'icon is-left'}>
                    <i className={classNames('fas', iconId)} />
                </span>
            </div>
            <FormFieldErrorCaption messageId={errorId} />
        </>
    )
}

export default LabelledInputWithIcon
