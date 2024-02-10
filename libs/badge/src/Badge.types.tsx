export type BadgeVariant = 'info' | 'help' | 'default' | 'success' | 'warning' | 'danger'

export interface BadgeProps {
    children?: React.ReactNode

    /**
     * @default 'default'
     */
    variant?: BadgeVariant
}
