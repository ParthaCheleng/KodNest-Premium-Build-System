import { User } from 'lucide-react'

function ProfilePage() {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
                <User size={24} color="var(--color-accent)" strokeWidth={1.75} />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                    Profile
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
                    Manage your account settings, update your resume, and configure notification preferences.
                </p>
            </div>
        </div>
    )
}

export default ProfilePage
