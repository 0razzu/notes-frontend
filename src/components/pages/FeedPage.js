import {FormattedMessage} from 'react-intl'
import {useEffect} from 'react'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import '../../styles/FeedPage.sass'
import Notes from '../atoms/Notes'


const FeedPage = ({setPageId}) => {
    useEffect(() => {
        setPageId('feed')
    }, [setPageId])


    const getDate = () => {
        const date = new Date()
        date.setDate(date.getDate() - 7)

        return date.toISOString()
    }


    return (
        <>
            <h2><FormattedMessage id="feed" /></h2>
            <article>
                <Notes getNotesParams={{include: 'onlyFollowings', timeFrom: getDate()}} />
            </article>
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(FeedPage)
