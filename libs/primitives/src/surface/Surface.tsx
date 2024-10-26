import React, { ForwardedRef } from 'react'
import styled from 'styled-components'
import { padding, PaddingProps } from 'styled-system'
import { ControlStrokeX } from '../stroke/Stroke'
import {
    FlyoutSurfaceProps,
    LayerSurfaceProps,
    CardSurfaceProps,
    SmokeSurfaceProps,
    ControlSurfaceProps
} from './Surface.types'
import { useControlState, sx } from '@meshx/mxui-core'
import styles from './Surface.module.scss'
import clsx from 'clsx'

const SurfaceContent = styled('div')<PaddingProps>`
    ${padding}
    width: 100%;
    height: 100%;
    z-index: 3;
`

function FlyoutSurface<C extends React.ElementType = 'div'>(props: FlyoutSurfaceProps<C>, ref: ForwardedRef<any>) {
    const { children, as: Component = 'div', className, sx: s, ...restProps } = props
    const css = sx({ sx: s })

    return (
        <Component
            ref={ref}
            style={css()}
            role="presentation"
            className={clsx(className, styles.CardSurface)}
            {...restProps}
        >
            {children}
        </Component>
    )
}

function CardSurface<C extends React.ElementType = 'div'>(props: CardSurfaceProps<C>, ref: ForwardedRef<any>) {
    const { children, as: Component = 'div', variant = 'default', className, sx: s, ...restProps } = props
    const css = sx({ sx: s })

    return (
        <Component
            ref={ref}
            style={css()}
            role="presentation"
            className={clsx(className, styles.CardSurface)}
            {...restProps}
            data-variant={variant}
        >
            {children}
        </Component>
    )
}

function SmokeSurface<C extends React.ElementType = 'div'>(props: SmokeSurfaceProps<C>, ref: ForwardedRef<any>) {
    const { children, as: Component = 'div', className, sx: s, ...restProps } = props
    const css = sx({ sx: s })

    return (
        <Component
            ref={ref}
            style={css()}
            role="presentation"
            className={clsx(className, styles.SmokeSurface)}
            {...restProps}
        >
            {children}
        </Component>
    )
}

/*export function SubtleSurface(props: any) {
    const { children, as, ...restProps } = props
    const { state, handlers } = useControlState<HTMLDivElement>(props.disabled)

    return (
        <SurfaceWrapper {...handlers}>
            <SubtleFillX data-state={state} borderRadius={6} />
            <SurfaceContent as={as} {...restProps}>
                {children}
            </SurfaceContent>
        </SurfaceWrapper>
    )
}*/

function ControlSurface<C extends React.ElementType = 'div'>(props: ControlSurfaceProps<C>, ref: ForwardedRef<any>) {
    const { children, as: Component = 'div', variant = 'default', className, state, sx: s, ...restProps } = props
    const css = sx({ sx: s })
    const hasStroke =
        variant === 'accent' ||
        variant === 'default' ||
        variant === 'danger' ||
        variant === 'warning' ||
        variant === 'success'

    return (
        <Component
            ref={ref}
            style={css()}
            role="presentation"
            {...restProps}
            data-variant={variant}
            className={clsx(className, styles.ControlSurface)}
        >
            {hasStroke && <ControlStrokeX borderRadius={5.5} data-state={state} />}
            <SurfaceContent>{children}</SurfaceContent>
        </Component>
    )
}

function LayerSurface<C extends React.ElementType = 'div'>(props: LayerSurfaceProps<C>, ref: ForwardedRef<C>) {
    const { children, as: Component = 'div', className, sx: s, ...restProps } = props
    const css = sx({ sx: s })

    return (
        <Component
            ref={ref as any}
            style={css()}
            role="presentation"
            className={clsx(className, styles.LayerSurface)}
            {...restProps}
        >
            {children}
        </Component>
    )
}

const _FlyoutSurface = React.forwardRef(FlyoutSurface)
export { _FlyoutSurface as FlyoutSurface }

const _CardSurface = React.forwardRef(CardSurface)
export { _CardSurface as CardSurface }

const _SmokeSurface = React.forwardRef(SmokeSurface)
export { _SmokeSurface as SmokeSurface }

const _LayerSurface = React.forwardRef(LayerSurface)
export { _LayerSurface as LayerSurface }

const _ControlSurface = React.forwardRef(ControlSurface)
export { _ControlSurface as ControlSurface }
