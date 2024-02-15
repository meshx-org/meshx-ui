export interface SelectProps {
    /**
     * A button can fill the width of its container.
     * @default false
     */
    block?: boolean

    /**
     * A button can show that it cannot be interacted with.
     * @default false
     */
    disabled?: boolean

    /** Show icon in button @default undefined */
    icon?: React.ReactNode

    /** Show icon on the other side of the button @default undefined */
    iconRight?: React.ReactNode

    /**
     * A button supports different sizes.
     * @default medium
     */
    size?: 'small' | 'medium' | 'large'

    as?: string | React.ComponentType<any>

    children: React.ReactNode

    // allow other props
    [key: string]: unknown

    
}
