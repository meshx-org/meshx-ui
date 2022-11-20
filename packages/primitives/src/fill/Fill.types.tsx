import { ControlState } from '@meshx-org/mxui-core'
import { BorderRadiusProps } from "styled-system"

export type ButtonAppearance = 'primary' | 'secondary'

export interface ControlFillProps {
    state: ControlState
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
