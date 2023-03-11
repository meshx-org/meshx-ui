import { ControlState } from '@meshx-org/mxui-core'
import { BorderRadiusProps } from 'styled-system'

export interface ControlStrokeProps {
    state: ControlState
    focused?: boolean
    children: React.ReactNode
    borderRadius: number
}

export interface ControlStrokeXProps {
    state: ControlState
    borderRadius?: number
    focused?: boolean
}

export interface CardStrokeProps extends BorderRadiusProps {}
export interface SurfaceStrokeProps extends BorderRadiusProps {}
