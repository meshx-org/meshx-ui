import { ControlState } from '@meshx-org/mxui-core'
import { BorderRadiusProps } from 'styled-system'

export interface ControlStrokeProps {
    state: ControlState
    focused?: boolean
    children: React.ReactNode
    borderRadius: number
}

export interface ControlStrokeXProps {
    borderRadius?: number
    focused?: boolean
    'data-state': ControlState
}

export interface CardStrokeProps extends BorderRadiusProps {}
export interface SurfaceStrokeProps extends BorderRadiusProps {}
