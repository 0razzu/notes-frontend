import store from '../store/store'
import {addErrors} from '../store/slices/errorsSlice'


const distributeErrors = (e, setErrors) => {
    if (e.message)
        store.dispatch(addErrors([{code: e.message}]))

    else if (setErrors) {
        const errorList = e.errors
        const errorObj = {}

        for (const {field, errorCode: code} of errorList)
            if (field === 'JAVASESSIONID')
                store.dispatch(addErrors([{code}]))
            else if (errorObj[field])
                errorObj[field].append(code)
            else
                errorObj[field] = [code]

        setErrors(errorObj)
    }
}


export default distributeErrors
