import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import {useEffect} from 'react'


const NoSuchPage = ({setPageId}) => {
    useEffect(() => {
        setPageId('NOT_PERMITTED')
    }, [setPageId])


    return (
        <>
            <h2><FormattedMessage id="NOT_PERMITTED" /></h2>
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch)
})


export default connect(null, mapDispatchToProps)(NoSuchPage)
