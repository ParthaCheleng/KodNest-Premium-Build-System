import React, { useState, useEffect } from 'react'
import { ClipboardCheck, Briefcase, FileText, Building, History, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { CircularProgress } from '../components/CircularProgress'
import { analyzeJD } from '../utils/analyzer'

export default function AssessmentsPage() {
    const [activeTab, setActiveTab] = useState('analyze') // 'analyze' | 'history' | 'results'

    // Form State
    const [company, setCompany] = useState('')
    const [role, setRole] = useState('')
    const [jdText, setJdText] = useState('')

    // Data State
    const [history, setHistory] = useState([])
    const [currentResult, setCurrentResult] = useState(null)
    const [error, setError] = useState('')

    // Load history on mount
    useEffect(() => {
        const saved = localStorage.getItem('jd_analyzer_history')
        if (saved) {
            try {
                setHistory(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse history', e)
            }
        }
    }, [])

    const handleAnalyze = () => {
        if (!jdText.trim()) {
            setError('Job Description text is required.')
            return
        }
        setError('')

        const result = analyzeJD(company, role, jdText)

        const newHistory = [result, ...history]
        setHistory(newHistory)
        localStorage.setItem('jd_analyzer_history', JSON.stringify(newHistory))

        setCurrentResult(result)
        setActiveTab('results')

        // Clear form
        setCompany('')
        setRole('')
        setJdText('')
    }

    const viewHistoryItem = (item) => {
        setCurrentResult(item)
        setActiveTab('results')
    }

    // Common UI styles mapped from original design tokens
    const inputStyle = {
        width: '100%',
        padding: 'var(--space-sm)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-base)',
        color: 'var(--color-text)',
        backgroundColor: 'var(--color-surface)',
        marginBottom: 'var(--space-md)'
    }

    const btnPrimary = {
        padding: 'var(--space-sm) var(--space-md)',
        backgroundColor: 'var(--color-primary, var(--color-accent))',
        color: '#FFF',
        border: 'none',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'opacity var(--transition)'
    }

    const tabStyle = (isActive) => ({
        padding: 'var(--space-xs) var(--space-md)',
        cursor: 'pointer',
        borderBottom: isActive ? '2px solid var(--color-primary, var(--color-accent))' : '2px solid transparent',
        color: isActive ? 'var(--color-text)' : 'var(--color-muted)',
        fontWeight: isActive ? 600 : 400,
        fontFamily: 'var(--font-body)',
    })

    return (
        <div style={{ paddingBottom: 'var(--space-xl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
                <ClipboardCheck size={28} color="var(--color-primary, var(--color-accent))" strokeWidth={1.75} />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                    JD Analyzer
                </h2>
            </div>

            {/* Tabs */}
            {activeTab !== 'results' && (
                <div style={{ display: 'flex', gap: 'var(--space-md)', borderBottom: '1px solid var(--color-border-light)', marginBottom: 'var(--space-lg)' }}>
                    <div style={tabStyle(activeTab === 'analyze')} onClick={() => setActiveTab('analyze')}>
                        Analyze JD
                    </div>
                    <div style={tabStyle(activeTab === 'history')} onClick={() => setActiveTab('history')}>
                        History
                    </div>
                </div>
            )}

            {/* ANALYZE VIEW */}
            {activeTab === 'analyze' && (
                <div style={{ maxWidth: '800px' }}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Paste Job Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600 }}>
                                        <Building size={16} /> Company (Optional)
                                    </label>
                                    <input
                                        style={inputStyle}
                                        type="text"
                                        placeholder="e.g. Google"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600 }}>
                                        <Briefcase size={16} /> Role (Optional)
                                    </label>
                                    <input
                                        style={inputStyle}
                                        type="text"
                                        placeholder="e.g. Frontend Engineer"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600 }}>
                                    <FileText size={16} /> Job Description Text *
                                </label>
                                <textarea
                                    style={{ ...inputStyle, minHeight: '200px', resize: 'vertical' }}
                                    placeholder="Paste the full job description here..."
                                    value={jdText}
                                    onChange={(e) => setJdText(e.target.value)}
                                />
                            </div>

                            {error && <p style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-sm)' }}>{error}</p>}

                            <button
                                style={btnPrimary}
                                onClick={handleAnalyze}
                                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                                onMouseLeave={(e) => e.target.style.opacity = '1'}
                            >
                                Analyze JD
                            </button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* HISTORY VIEW */}
            {activeTab === 'history' && (
                <div style={{ maxWidth: '800px' }}>
                    {history.length === 0 ? (
                        <p style={{ color: 'var(--color-muted)' }}>No history found. Analyze a JD first.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            {history.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => viewHistoryItem(item)}
                                    style={{
                                        padding: 'var(--space-md)',
                                        backgroundColor: 'var(--color-surface)',
                                        border: '1px solid var(--color-border-light)',
                                        borderRadius: 'var(--radius)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, margin: '0 0 4px 0' }}>
                                            {item.role} @ {item.company}
                                        </h3>
                                        <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={14} /> {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div style={{ fontWeight: 600, color: 'var(--color-primary, var(--color-accent))' }}>
                                        Score: {item.readinessScore}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* RESULTS VIEW */}
            {activeTab === 'results' && currentResult && (
                <div>
                    <button
                        onClick={() => setActiveTab('history')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontFamily: 'var(--font-body)',
                            marginBottom: 'var(--space-lg)'
                        }}
                    >
                        <ArrowLeft size={18} /> Back to History
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Analysis Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p style={{ margin: '0 0 8px 0' }}><strong>Role:</strong> {currentResult.role}</p>
                                <p style={{ margin: '0 0 8px 0' }}><strong>Company:</strong> {currentResult.company}</p>
                                <p style={{ margin: '0 0 0 0', color: 'var(--color-muted)', fontSize: 'var(--text-sm)' }}>
                                    Analyzed on {new Date(currentResult.createdAt).toLocaleString()}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>JD Breakdown Score</CardTitle>
                            </CardHeader>
                            <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress score={currentResult.readinessScore} />
                            </CardContent>
                        </Card>
                    </div>

                    <Card style={{ marginBottom: 'var(--space-lg)' }}>
                        <CardHeader>
                            <CardTitle>Extracted Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
                                {Object.entries(currentResult.extractedSkills).map(([cat, skills]) => (
                                    <div key={cat}>
                                        <h4 style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--color-muted)' }}>{cat}</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {skills.map(skill => (
                                                <span key={skill} style={{
                                                    padding: '4px 12px',
                                                    backgroundColor: 'var(--color-primary-100, rgba(139,0,0,0.1))',
                                                    color: 'var(--color-primary-900, var(--color-accent))',
                                                    borderRadius: '16px',
                                                    fontSize: 'var(--text-sm)',
                                                    fontWeight: 500
                                                }}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
                                Round-wise Preparation Checklist
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                {Object.entries(currentResult.checklist).map(([round, items]) => (
                                    <Card key={round}>
                                        <CardHeader>
                                            <CardTitle>{round}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {items.map((item, i) => (
                                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: 'var(--text-sm)' }}>
                                                        <CheckCircle2 size={16} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
                                Adaptive 7-Day Plan
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                {currentResult.plan.map((p, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 'var(--space-md)', paddingBottom: 'var(--space-sm)', borderBottom: '1px solid var(--color-border-light)' }}>
                                        <div style={{ fontWeight: 700, width: '70px', flexShrink: 0 }}>{p.day}</div>
                                        <div>
                                            <div style={{ fontWeight: 600, color: 'var(--color-primary, var(--color-accent))', marginBottom: '4px' }}>{p.title}</div>
                                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>{p.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Likely Interview Questions (Based on JD)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol style={{ paddingLeft: 'var(--space-md)', margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                {currentResult.questions.map((q, i) => (
                                    <li key={i} style={{ lineHeight: 'var(--leading-relaxed)' }}>{q}</li>
                                ))}
                            </ol>
                        </CardContent>
                    </Card>
                </div>
            )}

        </div>
    )
}
