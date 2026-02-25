import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../data/jobs.json';
import { calculateMatchScore } from '../utils/scoring';
import DigestJobItem from '../components/DigestJobItem';
import { getStatusHistory, STATUS_STATES } from '../utils/status';

const DigestPage = () => {
    const today = new Date().toISOString().split('T')[0];
    const digestKey = `jobTrackerDigest_${today}`;

    const [prefs, setPrefs] = useState(null);
    const [digest, setDigest] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copyStatus, setCopyStatus] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Load prefs
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPrefs(JSON.parse(savedPrefs));
        }

        // Load today's digest
        const savedDigest = localStorage.getItem(digestKey);
        if (savedDigest) {
            setDigest(JSON.parse(savedDigest));
        }

        // Load history
        setHistory(getStatusHistory());
    }, [digestKey]);

    const generateDigest = () => {
        if (!prefs) return;

        setIsGenerating(true);

        setTimeout(() => {
            // Rank and pick top 10
            const scoredJobs = jobsData.map(job => ({
                ...job,
                matchScore: calculateMatchScore(job, prefs)
            }));

            const filtered = scoredJobs.filter(job => job.matchScore >= (prefs.minMatchScore || 0));

            const sorted = filtered.sort((a, b) => {
                if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
                return a.postedDaysAgo - b.postedDaysAgo;
            }).slice(0, 10);

            localStorage.setItem(digestKey, JSON.stringify(sorted));
            setDigest(sorted);
            setIsGenerating(false);
        }, 800);
    };

    const handleCopy = () => {
        if (!digest) return;
        const text = digest.map((j, i) => `${i + 1}. ${j.title} @ ${j.company} - ${j.matchScore}% Match\n   Apply: ${j.applyUrl}`).join('\n\n');
        navigator.clipboard.writeText(text);
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
    };

    const handleEmail = () => {
        if (!digest) return;
        const subject = encodeURIComponent(`My 9AM Job Digest - ${today}`);
        const body = encodeURIComponent(
            `Top 10 Jobs For You — 9AM Digest (${today})\n\n` +
            digest.map((j, i) => `${i + 1}. ${j.title} @ ${j.company} (${j.location})\n   Match: ${j.matchScore}%\n   Apply: ${j.applyUrl}`).join('\n\n') +
            `\n\nThis digest was generated based on your preferences.`
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    const getStatusColor = (s) => {
        switch (s) {
            case STATUS_STATES.APPLIED: return '#1e90ff';
            case STATUS_STATES.REJECTED: return '#dc3545';
            case STATUS_STATES.SELECTED: return '#28a745';
            default: return 'var(--text-primary)';
        }
    };

    if (!prefs) {
        return (
            <div style={{ padding: 'var(--space-64) 0', textAlign: 'center' }}>
                <div className="card" style={{ padding: 'var(--space-64)', maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: 'var(--space-16)' }}>Unlock Your Digest</h2>
                    <p style={{ opacity: 0.6, marginBottom: 'var(--space-32)' }}>
                        Set your preferences to generate a personalized 9AM job digest.
                    </p>
                    <Link to="/settings" className="btn-primary" style={{ padding: '12px 40px', textDecoration: 'none' }}>
                        Set Preferences
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: 'var(--space-64) 0', minHeight: '80vh' }}>
            {/* Header & Simulation Note */}
            <div style={{ maxWidth: '720px', margin: '0 auto', marginBottom: 'var(--space-40)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-8)' }}>
                    <h1 style={{ margin: 0 }}>Daily Digest</h1>
                    <span style={{ fontSize: '13px', opacity: 0.4, fontStyle: 'italic' }}>
                        Demo Mode: Daily 9AM trigger simulated manually.
                    </span>
                </div>
                {!digest && (
                    <button
                        className="btn-primary"
                        onClick={generateDigest}
                        disabled={isGenerating}
                        style={{ padding: '12px 32px' }}
                    >
                        {isGenerating ? 'Generating...' : 'Generate Today\'s 9AM Digest (Simulated)'}
                    </button>
                )}
            </div>

            {/* Digest Card */}
            {digest && (
                <div className="card" style={{
                    maxWidth: '720px',
                    margin: '0 auto',
                    padding: 'var(--space-48)',
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
                    marginBottom: 'var(--space-64)'
                }}>
                    <header style={{ textAlign: 'center', marginBottom: 'var(--space-48)', borderBottom: '2px solid var(--accent-color)', paddingBottom: 'var(--space-32)' }}>
                        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Top 10 Jobs For You — 9AM Digest</h2>
                        <p style={{ margin: 0, opacity: 0.5, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '12px', fontWeight: 600 }}>
                            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </header>

                    <div style={{ marginBottom: 'var(--space-48)' }}>
                        {digest.length > 0 ? (
                            digest.map(job => (
                                <DigestJobItem key={job.id} job={job} />
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', opacity: 0.5, padding: 'var(--space-64) 0' }}>
                                No matching roles today. Check again tomorrow.
                            </p>
                        )}
                    </div>

                    <footer style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', opacity: 0.5, marginBottom: 'var(--space-32)' }}>
                            This digest was generated based on your preferences.
                        </p>

                        <div style={{ display: 'flex', gap: 'var(--space-16)', justifyContent: 'center' }}>
                            <button
                                className="btn-secondary"
                                style={{ padding: '10px 24px', fontSize: '14px' }}
                                onClick={handleCopy}
                            >
                                {copyStatus ? 'Copied!' : 'Copy Digest to Clipboard'}
                            </button>
                            <button
                                className="btn-secondary"
                                style={{ padding: '10px 24px', fontSize: '14px' }}
                                onClick={handleEmail}
                            >
                                Create Email Draft
                            </button>
                        </div>
                    </footer>
                </div>
            )}

            {/* Recent Status Updates Section */}
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                <h3 style={{ marginBottom: 'var(--space-24)', fontSize: '20px', fontFamily: 'var(--font-serif)' }}>Recent Status Updates</h3>
                <div className="card" style={{ padding: 'var(--space-32)', backgroundColor: 'white' }}>
                    {history.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
                            {history.map((entry, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: i === history.length - 1 ? 'none' : '1px solid var(--border-color)',
                                    paddingBottom: i === history.length - 1 ? 0 : 'var(--space-16)'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '15px' }}>{entry.title}</div>
                                        <div style={{ fontSize: '13px', opacity: 0.5 }}>{entry.company} • {new Date(entry.timestamp).toLocaleDateString()}</div>
                                    </div>
                                    <span style={{
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        fontWeight: 700,
                                        backgroundColor: `${getStatusColor(entry.status)}15`,
                                        color: getStatusColor(entry.status),
                                        padding: '4px 12px',
                                        border: `1px solid ${getStatusColor(entry.status)}30`
                                    }}>
                                        {entry.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: 'center', opacity: 0.4, margin: 0, padding: 'var(--space-24) 0' }}>
                            No status updates recorded yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DigestPage;

