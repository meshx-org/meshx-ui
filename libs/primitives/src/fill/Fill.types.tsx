import { ControlState } from '@meshx/mxui-core'
import { BorderRadiusProps } from 'styled-system'

export type ButtonAppearance = 'primary' | 'secondary'

export interface ControlFillProps extends BorderRadiusProps {
    children: React.ReactNode
}

export interface TextControlFillProps extends BorderRadiusProps {
    state: ControlState
    children: React.ReactNode
}

export interface SubtleFillProps extends BorderRadiusProps {
    children: React.ReactNode
}

export interface CardFillProps extends BorderRadiusProps {
    state: ControlState
}

export interface SmokeFillProps extends BorderRadiusProps {}
export interface LayerFillProps extends BorderRadiusProps {}

export interface AcrylicFillProps extends BorderRadiusProps {
    blur?: number
}
