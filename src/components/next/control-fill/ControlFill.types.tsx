import { ControlState } from '../../../interfaces/control'

export type ButtonAppearance = 'primary' | 'secondary'

export interface ControlFillProps {
    state: ControlState
    disabled?: boolean
    children: React.ReactNode
}