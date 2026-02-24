import React from 'react';

const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(247, 246, 243, 0.95)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: 'var(--space-24)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'white',
                border: '1px solid var(--border-color)',
                maxWidth: '600px',
                width: '100%',
                padding: 'var(--space-40)',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'var(--space-16)',
                        right: 'var(--space-16)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '24px',
                        color: 'var(--text-primary)',
                        opacity: 0.4
                    }}
                >
                    &times;
                </button>

                <div style={{ marginBottom: 'var(--space-24)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-16)', marginBottom: 'var(--space-8)' }}>
                        <h2 style={{ margin: 0 }}>{job.title}</h2>
                        <span style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: 'white',
                            backgroundColor: 'var(--accent-color)',
                            padding: '2px 8px'
                        }}>
                            {job.source}
                        </span>
                    </div>
                    <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '18px',
                        opacity: 0.8,
                        margin: 0
                    }}>
                        {job.company} • {job.location}
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    gap: 'var(--space-24)',
                    marginBottom: 'var(--space-40)',
                    fontSize: '14px',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: 'var(--space-24)'
                }}>
                    <div>
                        <span style={{ opacity: 0.5, display: 'block' }}>Experience</span>
                        <strong>{job.experience}</strong>
                    </div>
                    <div>
                        <span style={{ opacity: 0.5, display: 'block' }}>Salary</span>
                        <strong>{job.salaryRange}</strong>
                    </div>
                    <div>
                        <span style={{ opacity: 0.5, display: 'block' }}>Mode</span>
                        <strong>{job.mode}</strong>
                    </div>
                </div>

                <div style={{ marginBottom: 'var(--space-40)' }}>
                    <h4 style={{ marginBottom: 'var(--space-16)' }}>Description</h4>
                    <p style={{ lineHeight: '1.8', opacity: 0.8 }}>{job.description}</p>
                </div>

                <div style={{ marginBottom: 'var(--space-40)' }}>
                    <h4 style={{ marginBottom: 'var(--space-16)' }}>Top Skills</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-8)' }}>
                        {job.skills.map(skill => (
                            <span key={skill} style={{
                                border: '1px solid var(--border-color)',
                                padding: '4px 12px',
                                fontSize: '13px'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-16)' }}>
                    <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ textDecoration: 'none', textAlign: 'center', flex: 1 }}
                    >
                        Apply on {job.source}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobModal;
