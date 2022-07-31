import { ControlState } from '../../../interfaces/control'

export interface ElevationProps {
    state: ControlState
    focused?: boolean
    children: React.ReactNode
}
