import React from 'react';

const DigestPage = () => {
    return (
        <div style={{ padding: 'var(--space-64) 0' }}>
            <h1 style={{ marginBottom: 'var(--space-16)' }}>Daily Digest</h1>
            <div className="card" style={{ padding: 'var(--space-40)' }}>
                <p style={{ color: 'var(--text-primary)', opacity: 0.7, marginBottom: 'var(--space-16)' }}>
                    Your daily summary is tailored based on your search preferences.
                </p>
                <p style={{ fontSize: '14px', color: 'var(--text-primary)', opacity: 0.5 }}>
                    The first digest will be generated once you've saved your preferences and jobs are discovered.
                </p>
            </div>
        </div>
    );
};

export default DigestPage;
