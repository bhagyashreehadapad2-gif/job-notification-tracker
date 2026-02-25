import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const getBgColor = () => {
        switch (type) {
            case 'success': return '#e6fffa'; // Light mint
            case 'error': return '#fff5f5';  // Light red
            default: return 'white';
        }
    };

    const getBorderColor = () => {
        switch (type) {
            case 'success': return '#38b2ac';
            case 'error': return '#f56565';
            default: return 'var(--border-color)';
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: 'var(--space-32)',
            right: 'var(--space-32)',
            padding: 'var(--space-16) var(--space-24)',
            backgroundColor: getBgColor(),
            border: `1px solid ${getBorderColor()}`,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            borderRadius: '0',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-12)',
            animation: 'toast-in 0.3s ease-out'
        }}>
            <style>
                {`
                    @keyframes toast-in {
                        from { transform: translateY(100%); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}
            </style>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                {message}
            </span>
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    padding: '4px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    lineHeight: 1,
                    opacity: 0.4
                }}
            >
                &times;
            </button>
        </div>
    );
};

export default Toast;
