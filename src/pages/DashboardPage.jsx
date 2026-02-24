import React from 'react';

const DashboardPage = () => {
    return (
        <div style={{ padding: 'var(--space-64) 0' }}>
            <h1 style={{ marginBottom: 'var(--space-16)' }}>Dashboard</h1>
            <div className="card" style={{ padding: 'var(--space-40)', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-primary)', opacity: 0.6 }}>
                    No jobs yet. In the next step, you will load a realistic dataset.
                </p>
            </div>
        </div>
    );
};

export default DashboardPage;
