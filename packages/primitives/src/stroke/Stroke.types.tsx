import { ControlState } from '@meshx-org/mxui-core'

export interface ControlStrokeProps {
    state: ControlState
    focused?: boolean
    children: React.ReactNode
}

export interface StrokeProps {
    children: React.ReactNode
}
