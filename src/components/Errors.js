import {bindActionCreators} from '@reduxjs/toolkit'
import {clearErrors} from '../store/slices/errorsSlice'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {generate as generateId} from 'shortid'


const Errors = ({errors, clearErrors}) => {
    return (errors.length > 0 &&
        <div className={'Errors'}>
            <article className={'message is-danger'}>
                <div className={'message-header'}>
                    <FormattedMessage id="error" />
                    <button className={'delete'} onClick={() => clearErrors()} />
                </div>
                <div className={'message-body'}>{
                    errors.map(error => <p key={generateId()}>{error.code}</p>)
                }</div>
            </article>
        </div>
    )
}


const mapStateToProps = state => ({
    errors: state.errors
})


const mapDispatchToProps = dispatch => ({
    clearErrors: bindActionCreators(clearErrors, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Errors)
