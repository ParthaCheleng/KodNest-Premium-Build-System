import * as React from "react"

const Card = React.forwardRef(({ className, style, ...props }, ref) => (
    <div
        ref={ref}
        className={className}
        style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border-light)',
            borderRadius: 'var(--radius)',
            color: 'var(--color-text)',
            ...style
        }}
        {...props}
    />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, style, ...props }, ref) => (
    <div
        ref={ref}
        className={className}
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xs)',
            padding: 'var(--space-md)',
            ...style
        }}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, style, ...props }, ref) => (
    <h3
        ref={ref}
        className={className}
        style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            lineHeight: 'var(--leading-tight)',
            fontSize: 'var(--text-lg)',
            margin: 0,
            color: 'var(--color-text)',
            ...style
        }}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, style, ...props }, ref) => (
    <div
        ref={ref}
        className={className}
        style={{
            padding: 'var(--space-md)',
            paddingTop: 0,
            ...style
        }}
        {...props}
    />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }
