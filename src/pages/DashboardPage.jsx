import React, { useState } from 'react'
import { LayoutDashboard, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { CircularProgress } from '../components/CircularProgress'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

const skillData = [
    { subject: 'DSA', score: 75, fullMark: 100 },
    { subject: 'System Design', score: 60, fullMark: 100 },
    { subject: 'Communication', score: 80, fullMark: 100 },
    { subject: 'Resume', score: 85, fullMark: 100 },
    { subject: 'Aptitude', score: 70, fullMark: 100 },
]

const upcomingAssessments = [
    { id: 1, title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
    { id: 2, title: 'System Design Review', time: 'Wed, 2:00 PM' },
    { id: 3, title: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
]

function DashboardPage() {
    const [readinessScore, setReadinessScore] = useState(72)
    const currentTopic = 'Dynamic Programming'
    const practiceCompleted = 3
    const practiceTotal = 10
    const practicePercentage = Math.min(100, Math.max(0, (practiceCompleted / practiceTotal) * 100))

    const goalsSolved = 12
    const goalsTotal = 20
    const goalsPercentage = Math.min(100, Math.max(0, (goalsSolved / goalsTotal) * 100))

    const weekDays = [
        { name: 'Mon', active: true },
        { name: 'Tue', active: true },
        { name: 'Wed', active: false },
        { name: 'Thu', active: true },
        { name: 'Fri', active: false },
        { name: 'Sat', active: false },
        { name: 'Sun', active: false },
    ]

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                <LayoutDashboard size={28} color="var(--color-primary, var(--color-accent))" strokeWidth={1.75} />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700, margin: 0 }}>
                    Dashboard
                </h2>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--space-md)',
                }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Readiness</CardTitle>
                    </CardHeader>
                    <CardContent style={{ display: 'flex', justifyContent: 'center', paddingBottom: 'var(--space-lg)' }}>
                        <CircularProgress score={readinessScore} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent style={{ height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                                <PolarGrid stroke="var(--color-border-light)" />
                                <PolarAngleAxis
                                    dataKey="subject"
                                    tick={{ fill: 'var(--color-text)', fontSize: '12px', fontFamily: 'var(--font-body)' }}
                                />
                                <Radar
                                    name="Score"
                                    dataKey="score"
                                    stroke="var(--color-primary, var(--color-accent))"
                                    fill="var(--color-primary, var(--color-accent))"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--space-md)',
                }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Continue Practice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p style={{ fontWeight: 600, fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-xs)' }}>
                            {practiceCompleted >= practiceTotal ? "All topics complete!" : currentTopic}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>
                                {practiceCompleted}/{practiceTotal} completed
                            </span>
                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                                {Math.round(practicePercentage)}%
                            </span>
                        </div>

                        <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-border-light)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                            <div
                                style={{
                                    width: `${practicePercentage}%`,
                                    height: '100%',
                                    backgroundColor: 'var(--color-primary, var(--color-accent))',
                                    borderRadius: 'var(--radius)',
                                    transition: 'width var(--transition)'
                                }}
                            />
                        </div>

                        <button
                            style={{
                                width: '100%',
                                padding: 'var(--space-xs)',
                                backgroundColor: 'var(--color-primary, var(--color-accent))',
                                color: '#FFF',
                                border: 'none',
                                borderRadius: 'var(--radius)',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 600,
                                marginTop: 'var(--space-md)',
                                transition: 'opacity var(--transition)'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                        >
                            Continue
                        </button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)', fontWeight: 500 }}>
                                Problems Solved
                            </span>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>
                                {goalsSolved}/{goalsTotal} this week
                            </span>
                        </div>

                        <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-border-light)', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: 'var(--space-md)' }}>
                            <div
                                style={{
                                    width: `${goalsPercentage}%`,
                                    height: '100%',
                                    backgroundColor: 'var(--color-success)',
                                    borderRadius: 'var(--radius)',
                                    transition: 'width var(--transition)'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-sm)' }}>
                            {weekDays.map((day, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <div
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: day.active ? 'var(--color-success)' : 'var(--color-border-light)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: day.active ? '#FFF' : 'transparent',
                                            fontSize: '10px'
                                        }}
                                    >
                                        {day.active && '✓'}
                                    </div>
                                    <span style={{ fontSize: '10px', color: 'var(--color-muted)' }}>{day.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            {upcomingAssessments.map((assessment) => (
                                <li
                                    key={assessment.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 'var(--space-sm)',
                                        paddingBottom: 'var(--space-sm)',
                                        borderBottom: '1px solid var(--color-border-light)'
                                    }}
                                >
                                    <div style={{ marginTop: '2px' }}>
                                        <Clock size={16} color="var(--color-primary, var(--color-accent))" />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: '2px' }}>
                                            {assessment.title}
                                        </p>
                                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>
                                            {assessment.time}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardPage
