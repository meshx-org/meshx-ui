import type { ReactNode } from 'react'
import type { SxProp } from '@meshx/mxui-core'

export type CardSurfaceVariant = 'default' | 'well' | 'success' | 'warning' | 'danger'
export type ControlSurfaceVariant = 'default' | 'accent' | 'link' | 'outline' | 'warning' | 'danger' | 'success'

export type FlyoutSurfaceProps<C extends React.ElementType> = {
    children?: ReactNode
    as?: C
} & React.ComponentPropsWithoutRef<C> &
    SxProp

export type CardSurfaceProps<C extends React.ElementType> = {
    children?: React.ReactNode | React.ReactNode[]
    variant?: CardSurfaceVariant
    as?: C
} & React.ComponentPropsWithoutRef<C> &
    SxProp

export type LayerSurfaceProps<C extends React.ElementType> = {
    children?: React.ReactNode | React.ReactNode[]
    as?: C
} & React.ComponentPropsWithoutRef<C> &
    SxProp

export type SmokeSurfaceProps<C extends React.ElementType> = {
    children?: React.ReactNode | React.ReactNode[]
    as?: C
} & React.ComponentPropsWithoutRef<C> &
    SxProp

export type ControlSurfaceProps<C extends React.ElementType> = {
    children?: React.ReactNode | React.ReactNode[]
    as?: C
    disabled?: boolean
} & React.ComponentPropsWithoutRef<C> &
    SxProp
