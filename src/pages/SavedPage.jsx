import React from 'react';

const SavedPage = () => {
    return (
        <div style={{ padding: 'var(--space-64) 0' }}>
            <h1 style={{ marginBottom: 'var(--space-16)' }}>Saved Notifications</h1>
            <div className="card" style={{ padding: 'var(--space-40)', textAlign: 'center', borderStyle: 'dashed' }}>
                <p style={{ color: 'var(--text-primary)', opacity: 0.6 }}>
                    You haven't saved any jobs yet. Your bookmarked opportunities will appear here.
                </p>
            </div>
        </div>
    );
};

export default SavedPage;
