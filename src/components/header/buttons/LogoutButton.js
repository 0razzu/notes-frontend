import {bindActionCreators} from '@reduxjs/toolkit'
import {connect} from 'react-redux'
import {clearCurrentUser} from '../../../store/slices/currentUserSlice'
import {deleteFromAPI} from '../../../utils/fetchFromAPI'
import distributeErrors from '../../../utils/distributeErrors'


const LogOutButton = ({clearUser}) => {
    const handleClick = () => {
        clearUser()

        deleteFromAPI('/sessions')
            .catch(e => distributeErrors(e))
    }


    return (
        <button className={'button is-danger is-outlined'} onClick={handleClick}>
            <span className={'icon'}>
                <i className={'fa fa-sign-out'} aria-hidden="true" />
            </span>
        </button>
    )
}


const mapDispatchToProps = dispatch => ({
    clearUser: bindActionCreators(clearCurrentUser, dispatch)
})


export default connect(null, mapDispatchToProps)(LogOutButton)
