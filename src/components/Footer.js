import LocaleSwitcher from './LocaleSwitcher'


const Footer = ({localeState}) => {
    return (
        <footer className={'footer'}>
            <div className={'columns'}>
                <div className={'column'}>
                    <LocaleSwitcher localeState={localeState} />
                </div>
            </div>
        </footer>
    )
}


export default Footer
