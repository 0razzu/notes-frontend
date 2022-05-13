import store from '../store/store'
import {addErrors} from '../store/slices/errorsSlice'
import {clearCurrentUser} from '../store/slices/currentUserSlice'


const distributeErrors = (e, setErrors) => {
    if (e.message)
        store.dispatch(addErrors([{code: 'UNKNOWN_ERROR'}]))

    else if (setErrors) {
        const errorList = e.errors
        const errorObj = {}

        for (const {field, errorCode: code} of errorList)
            switch (field) {
                case 'JAVASESSIONID':
                    if (code in ['NO_COOKIE', 'SESSION_NOT_FOUND'])
                    store.dispatch(clearCurrentUser())
                // eslint-disable-next-line no-fallthrough
                case 'unknown':
                case 'request':
                case 'url':
                    store.dispatch(addErrors([{code}]))
                    break
                default:
                    if (errorObj[field])
                        errorObj[field].append(code)
                    else
                        errorObj[field] = [code]
            }

        setErrors(errorObj)
    }
}


export default distributeErrors
