import React from 'react';

const DigestJobItem = ({ job }) => {
    const getScoreColor = (score) => {
        if (score >= 80) return '#228B22';
        if (score >= 60) return '#FFBF00';
        if (score >= 40) return 'var(--text-primary)';
        return '#808080';
    };

    return (
        <div style={{
            padding: 'var(--space-24) 0',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-24)'
        }}>
            <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '18px', marginBottom: '4px' }}>{job.title}</h4>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                    {job.company} • {job.location} • {job.experience}
                </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-32)' }}>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10px', fontWeight: 600, opacity: 0.4, textTransform: 'uppercase' }}>Match</div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: getScoreColor(job.matchScore) }}>{job.matchScore}%</div>
                </div>

                <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{
                        padding: '8px 20px',
                        fontSize: '13px',
                        textDecoration: 'none',
                        textAlign: 'center'
                    }}
                >
                    Apply
                </a>
            </div>
        </div>
    );
};

export default DigestJobItem;
