import LocaleSwitcher from './forms/LocaleSwitcher'


const Footer = () => {
    return (
        <footer className={'footer'}>
            <div className={'columns'}>
                <div className={'column'}>
                    <LocaleSwitcher />
                </div>
            </div>
        </footer>
    )
}


export default Footer
