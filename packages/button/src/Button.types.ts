import { ControlState } from '@meshx-org/mxui-core'

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
     * @default before
     */
    iconPosition?: 'before' | 'after'

    /**
     * A button supports different sizes.
     * @default medium
     */
    size?: 'small' | 'medium' | 'large'

    /**
     * Handler to be called when the button is pressed.
     */
    onPress?: (e: any) => void

    as?: string | React.ComponentType<any>

    children: React.ReactNode

    // allow other props
    [key: string]: unknown
}

type LinkButtonBaseProps = {
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

export type LinkButtonProps<T > = LinkButtonBaseProps &
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
