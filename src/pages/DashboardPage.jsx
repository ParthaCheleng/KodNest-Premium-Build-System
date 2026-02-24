import { LayoutDashboard } from 'lucide-react'

function DashboardPage() {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
                <LayoutDashboard size={24} color="var(--color-accent)" strokeWidth={1.75} />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                    Dashboard
                </h2>
            </div>
            <div
                style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border-light)',
                    borderRadius: 'var(--radius)',
                    padding: 'var(--space-md)',
                }}
            >
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-muted)', lineHeight: 'var(--leading-relaxed)', maxWidth: 'var(--max-text-width)' }}>
                    Welcome to your placement preparation dashboard. Your progress, upcoming assessments, and recommended practice areas will appear here.
                </p>
            </div>
        </div>
    )
}

export default DashboardPage
