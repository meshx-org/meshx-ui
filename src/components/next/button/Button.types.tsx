export type ButtonAppearance = 'primary' | 'secondary'

export interface ButtonProps {
    apparance?: 'default' | 'accent'

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
