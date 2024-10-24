export type BadgeVariant =
    | 'info.subtle'
    | 'info.alt'
    | 'info'
    | 'help.subtle'
    | 'help'
    | 'default'
    | 'success'
    | 'warning'
    | 'danger'

export interface BadgeProps {
    children?: React.ReactNode

    /**
     * @default 'default'
     */
    variant?: BadgeVariant
}
