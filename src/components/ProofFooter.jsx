const PROOF_ITEMS = [
    { key: 'uiBuilt', label: 'UI Built' },
    { key: 'logicWorking', label: 'Logic Working' },
    { key: 'testPassed', label: 'Test Passed' },
    { key: 'deployed', label: 'Deployed' },
]

function ProofFooter({ checks, onToggle }) {
    return (
        <footer className="proof-footer">
            <h4 className="proof-footer__title">Proof of Completion</h4>
            <ul className="proof-footer__list">
                {PROOF_ITEMS.map((item) => (
                    <li
                        key={item.key}
                        className={`proof-item ${checks[item.key] ? 'proof-item--checked' : ''}`}
                        onClick={() => onToggle(item.key)}
                        role="checkbox"
                        aria-checked={checks[item.key]}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                onToggle(item.key)
                            }
                        }}
                    >
                        <span className="proof-checkbox">
                            {checks[item.key] && <span className="proof-checkmark">✓</span>}
                        </span>
                        {item.label}
                    </li>
                ))}
            </ul>
        </footer>
    )
}

export default ProofFooter
