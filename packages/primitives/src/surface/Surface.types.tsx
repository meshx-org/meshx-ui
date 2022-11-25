import type { LayoutProps, SpaceProps, BorderRadiusProps } from 'styled-system'

export interface FlyoutSurfaceProps extends LayoutProps, SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
}

export interface CardSurfaceProps extends LayoutProps, SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
}

export interface LayerSurfaceProps extends LayoutProps, SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
}

export interface SmokeSurfaceProps extends LayoutProps, SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
}