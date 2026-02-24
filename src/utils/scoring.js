export const calculateMatchScore = (job, prefs) => {
    if (!prefs) return 0;

    let score = 0;

    const keywords = prefs.roleKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
    const userSkills = prefs.skills.split(',').map(k => k.trim().toLowerCase()).filter(k => k);

    // 1. Title Match (+25)
    if (keywords.some(k => job.title.toLowerCase().includes(k))) {
        score += 25;
    }

    // 2. Description Match (+15)
    if (keywords.some(k => job.description.toLowerCase().includes(k))) {
        score += 15;
    }

    // 3. Location Match (+15)
    if (prefs.preferredLocations.includes(job.location)) {
        score += 15;
    }

    // 4. Mode Match (+10)
    if (prefs.preferredMode.includes(job.mode)) {
        score += 10;
    }

    // 5. Experience Match (+10)
    if (prefs.experienceLevel === job.experience) {
        score += 10;
    }

    // 6. Skills Overlap (+15)
    const jobSkills = job.skills.map(s => s.toLowerCase());
    if (userSkills.some(s => jobSkills.includes(s))) {
        score += 15;
    }

    // 7. Recency (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 8. Source: LinkedIn (+5)
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    return Math.min(score, 100);
};
