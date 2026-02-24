function PrimaryWorkspace() {
    return (
        <section className="primary-workspace">
            {/* Card: Color System */}
            <div className="card">
                <h3 className="card__title">Color System</h3>
                <p className="card__text">
                    Four colors define the entire system. Background off-white for calm,
                    deep red for action, dark text for clarity, and muted green for
                    confirmation.
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: 'var(--space-sm)',
                        marginTop: 'var(--space-sm)',
                    }}
                >
                    <ColorSwatch color="#F7F6F3" label="Background" border />
                    <ColorSwatch color="#111111" label="Text" />
                    <ColorSwatch color="#8B0000" label="Accent" />
                    <ColorSwatch color="#4A7C59" label="Success" />
                </div>
            </div>

            {/* Card: Typography */}
            <div className="card">
                <h3 className="card__title">Typography</h3>
                <p className="card__text">
                    Headings use Playfair Display at generous sizes. Body text uses Inter
                    at 16–18px with relaxed line height. Maximum text width is capped at
                    720px for readability.
                </p>
                <div style={{ marginTop: 'var(--space-sm)' }}>
                    <p
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'var(--text-xl)',
                            fontWeight: 700,
                            marginBottom: 'var(--space-xs)',
                            lineHeight: 'var(--leading-tight)',
                        }}
                    >
                        Heading Sample
                    </p>
                    <p
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-base)',
                            color: 'var(--color-muted)',
                            lineHeight: 'var(--leading-relaxed)',
                            maxWidth: 'var(--max-text-width)',
                        }}
                    >
                        Body text is clean, legible, and never exceeds 720px in width. Every
                        paragraph breathes.
                    </p>
                </div>
            </div>

            {/* Card: Spacing Scale */}
            <div className="card">
                <h3 className="card__title">Spacing Scale</h3>
                <p className="card__text">
                    Five consistent values across the entire system. No random numbers.
                </p>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 'var(--space-sm)',
                        marginTop: 'var(--space-sm)',
                    }}
                >
                    <SpacingBlock size={8} />
                    <SpacingBlock size={16} />
                    <SpacingBlock size={24} />
                    <SpacingBlock size={40} />
                    <SpacingBlock size={64} />
                </div>
            </div>

            {/* Card: Buttons */}
            <div className="card">
                <h3 className="card__title">Buttons</h3>
                <p className="card__text">
                    Primary buttons use solid deep red. Secondary buttons use an outlined
                    style. Consistent radius and hover transitions everywhere.
                </p>
                <div className="btn-group" style={{ marginTop: 'var(--space-sm)' }}>
                    <button className="btn btn--primary">Primary Action</button>
                    <button className="btn btn--secondary">Secondary</button>
                    <button className="btn btn--success">Success</button>
                    <button className="btn btn--warning">Warning</button>
                </div>
            </div>

            {/* Card: Inputs */}
            <div className="card">
                <h3 className="card__title">Input Fields</h3>
                <p className="card__text">
                    Clean borders, no heavy shadows. Clear focus state using the accent
                    color.
                </p>
                <div style={{ marginTop: 'var(--space-sm)', maxWidth: '400px' }}>
                    <div className="input-group">
                        <label className="input-label" htmlFor="demo-input">
                            Project Name
                        </label>
                        <input
                            id="demo-input"
                            className="input-field"
                            type="text"
                            placeholder="Enter project name"
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label" htmlFor="demo-textarea">
                            Description
                        </label>
                        <textarea
                            id="demo-textarea"
                            className="input-field"
                            rows="3"
                            placeholder="Briefly describe your project"
                            style={{ resize: 'vertical' }}
                        />
                    </div>
                </div>
            </div>

            {/* Card: States */}
            <div className="card">
                <h3 className="card__title">States</h3>
                <p className="card__text">
                    Error and empty states are clear and helpful. They never blame the
                    user.
                </p>
                <div
                    style={{
                        marginTop: 'var(--space-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-sm)',
                    }}
                >
                    <div className="error-state">
                        <p className="error-state__title">Build failed</p>
                        <p className="error-state__text">
                            The deployment could not complete. Check your configuration file
                            and try again.
                        </p>
                    </div>
                    <div className="empty-state">
                        <h4 className="empty-state__title">No steps completed yet</h4>
                        <p className="empty-state__text">
                            Start by defining your color system and typography to set the
                            foundation.
                        </p>
                        <button className="btn btn--primary">Begin Step 1</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ColorSwatch({ color, label, border }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: color,
                    borderRadius: 'var(--radius)',
                    border: border ? '1px solid var(--color-border)' : 'none',
                    marginBottom: '4px',
                }}
            />
            <span
                style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-muted)',
                }}
            >
                {label}
            </span>
        </div>
    )
}

function SpacingBlock({ size }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: 'var(--color-accent)',
                    borderRadius: 'var(--radius)',
                    opacity: 0.15,
                }}
            />
            <span
                style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-muted)',
                    marginTop: '4px',
                    display: 'block',
                }}
            >
                {size}px
            </span>
        </div>
    )
}

export default PrimaryWorkspace
