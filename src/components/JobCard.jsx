import React from 'react';

const JobCard = ({ job, onSave, onUnsave, isSaved, onView, matchScore }) => {
    const getScoreColor = (score) => {
        if (score >= 80) return '#228B22'; // Green
        if (score >= 60) return '#FFBF00'; // Amber
        if (score >= 40) return 'var(--text-primary)'; // Neutral
        return '#808080'; // Grey
    };

    return (
        <div className="card" style={{
            marginBottom: 'var(--space-24)',
            transition: 'border-color 0.2s ease',
            position: 'relative'
        }}>
            {matchScore !== undefined && (
                <div style={{
                    position: 'absolute',
                    top: 'var(--space-16)',
                    right: 'var(--space-16)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px'
                }}>
                    <span style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        opacity: 0.5,
                        textTransform: 'uppercase'
                    }}>
                        Match
                    </span>
                    <span style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: getScoreColor(matchScore),
                        fontFamily: 'var(--font-sans)'
                    }}>
                        {matchScore}%
                    </span>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-16)', marginRight: matchScore !== undefined ? '80px' : 0 }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '20px', marginBottom: 'var(--space-8)' }}>{job.title}</h3>
                    <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '16px',
                        color: 'var(--text-primary)',
                        opacity: 0.8,
                        margin: 0
                    }}>
                        {job.company} • {job.location} ({job.mode})
                    </p>
                </div>
                {!matchScore && (
                    <div style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--accent-color)',
                        backgroundColor: 'rgba(139, 0, 0, 0.05)',
                        padding: '4px 12px',
                        border: '1px solid rgba(139, 0, 0, 0.1)'
                    }}>
                        {job.source}
                    </div>
                )}
            </div>

            <div style={{
                display: 'flex',
                gap: 'var(--space-24)',
                marginBottom: 'var(--space-24)',
                fontSize: '14px',
                color: 'var(--text-primary)',
                opacity: 0.6
            }}>
                <span>Exp: {job.experience}</span>
                <span>{job.salaryRange}</span>
                <span>{job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}</span>
                {matchScore !== undefined && <span>{job.source}</span>}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
                <button className="btn-primary" style={{ padding: '8px 24px' }} onClick={() => onView(job)}>
                    View
                </button>
                <button
                    className="btn-secondary"
                    style={{ padding: '8px 24px' }}
                    onClick={() => isSaved ? onUnsave(job.id) : onSave(job.id)}
                >
                    {isSaved ? 'Saved' : 'Save'}
                </button>
                <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        marginLeft: 'auto',
                        textDecoration: 'none',
                        opacity: 0.5,
                        transition: 'opacity 0.2s'
                    }}
                    onMouseOver={e => e.target.style.opacity = 1}
                    onMouseOut={e => e.target.style.opacity = 0.5}
                >
                    Apply &rarr;
                </a>
            </div>
        </div>
    );
};

export default JobCard;
