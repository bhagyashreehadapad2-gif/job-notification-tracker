import React from 'react';

const PlaceholderPage = ({ title }) => {
    return (
        <div style={{
            padding: 'var(--space-64) 0',
            maxWidth: 'var(--max-content-width)'
        }}>
            <h1 style={{ marginBottom: 'var(--space-16)' }}>{title}</h1>
            <p style={{ color: 'var(--text-primary)', opacity: 0.7 }}>
                This section will be built in the next step.
            </p>
        </div>
    );
};

export default PlaceholderPage;
