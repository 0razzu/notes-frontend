import {putToAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import {FormattedMessage} from 'react-intl'


const MakeSuper = ({requestedUser, setRequestedUser}) => {
    const handleSubmit = event => {
        event.preventDefault()

        putToAPI(`/accounts/${requestedUser.id}/super`)
            .then(() => setRequestedUser({...requestedUser, super: true}))
            .catch(e => distributeErrors(e))
    }


    return (
        <form className={'card form'} onSubmit={handleSubmit}>
            <div className={'card-content'}>
                <h2 className={'title is-4'}>
                    <FormattedMessage id="make_them_super" values={{login: requestedUser.login}} />
                </h2>

                <div className={'field has-addons has-addons-centered'}>
                    <div className={'control'}>
                        <button className={'button is-warning'}><FormattedMessage id="yes" /></button>
                    </div>
                </div>
            </div>
        </form>
    )
}


export default MakeSuper
