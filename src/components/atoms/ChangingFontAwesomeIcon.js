import classNames from 'classnames'
import '../../styles/ChangingFontAwesomeIcon.sass'


const ChangingFontAwesomeIcon = ({id, show}) => {
    return (
        <span className={classNames('ChangingFontAwesomeIcon icon is-small', {'is-hidden': !show})}>
            <i className={classNames('fas', id)} aria-hidden={true} />
        </span>
    )
}


export default ChangingFontAwesomeIcon
