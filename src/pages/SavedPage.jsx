import React, { useState, useEffect } from 'react';
import jobsData from '../data/jobs.json';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import Toast from '../components/Toast';
import { STATUS_STATES, setJobStatus } from '../utils/status';

const SavedPage = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobStatuses, setJobStatuses] = useState({});
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const savedIds = JSON.parse(localStorage.getItem('savedJobIds') || '[]');
        const filtered = jobsData.filter(job => savedIds.includes(job.id));
        setSavedJobs(filtered);

        // Load all job statuses
        const allStatuses = JSON.parse(localStorage.getItem('jobTrackerStatuses') || '{}');
        setJobStatuses(allStatuses);
    }, []);

    const handleUnsave = (id) => {
        const savedIds = JSON.parse(localStorage.getItem('savedJobIds') || '[]');
        const newIds = savedIds.filter(savedId => savedId !== id);
        localStorage.setItem('savedJobIds', JSON.stringify(newIds));
        setSavedJobs(savedJobs.filter(job => job.id !== id));
    };

    const handleStatusUpdate = (jobId, newStatus) => {
        const job = jobsData.find(j => j.id === jobId);
        if (!job) return;

        setJobStatus(jobId, newStatus, job);
        setJobStatuses(prev => ({ ...prev, [jobId]: newStatus }));
        setToast({ message: `Status updated: ${newStatus}`, type: 'success' });
    };

    return (
        <div style={{ padding: 'var(--space-64) 0' }}>
            <h1 style={{ marginBottom: 'var(--space-40)' }}>Saved Opportunities</h1>

            <div style={{ maxWidth: 'var(--max-content-width)' }}>
                {savedJobs.length > 0 ? (
                    savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onUnsave={handleUnsave}
                            isSaved={true}
                            onView={setSelectedJob}
                            status={jobStatuses[job.id] || STATUS_STATES.NOT_APPLIED}
                            onStatusChange={handleStatusUpdate}
                        />
                    ))
                ) : (
                    <div className="card" style={{
                        padding: 'var(--space-64) var(--space-40)',
                        textAlign: 'center',
                        borderStyle: 'dashed',
                        opacity: 0.8
                    }}>
                        <p style={{
                            color: 'var(--text-primary)',
                            opacity: 0.5,
                            maxWidth: '400px',
                            margin: '0 auto'
                        }}>
                            You haven't saved any jobs yet. Your bookmarked opportunities will appear here for quick access.
                        </p>
                    </div>
                )}
            </div>

            <JobModal
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
            />

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default SavedPage;

