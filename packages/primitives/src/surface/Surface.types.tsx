import type { LayoutProps, SpaceProps, BorderRadiusProps } from 'styled-system'

export interface FlyoutSurfaceProps extends LayoutProps, SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}

export interface CardSurfaceProps extends LayoutProps, SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
     
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}

export interface LayerSurfaceProps extends LayoutProps, SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}

export interface SmokeSurfaceProps extends LayoutProps, SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}
