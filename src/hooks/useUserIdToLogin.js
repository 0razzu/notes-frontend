import {useEffect} from 'react'
import {addUserIdToLogin} from '../store/slices/userIdToLoginSlice'
import {getFromAPI} from '../utils/fetchFromAPI'
import distributeErrors from '../utils/distributeErrors'
import {useDispatch, useSelector} from 'react-redux'


const useUserIdToLogin = id => {
    const userIdToLogin = useSelector(state => state.userIdToLogin)
    const dispatch = useDispatch()


    useEffect(() => {
        if (id && !userIdToLogin[id])
            getFromAPI(`/accounts/${id}`)
                .then(response => dispatch(addUserIdToLogin({[id]: response.login})))
                .catch(e => distributeErrors(e))
    }, [dispatch, id, userIdToLogin])


    return userIdToLogin[id]
}


export default useUserIdToLogin
