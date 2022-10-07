import { ControlState } from '../../common/control'

export type ButtonAppearance = 'primary' | 'secondary'

export interface ControlFillProps {
    state: ControlState
    children: React.ReactNode
}
