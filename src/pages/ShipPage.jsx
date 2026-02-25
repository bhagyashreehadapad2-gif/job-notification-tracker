import React, { useState, useEffect } from 'react';

const ShipPage = () => {
    const [isLocked, setIsLocked] = useState(true);

    useEffect(() => {
        const checkStatus = () => {
            const saved = localStorage.getItem('jobTrackerTestStatus');
            if (saved) {
                const status = JSON.parse(saved);
                const passedCount = Object.values(status).filter(val => val === true).length;
                setIsLocked(passedCount < 10);
            } else {
                setIsLocked(true);
            }
        };

        checkStatus();
        // Check every second in case they change it in another tab/refresh logic
        const interval = setInterval(checkStatus, 1000);
        return () => clearInterval(interval);
    }, []);

    if (isLocked) {
        return (
            <div style={{
                height: '70vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '64px', marginBottom: 'var(--space-24)' }}>🔒</div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', marginBottom: 'var(--space-16)' }}>
                    Shipment Locked
                </h1>
                <p style={{ color: 'var(--error-color)', maxWidth: '400px', lineHeight: 1.6 }}>
                    Complete all 10 tests on the <a href="/jt/07-test" style={{ color: 'inherit' }}>Checklist Page</a> before shipping.
                </p>
            </div>
        );
    }

    return (
        <div style={{
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <div style={{ fontSize: '64px', marginBottom: 'var(--space-24)' }}>🚀</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '48px', marginBottom: 'var(--space-16)' }}>
                Ready to Ship
            </h1>
            <p style={{ color: 'var(--success-color)', fontSize: '18px', marginBottom: 'var(--space-40)' }}>
                All systems verified. Project is stable and ready for delivery.
            </p>
            <div style={{
                padding: 'var(--space-40)',
                border: '2px dashed var(--border-color)',
                backgroundColor: 'rgba(34, 197, 94, 0.05)',
                maxWidth: '600px'
            }}>
                <h3 style={{ marginBottom: 'var(--space-16)' }}>Final Project Audit Passed</h3>
                <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, opacity: 0.8 }}>
                    <li style={{ marginBottom: 'var(--space-8)' }}>✓ Core Engine Verified</li>
                    <li style={{ marginBottom: 'var(--space-8)' }}>✓ Design System Compliance Confirmed</li>
                    <li style={{ marginBottom: 'var(--space-8)' }}>✓ Persistence Logic Robust</li>
                    <li>✓ Zero Critical Console Errors</li>
                </ul>
            </div>
        </div>
    );
};

export default ShipPage;
