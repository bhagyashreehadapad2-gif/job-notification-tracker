import React, { useState, useEffect } from 'react';

const CHECKLIST_ITEMS = [
    { id: 'persist_prefs', label: 'Preferences persist after refresh', tooltip: 'Change a setting, refresh page, check if it remains.' },
    { id: 'match_score', label: 'Match score calculates correctly', tooltip: 'Verify score matches roles in settings.' },
    { id: 'toggle_matches', label: '"Show only matches" toggle works', tooltip: 'Uncheck/check and see results filter.' },
    { id: 'save_persist', label: 'Save job persists after refresh', tooltip: 'Save a job, refresh, check /saved page.' },
    { id: 'apply_tab', label: 'Apply opens in new tab', tooltip: 'Click "View" or "Apply" and check browser tabs.' },
    { id: 'status_persist', label: 'Status update persists after refresh', tooltip: 'Change status, refresh, check badge color.' },
    { id: 'status_filter', label: 'Status filter works correctly', tooltip: 'Filter by "Applied" and check results.' },
    { id: 'digest_top_10', label: 'Digest generates top 10 by score', tooltip: 'Check /digest for score ordering.' },
    { id: 'digest_persist', label: 'Digest persists for the day', tooltip: 'Refresh /digest and see if it stays.' },
    { id: 'no_errors', label: 'No console errors on main pages', tooltip: 'Check browser console (F12) for red text.' }
];

const TestChecklistPage = () => {
    const [status, setStatus] = useState(() => {
        const saved = localStorage.getItem('jobTrackerTestStatus');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('jobTrackerTestStatus', JSON.stringify(status));
    }, [status]);

    const handleToggle = (id) => {
        setStatus(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all test statuses?')) {
            setStatus({});
        }
    };

    const passedCount = CHECKLIST_ITEMS.filter(item => status[item.id]).length;
    const isComplete = passedCount === 10;

    return (
        <div style={{ maxWidth: '720px', margin: 'var(--space-80) auto', padding: '0 var(--space-24)' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '48px', marginBottom: 'var(--space-16)' }}>
                Test Checklist
            </h1>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-24)',
                backgroundColor: 'rgba(209, 209, 209, 0.1)',
                border: '1px solid var(--border-color)',
                marginBottom: 'var(--space-40)'
            }}>
                <div>
                    <div style={{ fontSize: '24px', fontWeight: 600, color: isComplete ? 'var(--success-color)' : 'var(--text-color)' }}>
                        Tests Passed: {passedCount} / 10
                    </div>
                    {!isComplete && (
                        <div style={{ fontSize: '14px', color: 'var(--error-color)', marginTop: 'var(--space-8)', opacity: 0.8 }}>
                            Resolve all issues before shipping.
                        </div>
                    )}
                </div>
                <button
                    onClick={handleReset}
                    style={{
                        padding: 'var(--space-8) var(--space-16)',
                        backgroundColor: 'transparent',
                        border: '1px solid var(--accent-color)',
                        color: 'var(--accent-color)',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                    }}
                >
                    Reset Test Status
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                {CHECKLIST_ITEMS.map(item => (
                    <div
                        key={item.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-16)',
                            padding: 'var(--space-16) var(--space-24)',
                            border: '1px solid var(--border-color)',
                            backgroundColor: status[item.id] ? 'rgba(34, 197, 94, 0.05)' : 'white'
                        }}
                    >
                        <input
                            type="checkbox"
                            id={item.id}
                            checked={!!status[item.id]}
                            onChange={() => handleToggle(item.id)}
                            style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                accentColor: 'var(--success-color)'
                            }}
                        />
                        <label
                            htmlFor={item.id}
                            style={{
                                flex: 1,
                                cursor: 'pointer',
                                fontSize: '16px',
                                textDecoration: status[item.id] ? 'line-through' : 'none',
                                opacity: status[item.id] ? 0.6 : 1
                            }}
                        >
                            {item.label}
                        </label>
                        <div
                            title={item.tooltip}
                            style={{
                                cursor: 'help',
                                color: 'var(--accent-color)',
                                opacity: 0.5,
                                fontSize: '12px',
                                textDecoration: 'underline dotted'
                            }}
                        >
                            How to test
                        </div>
                    </div>
                ))}
            </div>

            {isComplete && (
                <div style={{ marginTop: 'var(--space-40)', textAlign: 'center' }}>
                    <a
                        href="/jt/08-ship"
                        style={{
                            display: 'inline-block',
                            padding: 'var(--space-16) var(--space-40)',
                            backgroundColor: 'var(--text-color)',
                            color: 'white',
                            textDecoration: 'none',
                            fontWeight: 600,
                            letterSpacing: '1px'
                        }}
                    >
                        PROCEED TO SHIPMENT →
                    </a>
                </div>
            )}
        </div>
    );
};

export default TestChecklistPage;
