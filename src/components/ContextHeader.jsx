function ContextHeader({ headline, subtext }) {
    return (
        <section className="context-header">
            <h1 className="context-header__headline">{headline}</h1>
            <p className="context-header__subtext">{subtext}</p>
        </section>
    )
}

export default ContextHeader
