import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ padding: 'var(--space-64) 0', maxWidth: 'var(--max-content-width)' }}>
            <h1 style={{ marginBottom: 'var(--space-16)' }}>Page Not Found</h1>
            <p style={{ color: 'var(--text-primary)', opacity: 0.7, marginBottom: 'var(--space-24)' }}>
                The page you are looking for does not exist.
            </p>
            <Link to="/" style={{
                color: 'var(--accent-color)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '14px'
            }}>
                Return to Dashboard &larr;
            </Link>
        </div>
    );
};

export default NotFound;
