import { ControlState } from '@meshx/mxui-core'
import { BorderRadiusProps, OpacityProps } from 'styled-system'

export interface CardShadowProps extends BorderRadiusProps, OpacityProps {
    state: ControlState
}

export interface FlyoutShadowProps extends BorderRadiusProps, OpacityProps {}
