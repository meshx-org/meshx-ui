import type { ReactNode } from 'react'
import type { LayoutProps, SpaceProps, MarginProps, BorderRadiusProps, OpacityProps, PaddingProps } from 'styled-system'

export type FlyoutSurfaceProps<C extends React.ElementType> = {
    children?: ReactNode
    as?: C
} & React.ComponentPropsWithoutRef<C> &
    MarginProps &
    PaddingProps &
    LayoutProps &
    BorderRadiusProps &
    OpacityProps

export type CardSurfaceProps<C extends React.ElementType> = {
    children?: React.ReactNode | React.ReactNode[]
    variant?: "default" | "secondary"
    as?: C
} & React.ComponentPropsWithoutRef<C> &
    MarginProps &
    PaddingProps &
    LayoutProps &
    BorderRadiusProps &
    OpacityProps

export interface LayerSurfaceProps extends LayoutProps, SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}

export interface SmokeSurfaceProps extends LayoutProps, SpaceProps, BorderRadiusProps {
    children?: React.ReactNode | React.ReactNode[]
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
}
