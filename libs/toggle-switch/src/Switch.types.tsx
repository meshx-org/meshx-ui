import { ReactNode } from 'react'
import { AriaSwitchProps } from 'react-aria'
import { SxProp } from '@meshx/mxui-core'

export type RenderProps<T> = {
    /** The children of the component. A function may be provided to alter the children based on component state. */
    children?: ReactNode | ((values: T) => ReactNode)
} & SxProp

export interface SwitchProps extends Omit<AriaSwitchProps, 'children'>, RenderProps<any> {
    //value?: boolean
    //defaultValue?: boolean
    //onChange?: ChangeHandler
    //disabled?: boolean
}
