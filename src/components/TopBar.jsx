function TopBar({ projectName, currentStep, totalSteps, status }) {
    const statusLabels = {
        'not-started': 'Not Started',
        'in-progress': 'In Progress',
        'shipped': 'Shipped',
    }

    return (
        <header className="top-bar">
            <span className="top-bar__project-name">{projectName}</span>
            <span className="top-bar__progress">
                Step {currentStep} / {totalSteps}
            </span>
            <span className={`top-bar__status top-bar__status--${status}`}>
                <span className="top-bar__status-dot" />
                {statusLabels[status] || 'Not Started'}
            </span>
        </header>
    )
}

export default TopBar
