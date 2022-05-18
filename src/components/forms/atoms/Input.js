import classNames from 'classnames'
import {handleInputChange} from '../actions'


const Input = ({stateMutator, hasErrors, ...rest}) => {
    return (
        <input className={classNames('input', {'is-danger': hasErrors})}
               onChange={stateMutator? event => handleInputChange(event, stateMutator) : undefined}
               {...rest} />
    )
}


export default Input
