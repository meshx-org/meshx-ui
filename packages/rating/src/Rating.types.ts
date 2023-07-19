export interface RatingProps {
    /**
     * Maximum rating.
     * @default 5
     */
    max?: number

    /**
     * The minimum increment value change allowed.
     * @default 1
     */
    precision?: number

    icon?: React.ReactNode
    emptyIcon?: React.ReactNode

    name?: string
    defaultValue?: number
    value?: number
    onChange?: (value: number) => void
}

export interface RatingItemProps {
    icon: React.ReactNode
    emptyIcon: React.ReactNode

    isActive: boolean

    itemValue: number
    ratingValue: number
    ratingValueRounded: number
}
