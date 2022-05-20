import classNames from 'classnames'


const Modal = ({isVisible, setIsVisible, children}) => {
    return (
        <div className={classNames('modal', {'is-active': isVisible})}>
            <div className={'modal-background'} />
            <div className={'modal-content'}>
                {children}
            </div>
            <button className={'modal-close is-large'}
                    aria-label="close"
                    onClick={() => setIsVisible(false)} />
        </div>
    )
}


export default Modal
