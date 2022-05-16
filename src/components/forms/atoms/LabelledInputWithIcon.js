import {FormattedMessage} from 'react-intl'
import classNames from 'classnames'
import FormFieldErrorCaption from './FormFieldErrorCaption'
import Input from './Input'


const LabelledInputWithIcon = ({id, type, stateMutator, iconId, errorIds, ...rest}) => {
    return (
        <>
            <label className={'label'}><FormattedMessage id={id} /></label>
            <div className={'control has-icons-left'}>
                <Input type={type}
                       stateMutator={stateMutator}
                       hasErrors={errorIds?.length}
                       required={rest.required}
                       readOnly={rest.readOnly}
                       value={rest.value} />
                <span className={'icon is-left'}>
                    <i className={classNames('fas', iconId)} />
                </span>
            </div>
            <FormFieldErrorCaption messageIds={errorIds} />
        </>
    )
}

export default LabelledInputWithIcon
