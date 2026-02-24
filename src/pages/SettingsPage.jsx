import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
    const [prefs, setPrefs] = useState({
        roleKeywords: '',
        preferredLocations: [],
        preferredMode: [],
        experienceLevel: 'Fresher',
        skills: '',
        minMatchScore: 40
    });

    const [savedStatus, setSavedStatus] = useState(false);

    const locations = ["Bangalore", "Mysore", "Gurugram", "Pune", "Chennai", "Noida", "Hyderabad", "Mumbai", "Kolkata", "Remote"];
    const modes = ["Remote", "Hybrid", "Onsite"];
    const expLevels = ["Fresher", "0-1", "1-3", "3-5"];

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            setPrefs(JSON.parse(saved));
        }
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
        setSavedStatus(true);
        setTimeout(() => setSavedStatus(false), 3000);
    };

    const toggleLocation = (loc) => {
        const newLocs = prefs.preferredLocations.includes(loc)
            ? prefs.preferredLocations.filter(l => l !== loc)
            : [...prefs.preferredLocations, loc];
        setPrefs({ ...prefs, preferredLocations: newLocs });
    };

    const toggleMode = (mode) => {
        const newModes = prefs.preferredMode.includes(mode)
            ? prefs.preferredMode.filter(m => m !== mode)
            : [...prefs.preferredMode, mode];
        setPrefs({ ...prefs, preferredMode: newModes });
    };

    return (
        <div style={{ padding: 'var(--space-64) 0', maxWidth: '600px' }}>
            <h1 style={{ marginBottom: 'var(--space-16)' }}>Preferences</h1>
            <p style={{ opacity: 0.6, marginBottom: 'var(--space-40)' }}>
                Define your ideal role to activate the intelligent match engine.
            </p>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
                {/* Keywords */}
                <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-8)' }}>Role Keywords</label>
                    <input
                        type="text"
                        placeholder="e.g. SDE, Frontend, React"
                        value={prefs.roleKeywords}
                        onChange={(e) => setPrefs({ ...prefs, roleKeywords: e.target.value })}
                        style={{ width: '100%' }}
                    />
                    <small style={{ opacity: 0.5 }}>Comma-separated keywords used for title and description matching.</small>
                </div>

                {/* Locations */}
                <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-12)' }}>Preferred Locations</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-8)' }}>
                        {locations.map(loc => (
                            <button
                                key={loc}
                                type="button"
                                onClick={() => toggleLocation(loc)}
                                style={{
                                    padding: '6px 16px',
                                    fontSize: '13px',
                                    backgroundColor: prefs.preferredLocations.includes(loc) ? 'var(--accent-color)' : 'white',
                                    color: prefs.preferredLocations.includes(loc) ? 'white' : 'var(--text-primary)',
                                    border: '1px solid var(--border-color)',
                                    cursor: 'pointer'
                                }}
                            >
                                {loc}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mode */}
                <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-12)' }}>Working Mode</label>
                    <div style={{ display: 'flex', gap: 'var(--space-24)' }}>
                        {modes.map(mode => (
                            <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={prefs.preferredMode.includes(mode)}
                                    onChange={() => toggleMode(mode)}
                                />
                                {mode}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Experience & Skills */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-24)' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-8)' }}>Experience</label>
                        <select
                            value={prefs.experienceLevel}
                            onChange={(e) => setPrefs({ ...prefs, experienceLevel: e.target.value })}
                            style={{ width: '100%' }}
                        >
                            {expLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-8)' }}>Min. Match Score</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input
                                type="range"
                                min="0" max="100"
                                value={prefs.minMatchScore}
                                onChange={(e) => setPrefs({ ...prefs, minMatchScore: parseInt(e.target.value) })}
                                style={{ flex: 1 }}
                            />
                            <span style={{ fontWeight: 600, minWidth: '30px' }}>{prefs.minMatchScore}%</span>
                        </div>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-8)' }}>Your Skills</label>
                    <input
                        type="text"
                        placeholder="e.g. Java, Python, React"
                        value={prefs.skills}
                        onChange={(e) => setPrefs({ ...prefs, skills: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-24)', marginTop: 'var(--space-16)' }}>
                    <button type="submit" className="btn-primary" style={{ padding: '12px 40px' }}>
                        Save Preferences
                    </button>
                    {savedStatus && (
                        <span style={{ color: 'var(--accent-color)', fontSize: '14px', fontWeight: 600 }}>
                            Saved successfully.
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;
