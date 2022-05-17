import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from '@reduxjs/toolkit'
import {connect} from 'react-redux'
import {useEffect} from 'react'
import {setPageId} from '../../store/slices/pageSlice'


const UsersPage = ({setPageId}) => {
    useEffect(() => {
        setPageId('users')
    }, [setPageId])


    return (
        <>
            <h2><FormattedMessage id="users" /></h2>
            <article>
                <section className={'content'}>

                </section>
            </article>
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(UsersPage)
