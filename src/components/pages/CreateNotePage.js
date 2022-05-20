import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import {useEffect} from 'react'
import {FormattedMessage} from 'react-intl'
import CreateNote from '../forms/CreateNote'


const CreateNotePage = ({setPageId}) => {
    useEffect(() => {
        setPageId('create_note')
    }, [setPageId])


    return (
        <div className={'form-only-page'}>
            <h2><FormattedMessage id="create_note" /></h2>
            <CreateNote />
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(CreateNotePage)
