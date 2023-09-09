export type LinkVariant = 'primary' | 'secondary'

export type LinkProps = {
    children: React.ReactNode

    onClick?: () => void

    /**
     * @default 'primary'
     */
    variant?: LinkVariant
}
