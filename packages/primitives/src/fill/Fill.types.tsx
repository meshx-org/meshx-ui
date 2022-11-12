import { ControlState } from '@meshx-org/mxui-core'

export type ButtonAppearance = 'primary' | 'secondary'

export interface ControlFillProps {
    state: ControlState
    children: React.ReactNode
}

export interface AcrilicFillProps {
    blur?: number
    children: React.ReactNode
}
