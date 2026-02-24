import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
    const locations = ["All Locations", "Bangalore", "Mysore", "Gurugram", "Pune", "Chennai", "Noida", "Hyderabad", "Mumbai", "Kolkata", "Remote"];
    const modes = ["All Modes", "Remote", "Hybrid", "Onsite"];
    const experiences = ["All Experience", "Fresher", "0-1", "1-3", "3-5"];
    const sources = ["All Sources", "LinkedIn", "Naukri", "Indeed"];
    const sortOptions = [
        { label: "Latest", value: "latest" },
        { label: "Match Score", value: "match-desc" },
        { label: "Salary (High to Low)", value: "salary-desc" },
        { label: "Experience (Low to High)", value: "exp-asc" }
    ];

    const handleChange = (name, value) => {
        onFilterChange({ ...filters, [name]: value });
    };

    const selectStyle = {
        padding: 'var(--space-8) var(--space-16)',
        border: '1px solid var(--border-color)',
        backgroundColor: 'white',
        fontSize: '14px',
        fontFamily: 'var(--font-sans)',
        outline: 'none',
        flex: 1,
        minWidth: '140px'
    };

    return (
        <div style={{
            marginBottom: 'var(--space-40)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-16)',
            padding: 'var(--space-24)',
            backgroundColor: 'rgba(209, 209, 209, 0.1)',
            border: '1px solid var(--border-color)'
        }}>
            <div style={{ display: 'flex', gap: 'var(--space-16)', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Search by title or company..."
                    value={filters.query}
                    onChange={(e) => handleChange('query', e.target.value)}
                    style={{ flex: 2, minWidth: '250px' }}
                />

                <select
                    style={selectStyle}
                    value={filters.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                >
                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-16)', flexWrap: 'wrap' }}>
                <select
                    style={selectStyle}
                    value={filters.mode}
                    onChange={(e) => handleChange('mode', e.target.value)}
                >
                    {modes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
                </select>

                <select
                    style={selectStyle}
                    value={filters.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                >
                    {experiences.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                </select>

                <select
                    style={selectStyle}
                    value={filters.source}
                    onChange={(e) => handleChange('source', e.target.value)}
                >
                    {sources.map(src => <option key={src} value={src}>{src}</option>)}
                </select>

                <select
                    style={{ ...selectStyle, borderLeft: '2px solid var(--accent-color)' }}
                    value={filters.sort}
                    onChange={(e) => handleChange('sort', e.target.value)}
                >
                    {sortOptions.map(opt => <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>)}
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
