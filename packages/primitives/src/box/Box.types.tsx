import React from "react"
import { SpaceProps, LayoutProps, ColorProps, BorderProps, PositionProps, BackgroundProps } from 'styled-system'

export interface BoxProps extends SpaceProps, ColorProps, LayoutProps, BackgroundProps, BorderProps, PositionProps {
    children?: React.ReactNode | React.ReactNode[]
}
