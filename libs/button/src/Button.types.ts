import { ControlState } from '@meshx/mxui-core'
import { FocusableOptions } from '@react-aria/focus'

export type ButtonAppearance = 'primary' | 'secondary'

export type ButtonProps<C extends React.ElementType> = {
    /**
     * The appearance of the button.
     * @default "default"
     */
    variant?: 'default' | 'outline' | 'link' | 'accent' | 'warning' | 'danger'

    /**
     * A button fits the content.
     * @default true
     */
    fit?: boolean

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
     * Overrides the default state of the button.
     * @default undefined
     */
    state?: ControlState

    /** Text showed */
    children?: string

    /**
     * A button can format its icon to appear before or after its content.
     * @default before
     */
    iconPosition?: 'before' | 'after'

    as?: C
} & React.ComponentPropsWithoutRef<C> &
    FocusableOptions
