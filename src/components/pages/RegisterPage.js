import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import {useEffect} from 'react'
import Register from '../forms/Register'
import {FormattedMessage} from 'react-intl'
import '../../styles/pages.sass'


const RegisterPage = ({setPageId}) => {
    useEffect(() => {
        setPageId('registration')
    }, [setPageId])


    return (
        <div className={'form-only-page'}>
            <h2><FormattedMessage id="registration" /></h2>
            <Register />
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(RegisterPage)
