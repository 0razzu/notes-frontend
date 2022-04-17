import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {Routes, Route} from 'react-router'
import './styles/index.sass'
import App from './components/App'
import AppIndex from './components/AppIndex'
import NoSuchPage from './components/NoSuchPage'


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<AppIndex />} />
                    <Route path="*" element={<NoSuchPage />} />
                </Route>
            </Routes>
        </Router>
    </React.StrictMode>
)
