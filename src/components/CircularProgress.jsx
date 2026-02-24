import React from 'react'

export function CircularProgress({ score }) {
    const clampedScore = Math.max(0, Math.min(100, isNaN(score) ? 0 : score))
    const radius = 60
    const stroke = 12
    const normalizedRadius = radius - stroke * 0.5
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset = circumference - (clampedScore / 100) * circumference

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
                <svg height={120} width={120} style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        stroke="var(--color-border-light)"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={60}
                        cy={60}
                    />
                    <circle
                        stroke="var(--color-primary, var(--color-accent))"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={60}
                        cy={60}
                    />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-text)' }}>
                        {clampedScore}
                    </span>
                </div>
            </div>
            <span style={{ fontSize: 'var(--text-base)', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                Readiness Score
            </span>
        </div>
    )
}
