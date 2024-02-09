export type LinkVariant = 'primary' | 'secondary'

export type LinkProps<C extends React.ElementType> = {
    children: React.ReactNode

    onClick?: () => void

    /**
     * @default 'primary'
     */
    variant?: LinkVariant

    as?: C
} & React.ComponentPropsWithoutRef<C>
