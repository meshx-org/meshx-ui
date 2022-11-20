import { ControlState } from '@meshx-org/mxui-core'
import type { SpaceProps, BorderRadiusProps } from 'styled-system'

export interface FlyoutSurfaceProps extends SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
}

export interface CardSurfaceProps extends SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
    state: ControlState
}

export interface LayerSurfaceProps extends SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
}

export interface SmokeSurfaceProps extends SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
}