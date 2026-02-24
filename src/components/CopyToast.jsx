function CopyToast({ visible }) {
    return (
        <div className={`copy-toast ${visible ? 'copy-toast--visible' : ''}`}>
            Copied to clipboard
        </div>
    )
}

export default CopyToast
