import { ControlState } from '@meshx-org/mxui-core'

export type ButtonAppearance = 'primary' | 'secondary'

export interface ButtonProps {
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
    children: string

    /**
     * A button can format its icon to appear before or after its content.
     * @default before
     */
    iconPosition?: 'before' | 'after'

    /** Handler to be called when the button is pressed. */
    onPress?: (e: any) => void

    as?: string | React.ComponentType<any>

    // allow other props
    [key: string]: unknown
}

export interface LinkButtonBaseProps {
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
     * Overrides the default state of the button.
     * @default undefined
     */
    state?: ControlState

    children: React.ReactNode
}

export type LinkButtonProps<T> = LinkButtonBaseProps &
    (
        | (JSX.IntrinsicElements['a'] & {
              /**
               * @default undefined
               */
              as?: keyof JSX.IntrinsicElements
          })
        | ({
              [key in keyof T]: T[key]
          } & {
              /**
               * @default undefined
               */
              as?: React.ComponentType<T>
          })
    )
