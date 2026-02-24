import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Saved', path: '/saved' },
        { name: 'Digest', path: '/digest' },
        { name: 'Settings', path: '/settings' },
        { name: 'Proof', path: '/proof' }
    ];

    const activeStyle = {
        borderBottom: '2px solid var(--accent-color)',
        color: 'var(--text-primary)',
        opacity: 1
    };

    const linkStyle = {
        textDecoration: 'none',
        color: 'var(--text-primary)',
        opacity: 0.6,
        fontSize: '14px',
        fontWeight: 500,
        paddingBottom: '4px',
        transition: 'opacity 0.2s ease'
    };

    return (
        <nav style={{
            height: 'var(--space-64)',
            borderBottom: '1px solid var(--border-color)',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 var(--space-24)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <NavLink to="/" style={{
                fontSize: '18px',
                fontWeight: 700,
                fontFamily: 'var(--font-serif)',
                textDecoration: 'none',
                color: 'var(--text-primary)'
            }}>
                Job Tracker
            </NavLink>

            {/* Desktop Navigation */}
            <div className="desktop-nav" style={{ display: 'flex', gap: 'var(--space-24)' }}>
                {navItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            ...linkStyle,
                            ...(isActive ? activeStyle : {})
                        })}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>

            {/* Mobile Menu Toggle (Simplified CSS for this demo) */}
            <div
                className="mobile-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{ cursor: 'pointer', padding: 'var(--space-8)' }}
            >
                <div style={{ width: '24px', height: '2px', background: 'var(--text-primary)', marginBottom: '4px' }}></div>
                <div style={{ width: '24px', height: '2px', background: 'var(--text-primary)', marginBottom: '4px' }}></div>
                <div style={{ width: '24px', height: '2px', background: 'var(--text-primary)' }}></div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'var(--space-64)',
                    left: 0,
                    right: 0,
                    background: 'white',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 'var(--space-16) var(--space-24)',
                    gap: 'var(--space-16)',
                    boxShadow: 'none'
                }}>
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            style={({ isActive }) => ({
                                ...linkStyle,
                                display: 'block',
                                padding: 'var(--space-8) 0',
                                ...(isActive ? { color: 'var(--accent-color)', opacity: 1 } : {})
                            })}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
                @media (min-width: 769px) {
                    .mobile-toggle { display: none !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navigation;
