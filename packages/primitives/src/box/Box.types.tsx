import React from "react"
import { SpaceProps, LayoutProps, ColorProps, BorderProps, FlexboxProps, PositionProps, BackgroundProps } from 'styled-system'

export interface BoxProps extends SpaceProps, ColorProps, LayoutProps, FlexboxProps, BorderProps, PositionProps, BackgroundProps {
    children?: React.ReactNode | React.ReactNode[]
}