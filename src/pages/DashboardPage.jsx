import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../data/jobs.json';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import JobModal from '../components/JobModal';
import Toast from '../components/Toast';
import { calculateMatchScore } from '../utils/scoring';
import { STATUS_STATES, getJobStatus, setJobStatus } from '../utils/status';

const DashboardPage = () => {
    const [filters, setFilters] = useState({
        query: '',
        location: 'All Locations',
        mode: 'All Modes',
        experience: 'All Experience',
        source: 'All Sources',
        status: 'All Statuses',
        sort: 'latest' // default changed to match-desc if prefs exist later
    });

    const [prefs, setPrefs] = useState(null);
    const [showOnlyMatches, setShowOnlyMatches] = useState(false);
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobStatuses, setJobStatuses] = useState({});
    const [toast, setToast] = useState(null);

    // Initialize from localStorage
    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            const parsedPrefs = JSON.parse(savedPrefs);
            setPrefs(parsedPrefs);
            setFilters(prev => ({ ...prev, sort: 'match-desc' }));
        }

        const savedIds = JSON.parse(localStorage.getItem('savedJobIds') || '[]');
        setSavedJobIds(savedIds);

        // Load all job statuses
        const allStatuses = JSON.parse(localStorage.getItem('jobTrackerStatuses') || '{}');
        setJobStatuses(allStatuses);
    }, []);

    const handleSave = (id) => {
        const newSaved = [...new Set([...savedJobIds, id])];
        setSavedJobIds(newSaved);
        localStorage.setItem('savedJobIds', JSON.stringify(newSaved));
    };

    const handleUnsave = (id) => {
        const newSaved = savedJobIds.filter(savedId => savedId !== id);
        setSavedJobIds(newSaved);
        localStorage.setItem('savedJobIds', JSON.stringify(newSaved));
    };

    const handleStatusUpdate = (jobId, newStatus) => {
        const job = jobsData.find(j => j.id === jobId);
        if (!job) return;

        setJobStatus(jobId, newStatus, job);
        setJobStatuses(prev => ({ ...prev, [jobId]: newStatus }));
        setToast({ message: `Status updated: ${newStatus}`, type: 'success' });
    };

    const processedJobs = useMemo(() => {
        // First compute match scores for all jobs
        const scoredJobs = jobsData.map(job => ({
            ...job,
            matchScore: prefs ? calculateMatchScore(job, prefs) : undefined,
            status: jobStatuses[job.id] || STATUS_STATES.NOT_APPLIED
        }));

        return scoredJobs
            .filter(job => {
                // AND Logic for filters
                const matchQuery = job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
                    job.company.toLowerCase().includes(filters.query.toLowerCase());
                const matchLocation = filters.location === 'All Locations' || job.location.includes(filters.location);
                const matchMode = filters.mode === 'All Modes' || job.mode === filters.mode;
                const matchExp = filters.experience === 'All Experience' || job.experience === filters.experience;
                const matchSource = filters.source === 'All Sources' || job.source === filters.source;
                const matchStatus = filters.status === 'All Statuses' || job.status === filters.status;

                // Threshold Toggle Logic
                const matchThreshold = !showOnlyMatches || (job.matchScore >= (prefs?.minMatchScore || 0));

                return matchQuery && matchLocation && matchMode && matchExp && matchSource && matchStatus && matchThreshold;
            })
            .sort((a, b) => {
                if (filters.sort === 'match-desc') return (b.matchScore || 0) - (a.matchScore || 0);
                if (filters.sort === 'latest') return a.postedDaysAgo - b.postedDaysAgo;
                if (filters.sort === 'exp-asc') {
                    const expRank = { "Fresher": 0, "0-1": 1, "1-3": 2, "3-5": 3 };
                    return expRank[a.experience] - expRank[b.experience];
                }
                if (filters.sort === 'salary-desc') {
                    const getSal = (s) => parseInt(s.match(/\d+/)?.[0] || 0);
                    return getSal(b.salaryRange) - getSal(a.salaryRange);
                }
                return 0;
            });
    }, [filters, prefs, showOnlyMatches, jobStatuses]);

    return (
        <div style={{ padding: 'var(--space-64) 0' }}>
            {/* Header Area */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 'var(--space-40)'
            }}>
                <h1 style={{ margin: 0 }}>Opportunities</h1>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-24)' }}>
                    {prefs && (
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}>
                            <input
                                type="checkbox"
                                checked={showOnlyMatches}
                                onChange={(e) => setShowOnlyMatches(e.target.checked)}
                            />
                            Show only items above {prefs.minMatchScore}% match
                        </label>
                    )}
                    <span style={{
                        fontSize: '14px',
                        color: 'var(--text-primary)',
                        opacity: 0.5
                    }}>
                        {processedJobs.length} matches found
                    </span>
                </div>
            </div>

            {/* No Prefs Banner */}
            {!prefs && (
                <div style={{
                    backgroundColor: 'rgba(139, 0, 0, 0.05)',
                    padding: 'var(--space-24)',
                    marginBottom: 'var(--space-40)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>
                        Set your preferences to activate intelligent matching.
                    </p>
                    <Link to="/settings" className="btn-secondary" style={{ padding: '8px 24px', textDecoration: 'none' }}>
                        Go to Settings
                    </Link>
                </div>
            )}

            <FilterBar filters={filters} onFilterChange={setFilters} />

            <div style={{ maxWidth: 'var(--max-content-width)' }}>
                {processedJobs.length > 0 ? (
                    processedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onSave={handleSave}
                            onUnsave={handleUnsave}
                            isSaved={savedJobIds.includes(job.id)}
                            onView={setSelectedJob}
                            matchScore={job.matchScore}
                            status={job.status}
                            onStatusChange={handleStatusUpdate}
                        />
                    ))
                ) : (
                    <div className="card" style={{ padding: 'var(--space-64) var(--space-40)', textAlign: 'center', opacity: 0.8 }}>
                        <p style={{ opacity: 0.5, maxWidth: '400px', margin: '0 auto' }}>
                            {prefs && showOnlyMatches
                                ? "No roles match your criteria. Adjust filters or lower threshold."
                                : "No jobs match your search."}
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

export default DashboardPage;

