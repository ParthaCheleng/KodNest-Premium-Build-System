import { FolderOpen } from 'lucide-react'

function ResourcesPage() {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
                <FolderOpen size={24} color="var(--color-accent)" strokeWidth={1.75} />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                    Resources
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
                    Access curated study materials, cheat sheets, and reference guides to support your preparation.
                </p>
            </div>
        </div>
    )
}

export default ResourcesPage
