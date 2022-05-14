import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from '@reduxjs/toolkit'
import {clearPageId} from '../../store/slices/pageIdSlice'
import {useEffect} from 'react'
import {connect} from 'react-redux'


const AppIndex = ({clearPageId}) => {
    useEffect(() => {
        clearPageId()
    }, [clearPageId])


    return <>
        <h2><FormattedMessage id="welcome" /></h2>
    </>
}


const mapDispatchToProps = dispatch => ({
    clearPageId: bindActionCreators(clearPageId, dispatch)
})


export default connect(null, mapDispatchToProps)(AppIndex)
