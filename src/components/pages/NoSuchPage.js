import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import {useEffect} from 'react'


const NoSuchPage = ({setPageId}) => {
    useEffect(() => {
        setPageId('no_such_page')
    }, [setPageId])


    return (
        <>
            <h2><FormattedMessage id="no_such_page" /></h2>
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch)
})


export default connect(null, mapDispatchToProps)(NoSuchPage)
