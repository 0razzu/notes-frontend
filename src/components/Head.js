import {Helmet, HelmetProvider} from 'react-helmet-async'
import {useIntl} from 'react-intl'


const Head = () => {
    const intl = useIntl()

    return (
        <HelmetProvider>
            <Helmet>
                <html lang={intl.locale} />
                <title>{intl.formatMessage({id: 'app_name'})}</title>
                <meta name="description" content={intl.formatMessage({id: 'app_description'})} />
            </Helmet>
        </HelmetProvider>
    )
}


export default Head
