import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Routes} from 'react-router'
import ForNonAuth from './components/routes/ForNonAuth'
import ForAuth from './components/routes/ForAuth'
import App from './components/App'
import AppIndex from './components/pages/AppIndex'
import UsersPage from './components/pages/UsersPage'
import AccountPage from './components/pages/AccountPage'
import SectionsPage from './components/pages/SectionsPage'
import RegisterPage from './components/pages/RegisterPage'
import LogInPage from './components/pages/LogInPage'
import MyAccountPage from './components/pages/MyAccountPage'
import EditMyAccountPage from './components/pages/EditMyAccountPage'
import NoSuchPage from './components/pages/NoSuchPage'
import store from './store/store'
import {Provider} from 'react-redux'


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<AppIndex />} />
                        <Route path="users" element={<ForAuth><UsersPage /></ForAuth>} />
                        <Route path="users/:login" element={<ForAuth><AccountPage /></ForAuth>} />
                        <Route path="sections" element={<ForAuth><SectionsPage /></ForAuth>} />
                        <Route path="register" element={<ForNonAuth><RegisterPage /></ForNonAuth>} />
                        <Route path="login" element={<ForNonAuth><LogInPage /></ForNonAuth>} />
                        <Route path="me" element={<ForAuth><MyAccountPage /></ForAuth>} />
                        <Route path="me/edit" element={<ForAuth><EditMyAccountPage /></ForAuth>} />
                        <Route path="*" element={<NoSuchPage />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>
)
