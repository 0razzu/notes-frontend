import {FormattedMessage} from 'react-intl'


const FormFieldErrorCaption = ({messageIds = []}) => {
    return (
        <>
            {messageIds.map(messageId =>
                <p key={messageId} className={'help is-danger'}>
                    <FormattedMessage id={messageId} />
                </p>
            )}
        </>
    )
}


export default FormFieldErrorCaption
