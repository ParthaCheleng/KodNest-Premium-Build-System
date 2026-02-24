import React, { useState, useEffect } from 'react'
import { ClipboardCheck, Briefcase, FileText, Building, Clock, ArrowLeft, CheckCircle2, Copy, Download, AlertTriangle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { CircularProgress } from '../components/CircularProgress'
import { analyzeJD } from '../utils/analyzer'

export default function AssessmentsPage() {
    const [activeTab, setActiveTab] = useState('analyze')

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

        // analyzeJD returns baseScore, skillConfidenceMap (default 'practice'), and initial readinessScore
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

    // --- Interactive Skill Toggles ---
    const handleToggleSkill = (skill) => {
        if (!currentResult) return;

        const newMap = { ...(currentResult.skillConfidenceMap || {}) };
        newMap[skill] = newMap[skill] === 'know' ? 'practice' : 'know';

        let knowCount = 0;
        let practiceCount = 0;
        Object.values(newMap).forEach(val => {
            if (val === 'know') knowCount++;
            else practiceCount++;
        });

        let newScore = currentResult.baseScore + (knowCount * 2) - (practiceCount * 2);
        newScore = Math.max(0, Math.min(100, newScore));

        const updatedResult = {
            ...currentResult,
            skillConfidenceMap: newMap,
            readinessScore: newScore
        };

        setCurrentResult(updatedResult);

        const newHistory = history.map(item => item.id === updatedResult.id ? updatedResult : item);
        setHistory(newHistory);
        localStorage.setItem('jd_analyzer_history', JSON.stringify(newHistory));
    }

    // --- Export Handlers ---
    const handleCopyPlan = () => {
        const text = currentResult.plan.map(p => `${p.day}: ${p.title}\n${p.desc}`).join('\n\n');
        navigator.clipboard.writeText(text);
        alert('7-Day Plan Copied!');
    }

    const handleCopyChecklist = () => {
        const text = Object.entries(currentResult.checklist).map(([round, items]) => {
            return `${round}\n${items.map(i => `- ${i}`).join('\n')}`
        }).join('\n\n');
        navigator.clipboard.writeText(text);
        alert('Checklist Copied!');
    }

    const handleCopyQuestions = () => {
        const text = currentResult.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
        navigator.clipboard.writeText(text);
        alert('Questions Copied!');
    }

    const handleDownloadTxt = () => {
        let text = `Role: ${currentResult.role}\nCompany: ${currentResult.company}\nScore: ${currentResult.readinessScore}/100\n\n`;

        text += `=== EXTRACTED SKILLS ===\n`;
        Object.entries(currentResult.extractedSkills).forEach(([cat, skills]) => {
            text += `${cat}: ${skills.join(', ')}\n`;
        });

        text += `\n=== ROUND CHECKLIST ===\n`;
        Object.entries(currentResult.checklist).forEach(([round, items]) => {
            text += `${round}\n${items.map(i => `- ${i}`).join('\n')}\n\n`;
        });

        text += `=== 7-DAY PLAN ===\n`;
        currentResult.plan.forEach(p => {
            text += `${p.day}: ${p.title}\n${p.desc}\n\n`;
        });

        text += `=== 10 INTERVIEW QUESTIONS ===\n`;
        currentResult.questions.forEach((q, i) => {
            text += `${i + 1}. ${q}\n`;
        });

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `KodNest_Prep_${currentResult.company.replace(/\s+/g, '_')}_${currentResult.role.replace(/\s+/g, '_')}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Common UI styles
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
        transition: 'opacity var(--transition)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    }

    const btnSecondary = {
        padding: 'var(--space-sm) var(--space-md)',
        backgroundColor: 'transparent',
        color: 'var(--color-text)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all var(--transition)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    }

    const tabStyle = (isActive) => ({
        padding: 'var(--space-xs) var(--space-md)',
        cursor: 'pointer',
        borderBottom: isActive ? '2px solid var(--color-primary, var(--color-accent))' : '2px solid transparent',
        color: isActive ? 'var(--color-text)' : 'var(--color-muted)',
        fontWeight: isActive ? 600 : 400,
        fontFamily: 'var(--font-body)',
    })

    // Action Next box logic
    let weakSkills = [];
    if (currentResult && currentResult.skillConfidenceMap) {
        weakSkills = Object.entries(currentResult.skillConfidenceMap)
            .filter(([_, val]) => val === 'practice')
            .map(([skill]) => skill)
            .slice(0, 3);
    }

    return (
        <div style={{ paddingBottom: 'var(--space-xl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
                <ClipboardCheck size={28} color="var(--color-primary, var(--color-accent))" strokeWidth={1.75} />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0 }}>
                    JD Analyzer
                </h2>
            </div>

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
                                    <input style={inputStyle} type="text" placeholder="e.g. Google" value={company} onChange={(e) => setCompany(e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600 }}>
                                        <Briefcase size={16} /> Role (Optional)
                                    </label>
                                    <input style={inputStyle} type="text" placeholder="e.g. Frontend Engineer" value={role} onChange={(e) => setRole(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600 }}>
                                    <FileText size={16} /> Job Description Text *
                                </label>
                                <textarea style={{ ...inputStyle, minHeight: '200px', resize: 'vertical' }} placeholder="Paste the full job description here..." value={jdText} onChange={(e) => setJdText(e.target.value)} />
                            </div>
                            {error && <p style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-sm)' }}>{error}</p>}
                            <button style={btnPrimary} onClick={handleAnalyze} onMouseEnter={(e) => e.target.style.opacity = '0.9'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
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
                                <div key={item.id} onClick={() => viewHistoryItem(item)} style={{ padding: 'var(--space-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, margin: '0 0 4px 0' }}>{item.role} @ {item.company}</h3>
                                        <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={14} /> {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div style={{ fontWeight: 600, color: 'var(--color-primary, var(--color-accent))' }}>Score: {item.readinessScore}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* RESULTS VIEW */}
            {activeTab === 'results' && currentResult && (
                <div>
                    <button onClick={() => setActiveTab('history')} style={{ background: 'none', border: 'none', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 'var(--space-lg)' }}>
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
                                <CardTitle>Live JD Breakdown Score</CardTitle>
                            </CardHeader>
                            <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress score={currentResult.readinessScore} />
                            </CardContent>
                        </Card>
                    </div>

                    <Card style={{ marginBottom: 'var(--space-lg)' }}>
                        <CardHeader>
                            <CardTitle>Extracted Skills & Self-Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                {Object.entries(currentResult.extractedSkills).map(([cat, skills]) => (
                                    <div key={cat}>
                                        <h4 style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--color-muted)' }}>{cat}</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                            {skills.map(skill => {
                                                const isKnow = currentResult.skillConfidenceMap?.[skill] === 'know';
                                                return (
                                                    <div
                                                        key={skill}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '12px',
                                                            padding: '8px 12px',
                                                            border: '1px solid var(--color-border-light)',
                                                            borderRadius: 'var(--radius)',
                                                            backgroundColor: 'white'
                                                        }}
                                                    >
                                                        <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>
                                                            {skill}
                                                        </span>
                                                        <div style={{ display: 'flex', gap: '4px' }}>
                                                            <button
                                                                onClick={() => handleToggleSkill(skill)}
                                                                style={{
                                                                    border: '1px solid',
                                                                    borderColor: isKnow ? 'var(--color-success)' : 'var(--color-border)',
                                                                    backgroundColor: isKnow ? 'var(--color-success)' : 'transparent',
                                                                    color: isKnow ? '#FFF' : 'var(--color-muted)',
                                                                    padding: '4px 10px',
                                                                    borderRadius: '12px',
                                                                    fontSize: 'var(--text-xs)',
                                                                    cursor: 'pointer',
                                                                    fontWeight: 600,
                                                                    transition: 'all var(--transition)'
                                                                }}
                                                            >
                                                                {isKnow ? "I know this" : "Need practice"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
                        <button
                            style={btnSecondary}
                            onClick={handleCopyPlan}
                            onMouseEnter={(e) => Object.assign(e.target.style, { backgroundColor: 'var(--color-surface)' })}
                            onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
                        >
                            <Copy size={16} /> Copy 7-day plan
                        </button>
                        <button
                            style={btnSecondary}
                            onClick={handleCopyChecklist}
                            onMouseEnter={(e) => Object.assign(e.target.style, { backgroundColor: 'var(--color-surface)' })}
                            onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
                        >
                            <Copy size={16} /> Copy checklist
                        </button>
                        <button
                            style={btnSecondary}
                            onClick={handleCopyQuestions}
                            onMouseEnter={(e) => Object.assign(e.target.style, { backgroundColor: 'var(--color-surface)' })}
                            onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
                        >
                            <Copy size={16} /> Copy 10 questions
                        </button>
                        <button
                            style={btnPrimary}
                            onClick={handleDownloadTxt}
                            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                        >
                            <Download size={16} /> Download as TXT
                        </button>
                    </div>

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

                    <Card style={{ marginBottom: 'var(--space-lg)' }}>
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

                    {/* Action Next Box */}
                    <div style={{
                        marginTop: 'var(--space-md)',
                        padding: 'var(--space-md)',
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border-light)',
                        borderLeft: '4px solid var(--color-primary, var(--color-accent))',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-xs)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AlertTriangle size={20} color="var(--color-primary, var(--color-accent))" />
                            <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)' }}>Action Next</h4>
                        </div>
                        {weakSkills.length > 0 ? (
                            <p style={{ margin: 0, color: 'var(--color-text)', lineHeight: 'var(--leading-relaxed)' }}>
                                Focus on your weakest areas: <strong>{weakSkills.join(', ')}</strong>.<br />
                                Suggest next action: <strong>Start Day 1 plan now.</strong>
                            </p>
                        ) : (
                            <p style={{ margin: 0, color: 'var(--color-text)', lineHeight: 'var(--leading-relaxed)' }}>
                                You marked all skills as "I know this". Great job!<br />
                                Suggest next action: <strong>Start Day 1 plan now.</strong>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
