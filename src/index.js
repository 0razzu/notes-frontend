import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './components/App'
import AppIndex from './components/AppIndex'
import {BrowserRouter as Router} from 'react-router-dom'
import {Routes, Route} from 'react-router'
import './styles/index.css'


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<AppIndex />} />
                </Route>
            </Routes>
        </Router>
    </React.StrictMode>
)
