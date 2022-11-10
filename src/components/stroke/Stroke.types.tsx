import { ControlState } from '../../common/control'

export interface ControlStrokeProps {
    state: ControlState
    focused?: boolean
    children: React.ReactNode
}

export interface StrokeProps {
    children: React.ReactNode
}
