import { ControlState } from '../../../interfaces/control'

export interface ElevationProps {
    state: ControlState
    children: React.ReactNode
    focused?: boolean
}
