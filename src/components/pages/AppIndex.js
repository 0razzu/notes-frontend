import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from '@reduxjs/toolkit'
import {clearPage} from '../../store/slices/pageSlice'
import {useEffect} from 'react'
import {connect} from 'react-redux'


const AppIndex = ({clearPage}) => {
    useEffect(() => {
        clearPage()
    }, [clearPage])


    return <>
        <h2><FormattedMessage id="welcome" /></h2>
    </>
}


const mapDispatchToProps = dispatch => ({
    clearPage: bindActionCreators(clearPage, dispatch)
})


export default connect(null, mapDispatchToProps)(AppIndex)
