import {connect} from 'react-redux'
import {Navigate, useLocation} from 'react-router'


const ForAuth = ({loggedIn, children}) => {
    const location = useLocation()


    return (
        loggedIn?
            children :
            <Navigate to={'/login'} state={{from: location}} />
    )
}


const mapStateToProps = state => ({
    loggedIn: state.user.login !== undefined
})


export default connect(mapStateToProps)(ForAuth)
