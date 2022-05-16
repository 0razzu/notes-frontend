import {Helmet, HelmetProvider} from 'react-helmet-async'
import {useIntl} from 'react-intl'
import {connect} from 'react-redux'


const Head = ({page}) => {
    const intl = useIntl()
    const pageName = page.name
    let title = intl.formatMessage({id: 'app_name'})

    if (pageName)
        title += `: ${page.asIs? pageName : intl.formatMessage({id: pageName})}`


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
    page: state.page,
})


export default connect(mapStateToProps)(Head)
