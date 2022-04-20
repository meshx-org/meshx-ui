export type ButtonAppearance = 'primary' | 'secondary'

export interface ButtonProps {
    apparance?: 'primary' | 'outline' | 'subtle' | 'transparent'

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

    /**
     * A button can format its icon to appear before or after its content.
     * @default 'before'
     */
    iconPosition?: 'before' | 'after'

    /**
     * A button can show a loading indicator if it is waiting for another action to happen before allowing itself to
     * be interacted with.
     * @default false
     * @unstable
     */
    loading?: boolean

    /**
     * A button supports different sizes.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large'

    /**
     * Handler to be called when the button is pressed.
     */
    onClick?: () => void

    children: React.ReactNode
}

