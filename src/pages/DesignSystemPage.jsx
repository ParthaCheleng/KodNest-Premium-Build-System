/* This page preserves the ORIGINAL App.jsx content exactly as first implemented.
   NO changes to visual identity, typography, spacing, layout, components, or interactions. */

import { useState } from 'react'
import TopBar from '../components/TopBar'
import ContextHeader from '../components/ContextHeader'
import PrimaryWorkspace from '../components/PrimaryWorkspace'
import SecondaryPanel from '../components/SecondaryPanel'
import ProofFooter from '../components/ProofFooter'
import CopyToast from '../components/CopyToast'
import '../App.css'

function DesignSystemPage() {
    const [proofChecks, setProofChecks] = useState({
        uiBuilt: false,
        logicWorking: false,
        testPassed: false,
        deployed: false,
    })

    const [toast, setToast] = useState(false)

    const toggleProof = (key) => {
        setProofChecks((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const showToast = () => {
        setToast(true)
        setTimeout(() => setToast(false), 1500)
    }

    return (
        <div className="app-shell">
            <TopBar
                projectName="KodNest Premium Build System"
                currentStep={1}
                totalSteps={6}
                status="in-progress"
            />

            <ContextHeader
                headline="Design System Foundation"
                subtext="Establish the visual language, spacing, and component rules for the entire product."
            />

            <main className="main-content">
                <PrimaryWorkspace />
                <SecondaryPanel onCopy={showToast} />
            </main>

            <ProofFooter checks={proofChecks} onToggle={toggleProof} />
            <CopyToast visible={toast} />
        </div>
    )
}

export default DesignSystemPage
