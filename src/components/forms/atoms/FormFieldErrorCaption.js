import {FormattedMessage} from 'react-intl'


const FormFieldErrorCaption = ({messageId}) => {
    return (
        <>
            {messageId && (<p className={'help is-danger'}><FormattedMessage id={messageId} /></p>)}
        </>
    )
}


export default FormFieldErrorCaption
