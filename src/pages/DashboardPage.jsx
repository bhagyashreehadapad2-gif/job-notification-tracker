import React, { useState, useEffect, useMemo } from 'react';
import jobsData from '../data/jobs.json';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import JobModal from '../components/JobModal';

const DashboardPage = () => {
    const [filters, setFilters] = useState({
        query: '',
        location: 'All Locations',
        mode: 'All Modes',
        experience: 'All Experience',
        source: 'All Sources',
        sort: 'latest'
    });

    const [savedJobIds, setSavedJobIds] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    // Initialize saved jobs from localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedJobIds') || '[]');
        setSavedJobIds(saved);
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

    const filteredJobs = useMemo(() => {
        return jobsData
            .filter(job => {
                const matchQuery = job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
                    job.company.toLowerCase().includes(filters.query.toLowerCase());
                const matchLocation = filters.location === 'All Locations' || job.location.includes(filters.location);
                const matchMode = filters.mode === 'All Modes' || job.mode === filters.mode;
                const matchExp = filters.experience === 'All Experience' || job.experience === filters.experience;
                const matchSource = filters.source === 'All Sources' || job.source === filters.source;

                return matchQuery && matchLocation && matchMode && matchExp && matchSource;
            })
            .sort((a, b) => {
                if (filters.sort === 'latest') return a.postedDaysAgo - b.postedDaysAgo;
                if (filters.sort === 'exp-asc') {
                    const expRank = { "Fresher": 0, "0-1": 1, "1-3": 2, "3-5": 3 };
                    return expRank[a.experience] - expRank[b.experience];
                }
                if (filters.sort === 'salary-desc') {
                    // Primitive salary parsing for sorting
                    const getSal = (s) => parseInt(s.match(/\d+/)?.[0] || 0);
                    return getSal(b.salaryRange) - getSal(a.salaryRange);
                }
                return 0;
            });
    }, [filters]);

    return (
        <div style={{ padding: 'var(--space-64) 0' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 'var(--space-40)'
            }}>
                <h1 style={{ margin: 0 }}>Opportunities</h1>
                <span style={{
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    opacity: 0.5
                }}>
                    {filteredJobs.length} matches found
                </span>
            </div>

            <FilterBar filters={filters} onFilterChange={setFilters} />

            <div style={{ maxWidth: 'var(--max-content-width)' }}>
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onSave={handleSave}
                            onUnsave={handleUnsave}
                            isSaved={savedJobIds.includes(job.id)}
                            onView={setSelectedJob}
                        />
                    ))
                ) : (
                    <div className="card" style={{ padding: 'var(--space-40)', textAlign: 'center', opacity: 0.6 }}>
                        <p>No jobs match your search.</p>
                    </div>
                )}
            </div>

            <JobModal
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
            />
        </div>
    );
};

export default DashboardPage;
