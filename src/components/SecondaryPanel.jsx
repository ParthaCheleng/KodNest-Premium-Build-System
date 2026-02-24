import { useState } from 'react'

const PROMPT_TEXT = `Create a design system with:
- Background: #F7F6F3
- Accent: #8B0000
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif, max 720px)
- Spacing: 8 / 16 / 24 / 40 / 64px
- No gradients, no glass, no neon`

function SecondaryPanel({ onCopy }) {
    const [feedback, setFeedback] = useState(null)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(PROMPT_TEXT)
            onCopy?.()
        } catch {
            /* clipboard not available in some environments */
        }
    }

    return (
        <aside className="secondary-panel">
            {/* Step Explanation */}
            <div className="secondary-panel__section">
                <h3 className="secondary-panel__title">Step 1: Foundation</h3>
                <p className="secondary-panel__text">
                    Review the design tokens, color palette, and typography rules defined
                    in this step. Everything built after this will inherit from these
                    decisions.
                </p>
            </div>

            {/* Copyable Prompt */}
            <div className="secondary-panel__section">
                <h3 className="secondary-panel__title">Prompt</h3>
                <div className="prompt-box">
                    <span className="prompt-box__label">Copyable prompt</span>
                    {PROMPT_TEXT}
                </div>
                <div className="btn-group" style={{ marginTop: 'var(--space-sm)' }}>
                    <button className="btn btn--primary" onClick={handleCopy}>
                        Copy
                    </button>
                    <button className="btn btn--secondary">Build in Lovable</button>
                </div>
            </div>

            {/* Feedback */}
            <div className="secondary-panel__section">
                <h3 className="secondary-panel__title">Feedback</h3>
                <p className="secondary-panel__text">
                    Did this step produce the expected result?
                </p>
                <div className="btn-group">
                    <button
                        className={`btn ${feedback === 'worked' ? 'btn--success' : 'btn--secondary'}`}
                        onClick={() => setFeedback('worked')}
                    >
                        It Worked
                    </button>
                    <button
                        className={`btn ${feedback === 'error' ? 'btn--warning' : 'btn--secondary'}`}
                        onClick={() => setFeedback('error')}
                    >
                        Error
                    </button>
                    <button className="btn btn--secondary">Add Screenshot</button>
                </div>
                {feedback === 'worked' && (
                    <p
                        style={{
                            marginTop: 'var(--space-xs)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-success)',
                        }}
                    >
                        Confirmed working.
                    </p>
                )}
                {feedback === 'error' && (
                    <div className="error-state" style={{ marginTop: 'var(--space-xs)' }}>
                        <p className="error-state__title">Something went wrong</p>
                        <p className="error-state__text">
                            Describe the issue so it can be addressed in the next iteration.
                        </p>
                    </div>
                )}
            </div>
        </aside>
    )
}

export default SecondaryPanel
