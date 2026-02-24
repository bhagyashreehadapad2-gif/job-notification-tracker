import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import PlaceholderPage from './components/PlaceholderPage';
import NotFound from './components/NotFound';

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
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
                    <Route path="/saved" element={<PlaceholderPage title="Saved Notifications" />} />
                    <Route path="/digest" element={<PlaceholderPage title="Daily Digest" />} />
                    <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
                    <Route path="/proof" element={<PlaceholderPage title="Build Proof" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
