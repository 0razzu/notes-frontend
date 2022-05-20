import {FormattedMessage} from 'react-intl'
import FormFieldErrorCaption from './FormFieldErrorCaption'
import classNames from 'classnames'
import {handleInputChange} from '../actions'


const LabelledSelect = ({id, stateMutator, errorIds, children, ...rest}) => {
    return (
        <>
            <label className={'label'}><FormattedMessage id={id} /></label>
            <div className={classNames('control', {'is-danger': errorIds?.length})}>
                <div className={'select'}>
                    <select onChange={stateMutator? event => handleInputChange(event, stateMutator) : undefined}
                            {...rest}>
                        {children}
                    </select>
                </div>
                <FormFieldErrorCaption messageIds={errorIds} />
            </div>
        </>
    )
}

export default LabelledSelect
