import LocaleSwitcher from './LocaleSwitcher'


const Footer = ({localeState}) => {
    return (
        <footer>
            <LocaleSwitcher localeState={localeState} />
        </footer>
    )
}


export default Footer
