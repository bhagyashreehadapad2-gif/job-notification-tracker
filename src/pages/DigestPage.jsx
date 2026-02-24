import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../data/jobs.json';
import { calculateMatchScore } from '../utils/scoring';
import DigestJobItem from '../components/DigestJobItem';

const DigestPage = () => {
    const today = new Date().toISOString().split('T')[0];
    const digestKey = `jobTrackerDigest_${today}`;

    const [prefs, setPrefs] = useState(null);
    const [digest, setDigest] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copyStatus, setCopyStatus] = useState(false);

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
                    boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
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
        </div>
    );
};

export default DigestPage;
