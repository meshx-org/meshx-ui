import { ControlState } from '../../common/control'

export interface ElevationProps {
    state: ControlState
    focused?: boolean
    children: React.ReactNode
}
