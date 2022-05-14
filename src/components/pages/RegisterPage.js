import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageIdSlice'
import {connect} from 'react-redux'
import {useEffect} from 'react'
import Register from '../forms/Register'
import {FormattedMessage} from 'react-intl'


const RegisterPage = ({setPageId}) => {
    useEffect(() => {
        setPageId('registration')
    }, [setPageId])


    return (
        <>
            <h2><FormattedMessage id="registration" /></h2>
            <Register />
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch)
})


export default connect(null, mapDispatchToProps)(RegisterPage)
