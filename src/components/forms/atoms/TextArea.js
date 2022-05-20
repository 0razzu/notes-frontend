import {useIntl} from 'react-intl'
import FormFieldErrorCaption from './FormFieldErrorCaption'
import classNames from 'classnames'
import {handleInputChange} from '../actions'


const TextArea = ({id, stateMutator, errorIds, ...rest}) => {
    const intl = useIntl()


    return (
        <div className={'control'}>
            <textarea className={classNames('textarea', {'is-danger': errorIds?.length})}
                      placeholder={intl.formatMessage({id})}
                      onChange={stateMutator? event => handleInputChange(event, stateMutator) : undefined}
                      {...rest} />
            <FormFieldErrorCaption messageIds={errorIds} />
        </div>
    )
}

export default TextArea
