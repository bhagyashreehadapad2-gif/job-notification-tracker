export const STATUS_STATES = {
    NOT_APPLIED: 'Not Applied',
    APPLIED: 'Applied',
    REJECTED: 'Rejected',
    SELECTED: 'Selected'
};

export const getJobStatus = (jobId) => {
    const statuses = JSON.parse(localStorage.getItem('jobTrackerStatuses') || '{}');
    return statuses[jobId] || STATUS_STATES.NOT_APPLIED;
};

export const setJobStatus = (jobId, status, jobDetails) => {
    // Update individual status
    const statuses = JSON.parse(localStorage.getItem('jobTrackerStatuses') || '{}');
    statuses[jobId] = status;
    localStorage.setItem('jobTrackerStatuses', JSON.stringify(statuses));

    // Update history
    const history = JSON.parse(localStorage.getItem('jobTrackerStatusHistory') || '[]');
    const newEntry = {
        jobId,
        title: jobDetails.title,
        company: jobDetails.company,
        status,
        timestamp: new Date().toISOString()
    };

    // Keep only last 20 updates
    const updatedHistory = [newEntry, ...history].slice(0, 20);
    localStorage.setItem('jobTrackerStatusHistory', JSON.stringify(updatedHistory));

    return newEntry;
};

export const getStatusHistory = () => {
    return JSON.parse(localStorage.getItem('jobTrackerStatusHistory') || '[]');
};
