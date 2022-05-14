import {Helmet, HelmetProvider} from 'react-helmet-async'
import {useIntl} from 'react-intl'
import {connect} from 'react-redux'


const Head = ({titleId}) => {
    const intl = useIntl()
    let title = intl.formatMessage({id: 'app_name'})

    if (titleId)
        title += `: ${intl.formatMessage({id: titleId})}`


    return (
        <HelmetProvider>
            <Helmet>
                <html lang={intl.locale} />
                <title>{title}</title>
                <meta name="description" content={intl.formatMessage({id: 'app_description'})} />
            </Helmet>
        </HelmetProvider>
    )
}


const mapStateToProps = state => ({
    titleId: state.pageId
})


export default connect(mapStateToProps)(Head)
