import React from 'react';

const SettingsPage = () => {
    const inputGroupStyle = {
        marginBottom: 'var(--space-24)',
        maxWidth: 'var(--max-content-width)'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: 'var(--space-8)',
        fontSize: '14px',
        fontWeight: 500,
        color: 'var(--text-primary)'
    };

    return (
        <div style={{ padding: 'var(--space-64) 0' }}>
            <h1 style={{ marginBottom: 'var(--space-40)' }}>Search Preferences</h1>

            <div style={inputGroupStyle}>
                <label style={labelStyle}>Role Keywords</label>
                <input type="text" placeholder="e.g. Frontend Engineer, Product Designer" />
                <p style={{ fontSize: '12px', opacity: 0.5, marginTop: 'var(--space-8)' }}>
                    Comma separated list of roles you are interested in.
                </p>
            </div>

            <div style={inputGroupStyle}>
                <label style={labelStyle}>Preferred Locations</label>
                <input type="text" placeholder="e.g. Remote, Bangalore, London" />
            </div>

            <div style={inputGroupStyle}>
                <label style={labelStyle}>Working Mode</label>
                <select style={{
                    width: '100%',
                    padding: 'var(--space-8) var(--space-16)',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--border-color)',
                    background: 'white',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    outline: 'none'
                }}>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">Onsite</option>
                </select>
            </div>

            <div style={inputGroupStyle}>
                <label style={labelStyle}>Experience Level</label>
                <input type="text" placeholder="e.g. Senior, 5+ years" />
            </div>

            <button className="btn-primary" style={{ marginTop: 'var(--space-16)' }}>
                Save Preferences
            </button>
        </div>
    );
};

export default SettingsPage;
