import {connect} from 'react-redux'
import {Navigate, useLocation} from 'react-router'


const ForNonAuth = ({loggedIn, children}) => {
    const from = useLocation()?.state?.from


    return (
        loggedIn?
            <Navigate to={from? from.pathname : '/'} /> :
            children
    )
}


const mapStateToProps = state => ({
    loggedIn: state.user.login !== undefined
})


export default connect(mapStateToProps)(ForNonAuth)
