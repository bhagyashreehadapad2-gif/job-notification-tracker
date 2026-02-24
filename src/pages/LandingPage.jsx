import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            padding: 'var(--space-64) 0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-24)'
        }}>
            <h1 style={{
                fontSize: '48px',
                maxWidth: '720px',
                lineHeight: '1.2'
            }}>
                Stop Missing The Right Jobs.
            </h1>
            <p style={{
                fontSize: '20px',
                color: 'var(--text-primary)',
                opacity: 0.7,
                maxWidth: '600px'
            }}>
                Precision-matched job discovery delivered daily at 9AM.
            </p>
            <button
                className="btn-primary"
                onClick={() => navigate('/settings')}
                style={{ marginTop: 'var(--space-16)' }}
            >
                Start Tracking
            </button>
        </div>
    );
};

export default LandingPage;
