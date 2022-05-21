import {bindActionCreators} from '@reduxjs/toolkit'
import {clearErrors} from '../store/slices/errorsSlice'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {nanoid} from 'nanoid'
import '../styles/Errors.sass'
import {useEffect} from 'react'


const Errors = ({errors, clearErrors}) => {
    useEffect(() => {
        if (errors.length !== 0) {
            const timerId = setTimeout(() => clearErrors(), 5000)

            return () => clearTimeout(timerId)
        }
    }, [clearErrors, errors])


    return (errors.length > 0 &&
        <div className={'Errors'}>
            <article className={'message is-danger'}>
                <div className={'message-header'}>
                    <FormattedMessage id="uh_oh" />
                    <button className={'delete'} onClick={() => clearErrors()} />
                </div>
                <div className={'message-body'}>{
                    errors.map(error =>
                        <p key={nanoid()}>
                            <FormattedMessage id={error.code} />
                        </p>
                    )
                }</div>
            </article>
        </div>
    )
}


const mapStateToProps = state => ({
    errors: state.errors,
})


const mapDispatchToProps = dispatch => ({
    clearErrors: bindActionCreators(clearErrors, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(Errors)
