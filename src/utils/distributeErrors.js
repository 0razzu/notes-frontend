import store from '../store/store'
import {addErrors} from '../store/slices/errorsSlice'


const distributeErrors = (e, setErrors) => {
    if (e.message)
        store.dispatch(addErrors([{message: e.message}]))

    else if (setErrors) {
        const errorList = e.errors
        const errorObj = {}

        for (const {field, errorCode: code} of errorList)
            if (errorObj[field])
                errorObj[field].append(code)
            else
                errorObj[field] = [code]

        setErrors(errorObj)
    }
}


export default distributeErrors
