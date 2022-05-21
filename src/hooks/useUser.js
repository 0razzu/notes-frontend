import {useEffect} from 'react'
import {setUser} from '../store/slices/userSlice'
import {getFromAPI} from '../utils/fetchFromAPI'
import distributeErrors from '../utils/distributeErrors'
import {useDispatch, useSelector} from 'react-redux'


const useUser = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()


    useEffect(() => {
        if (!user.super)
            getFromAPI('/account')
                .then(response => dispatch(setUser(response)))
                .catch(e => distributeErrors(e))
    }, [user.super, dispatch])


    return user
}


export default useUser
