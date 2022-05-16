import classNames from 'classnames'
import {handleInputChange} from '../actions'


const Input = ({type, stateMutator, hasErrors, required, readOnly, value}) => {
    return (
        <input className={classNames('input', {'is-danger': hasErrors})}
               type={type}
               onChange={(stateMutator && !readOnly)? event => handleInputChange(event, stateMutator) : undefined}
               required={required}
               readOnly={readOnly}
               value={value} />
    )
}


export default Input
