import { useNavigate } from 'react-router-dom'
import { Code, Video, BarChart3 } from 'lucide-react'

const features = [
    {
        icon: Code,
        title: 'Practice Problems',
        description: 'Solve curated coding challenges across data structures, algorithms, and system design.',
    },
    {
        icon: Video,
        title: 'Mock Interviews',
        description: 'Simulate real interview experiences with timed sessions and structured feedback.',
    },
    {
        icon: BarChart3,
        title: 'Track Progress',
        description: 'Visualize your growth with detailed analytics on speed, accuracy, and consistency.',
    },
]

function LandingPage() {
    const navigate = useNavigate()

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'var(--color-bg)',
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text)',
            }}
        >
            {/* Hero Section */}
            <section
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: 'var(--space-xl) var(--space-md)',
                }}
            >
                <h1
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        lineHeight: 'var(--leading-tight)',
                        letterSpacing: 'var(--tracking-tight)',
                        color: 'var(--color-text)',
                        marginBottom: 'var(--space-sm)',
                    }}
                >
                    Ace Your Placement
                </h1>
                <p
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-md)',
                        color: 'var(--color-muted)',
                        lineHeight: 'var(--leading-normal)',
                        maxWidth: 'var(--max-text-width)',
                        marginBottom: 'var(--space-lg)',
                    }}
                >
                    Practice, assess, and prepare for your dream job
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        fontWeight: 600,
                        padding: 'var(--space-xs) var(--space-md)',
                        backgroundColor: 'var(--color-accent)',
                        color: '#FFFFFF',
                        border: '1px solid var(--color-accent)',
                        borderRadius: 'var(--radius)',
                        cursor: 'pointer',
                        transition: 'all var(--transition)',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--color-accent-hover)'
                        e.target.style.borderColor = 'var(--color-accent-hover)'
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'var(--color-accent)'
                        e.target.style.borderColor = 'var(--color-accent)'
                    }}
                >
                    Get Started
                </button>
            </section>

            {/* Features Grid */}
            <section
                style={{
                    padding: '0 var(--space-lg) var(--space-xl)',
                    maxWidth: '960px',
                    margin: '0 auto',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: 'var(--space-md)',
                    }}
                >
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                border: '1px solid var(--color-border-light)',
                                borderRadius: 'var(--radius)',
                                padding: 'var(--space-md)',
                                transition: 'border-color var(--transition)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border-light)'
                            }}
                        >
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: 'var(--radius)',
                                    backgroundColor: 'rgba(139, 0, 0, 0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 'var(--space-sm)',
                                }}
                            >
                                <feature.icon
                                    size={20}
                                    color="var(--color-accent)"
                                    strokeWidth={1.75}
                                />
                            </div>
                            <h3
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'var(--text-md)',
                                    fontWeight: 700,
                                    lineHeight: 'var(--leading-tight)',
                                    marginBottom: '4px',
                                }}
                            >
                                {feature.title}
                            </h3>
                            <p
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--text-sm)',
                                    color: 'var(--color-muted)',
                                    lineHeight: 'var(--leading-normal)',
                                    maxWidth: 'var(--max-text-width)',
                                }}
                            >
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer
                style={{
                    borderTop: '1px solid var(--color-border-light)',
                    padding: 'var(--space-md) var(--space-lg)',
                    textAlign: 'center',
                }}
            >
                <p
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-muted)',
                    }}
                >
                    &copy; {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.
                </p>
            </footer>
        </div>
    )
}

export default LandingPage
