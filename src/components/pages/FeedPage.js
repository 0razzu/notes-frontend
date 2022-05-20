import {FormattedMessage} from 'react-intl'
import {useEffect} from 'react'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'


const FeedPage = ({setPageId}) => {
    useEffect(() => {
        setPageId('feed')
    }, [setPageId])


    return (
        <>
            <h2><FormattedMessage id="feed" /></h2>
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(FeedPage)
