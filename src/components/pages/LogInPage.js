import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import {useEffect} from 'react'
import LogIn from '../forms/LogIn'
import {FormattedMessage} from 'react-intl'
import '../../styles/pages.sass'


const LogInPage = ({setPageId}) => {
    useEffect(() => {
        setPageId('authentication')
    }, [setPageId])


    return (
        <div className={'form-only-page'}>
            <h2><FormattedMessage id="authentication" /></h2>
            <LogIn />
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch)
})


export default connect(null, mapDispatchToProps)(LogInPage)
