import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import SavedPage from './pages/SavedPage';
import DigestPage from './pages/DigestPage';
import ProofPage from './pages/ProofPage';

const Layout = ({ children }) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        <main className="container" style={{ flex: 1 }}>
            {children}
        </main>
    </div>
);

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/saved" element={<SavedPage />} />
                    <Route path="/digest" element={<DigestPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/proof" element={<ProofPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
