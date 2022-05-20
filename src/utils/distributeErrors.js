import store from '../store/store'
import {addError} from '../store/slices/errorsSlice'
import {clearUser} from '../store/slices/userSlice'


const distributeErrors = (e, setErrors) => {
    if (e.message)
        dispatchAddError({code: 'UNKNOWN_ERROR'})

    else {
        const errorList = e.errors
        const errorObj = {}

        for (const {field, errorCode: code} of errorList)
            switch (field) {
                case 'JAVASESSIONID':
                    if (['NO_COOKIE', 'SESSION_NOT_FOUND'].includes(code))
                        store.dispatch(clearUser())
                // eslint-disable-next-line no-fallthrough
                case 'unknown':
                case 'request':
                case 'url':
                case 'id':
                    dispatchAddError({code})
                    break
                default:
                    if (setErrors) {
                        if (errorObj[field])
                            errorObj[field].append(code)
                        else
                            errorObj[field] = [code]
                    }

                    else
                        dispatchAddError({code})
            }

        setErrors?.(errorObj)
    }
}


const dispatchAddError = error => store.dispatch(addError(error))


export default distributeErrors
