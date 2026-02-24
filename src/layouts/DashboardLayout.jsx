import { Outlet, NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    BookOpen,
    ClipboardCheck,
    FolderOpen,
    User,
} from 'lucide-react'

const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/practice', label: 'Practice', icon: BookOpen },
    { to: '/assessments', label: 'Assessments', icon: ClipboardCheck },
    { to: '/resources', label: 'Resources', icon: FolderOpen },
    { to: '/profile', label: 'Profile', icon: User },
]

function DashboardLayout() {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                backgroundColor: 'var(--color-bg)',
                fontFamily: 'var(--font-body)',
            }}
        >
            {/* Sidebar */}
            <aside
                style={{
                    width: '240px',
                    backgroundColor: 'var(--color-text)',
                    display: 'flex',
                    flexDirection: 'column',
                    flexShrink: 0,
                }}
            >
                {/* Sidebar Header */}
                <div
                    style={{
                        padding: 'var(--space-sm) var(--space-md)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    <h2
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'var(--text-md)',
                            fontWeight: 700,
                            color: '#FFFFFF',
                            letterSpacing: 'var(--tracking-tight)',
                        }}
                    >
                        Placement Prep
                    </h2>
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: 'var(--space-xs) var(--space-xs)' }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    style={({ isActive }) => ({
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-xs)',
                                        padding: 'var(--space-xs) var(--space-sm)',
                                        borderRadius: 'var(--radius)',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: 'var(--text-sm)',
                                        fontWeight: 500,
                                        color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
                                        backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                                        textDecoration: 'none',
                                        transition: 'all var(--transition)',
                                    })}
                                >
                                    <item.icon size={18} strokeWidth={1.75} />
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Header */}
                <header
                    style={{
                        height: '56px',
                        backgroundColor: 'var(--color-surface)',
                        borderBottom: '1px solid var(--color-border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 var(--space-lg)',
                        flexShrink: 0,
                    }}
                >
                    <h1
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'var(--text-md)',
                            fontWeight: 700,
                            color: 'var(--color-text)',
                        }}
                    >
                        Placement Prep
                    </h1>
                    {/* User avatar placeholder */}
                    <div
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(139, 0, 0, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <User size={18} color="var(--color-accent)" strokeWidth={1.75} />
                    </div>
                </header>

                {/* Content */}
                <main
                    style={{
                        flex: 1,
                        padding: 'var(--space-lg)',
                        overflowY: 'auto',
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
