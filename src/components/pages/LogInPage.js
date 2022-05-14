import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageIdSlice'
import {connect} from 'react-redux'
import {useEffect} from 'react'
import LogIn from '../forms/LogIn'
import {FormattedMessage} from 'react-intl'


const LogInPage = ({setPageId}) => {
    useEffect(() => {
        setPageId('authentication')
    }, [setPageId])


    return (
        <>
            <h2><FormattedMessage id="authentication" /></h2>
            <LogIn />
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch)
})


export default connect(null, mapDispatchToProps)(LogInPage)
