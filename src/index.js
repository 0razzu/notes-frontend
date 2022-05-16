import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Routes} from 'react-router'
import ForNonAuth from './components/routes/ForNonAuth'
import ForAuth from './components/routes/ForAuth'
import App from './components/App'
import AppIndex from './components/pages/AppIndex'
import RegisterPage from './components/pages/RegisterPage'
import LogInPage from './components/pages/LogInPage'
import UserPage from './components/pages/UserPage'
import NoSuchPage from './components/pages/NoSuchPage'
import store from './store/store'
import {Provider} from 'react-redux'
import EditUserPage from './components/pages/EditUserPage'


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<AppIndex />} />
                        <Route path="register" element={<ForNonAuth><RegisterPage /></ForNonAuth>} />
                        <Route path="login" element={<ForNonAuth><LogInPage /></ForNonAuth>} />
                        <Route path="me" element={<ForAuth><UserPage /></ForAuth>} />
                        <Route path="me/edit" element={<ForAuth><EditUserPage /></ForAuth>} />
                        <Route path="*" element={<NoSuchPage />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>
)
