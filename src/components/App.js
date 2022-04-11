import {Outlet} from 'react-router'
import {Link} from 'react-router-dom'
import '../styles/App.css'


const App = () => {
    return (
        <>
            <nav className={'navbar has-shadow'}>
                <div className={'navbar-start'}>
                    <div className={'navbar-brand'}>
                        <h1 className={'title'}><Link to={'/'} className={'navbar-item'}>Notes</Link></h1>
                    </div>
                </div>
            </nav>
            <main className={'content'}>
                <Outlet />
            </main>
        </>
    )
}

export default App
