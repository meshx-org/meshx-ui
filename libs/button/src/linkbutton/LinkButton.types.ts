import { ControlState } from '@meshx-org/mxui-core'

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
