import React from 'react';

const TopBar = () => (
    <div style={{
        height: 'var(--space-64)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-24)',
        background: 'white'
    }}>
        <div style={{ fontWeight: 600, fontSize: '18px' }}>Job Notification App</div>
        <div style={{ color: 'var(--text-primary)', opacity: 0.6, fontSize: '14px' }}>Step 1 / 4</div>
        <div style={{
            background: 'var(--bg-color)',
            color: 'var(--text-primary)',
            padding: 'var(--space-8) var(--space-16)',
            fontSize: '12px',
            fontWeight: 500,
            border: '1px solid var(--border-color)'
        }}>
            Not Started
        </div>
    </div>
);

const ContextHeader = () => (
    <div style={{ padding: 'var(--space-64) 0 var(--space-40) 0' }}>
        <h1>Design System Foundation</h1>
        <p style={{ color: 'var(--text-primary)', opacity: 0.7 }}>
            A calm, intentional foundation for building premium job tracking experiences.
        </p>
    </div>
);

const PrimaryWorkspace = () => (
    <div style={{ flex: '0 0 70%' }}>
        <div className="card">
            <h2 style={{ marginBottom: 'var(--space-24)' }}>Main Activity Area</h2>
            <p> This area is designed for the primary tasks. Components should be predictable and whitespace intentional.</p>

            <div style={{ marginTop: 'var(--space-40)', display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: 'var(--space-8)', fontSize: '14px', fontWeight: 500 }}>Sample Input</label>
                    <input type="text" placeholder="Enter job title..." />
                </div>

                <div className="flex gap-16">
                    <button className="btn-primary">Primary Action</button>
                    <button className="btn-secondary">Secondary Action</button>
                </div>
            </div>
        </div>
    </div>
);

const SecondaryPanel = () => (
    <div style={{ flex: '0 0 30%' }}>
        <div className="card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '18px', marginBottom: 'var(--space-16)' }}>Guidance</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-primary)', opacity: 0.8 }}>
                The secondary panel provides context, explanations, or copyable elements to support the main flow.
            </p>

            <div style={{
                background: 'var(--bg-color)',
                padding: 'var(--space-16)',
                borderRadius: 'var(--border-radius)',
                marginTop: 'var(--space-24)',
                fontSize: '13px',
                fontFamily: 'monospace',
                border: '1px solid var(--border-color)'
            }}>
                prompt: build_foundation --premium
            </div>
        </div>
    </div>
);

const ProofFooter = () => (
    <div style={{
        marginTop: 'var(--space-64)',
        padding: 'var(--space-24) 0',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }}>
        <div style={{ display: 'flex', gap: 'var(--space-40)' }}>
            {['UI Built', 'Logic Working', 'Test Passed', 'Deployed'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', fontSize: '14px', color: 'var(--text-primary)', opacity: 0.6 }}>
                    <div style={{ width: '16px', height: '16px', border: '1px solid var(--border-color)', borderRadius: '0px' }}></div>
                    {item}
                </div>
            ))}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-primary)', opacity: 0.4 }}>v1.0.0-foundation</div>
    </div>
);

function App() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <TopBar />
            <div className="container" style={{ flex: 1 }}>
                <ContextHeader />
                <div className="flex gap-24" style={{ alignItems: 'flex-start' }}>
                    <PrimaryWorkspace />
                    <SecondaryPanel />
                </div>
                <ProofFooter />
            </div>
        </div>
    );
}

export default App;
