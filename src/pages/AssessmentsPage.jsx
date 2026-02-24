import { ClipboardCheck } from 'lucide-react'

function AssessmentsPage() {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
                <ClipboardCheck size={24} color="var(--color-accent)" strokeWidth={1.75} />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                    Assessments
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
                    Take timed assessments to evaluate your readiness. Results and detailed breakdowns will be shown after completion.
                </p>
            </div>
        </div>
    )
}

export default AssessmentsPage
