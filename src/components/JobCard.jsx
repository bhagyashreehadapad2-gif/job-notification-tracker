import React from 'react';
import { STATUS_STATES } from '../utils/status';

const JobCard = ({ job, onSave, onUnsave, isSaved, onView, matchScore, status, onStatusChange }) => {
    const getScoreColor = (score) => {
        if (score >= 80) return '#228B22'; // Green
        if (score >= 60) return '#FFBF00'; // Amber
        if (score >= 40) return 'var(--text-primary)'; // Neutral
        return '#808080'; // Grey
    };

    const getStatusColor = (s) => {
        switch (s) {
            case STATUS_STATES.APPLIED: return '#1e90ff';
            case STATUS_STATES.REJECTED: return '#dc3545';
            case STATUS_STATES.SELECTED: return '#28a745';
            default: return 'var(--text-primary)';
        }
    };

    const statusOptions = Object.values(STATUS_STATES);

    return (
        <div className="card" style={{
            marginBottom: 'var(--space-24)',
            transition: 'border-color 0.2s ease',
            position: 'relative',
            borderLeft: status && status !== STATUS_STATES.NOT_APPLIED ? `4px solid ${getStatusColor(status)}` : '1px solid var(--border-color)'
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', marginBottom: 'var(--space-4)' }}>
                        <p style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '16px',
                            color: 'var(--text-primary)',
                            opacity: 0.8,
                            margin: 0
                        }}>
                            {job.company} • {job.location} ({job.mode})
                        </p>
                        {status && status !== STATUS_STATES.NOT_APPLIED && (
                            <span style={{
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                letterSpacing: '0.5px',
                                backgroundColor: `${getStatusColor(status)}15`,
                                color: getStatusColor(status),
                                padding: '2px 8px',
                                border: `1px solid ${getStatusColor(status)}30`
                            }}>
                                {status}
                            </span>
                        )}
                    </div>
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

            <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
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
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid var(--border-color)', paddingLeft: 'var(--space-16)' }}>
                    <span style={{ fontSize: '12px', opacity: 0.5 }}>Status:</span>
                    <select
                        value={status || STATUS_STATES.NOT_APPLIED}
                        onChange={(e) => onStatusChange(job.id, e.target.value)}
                        style={{
                            padding: '4px 8px',
                            fontSize: '13px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'white',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {statusOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

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

