import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageIdSlice'
import {connect} from 'react-redux'
import {useEffect} from 'react'
import {FormattedMessage} from 'react-intl'
import EditMyAccount from '../forms/EditMyAccount'


const EditMyAccountPage = ({setPageId}) => {
    useEffect(() => {
        setPageId('edit_account')
    }, [setPageId])


    return (
        <div className={'form-only-page'}>
            <h2><FormattedMessage id="edit_account" /></h2>
            <EditMyAccount />
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(EditMyAccountPage)
