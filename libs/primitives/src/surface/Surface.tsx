import React, { ForwardedRef } from 'react'
import styled from 'styled-components'
import {
    layout,
    margin,
    padding,
    borderRadius,
    MarginProps,
    LayoutProps,
    PaddingProps,
    BorderRadiusProps,
    opacity,
    OpacityProps
} from 'styled-system'
import { LayerStroke, ControlStrokeX } from '../stroke/Stroke'
import { LayerFill, SmokeFill, ControlFillX, SubtleFillX } from '../fill/Fill'
import { FlyoutSurfaceProps, LayerSurfaceProps, CardSurfaceProps } from './Surface.types'
import { useControlState, sx } from '@meshx/mxui-core'
import styles from './Surface.module.scss'
import clsx from 'clsx'

const SurfaceWrapper = styled.div<MarginProps>`
    ${margin}
    ${layout}
    position: relative;
    display: flex;
`

const SurfaceContent = styled('div')<PaddingProps>`
    ${padding}
    width: 100%;
    height: 100%;
    z-index: 3;
`

const StyledFlyoutSurface = styled.div<MarginProps & PaddingProps & LayoutProps & BorderRadiusProps & OpacityProps>`
    ${margin}
    ${layout}
    ${padding}
    ${opacity}
    ${borderRadius}

    backdrop-filter: ${({ theme }) => (theme.name === 'light' ? 'blur(20px) saturate(3)' : 'blur(20px) saturate(3.5)')};
    background-color: var(--theme-acrylic-default);
    box-shadow: 0 8px 16px 0 ${(props) => (props.theme.name === 'light' ? 'rgba(0 0 0 / 14%)' : 'rgba(0 0 0 / 26%)')},
        0 0 0 1px var(--theme-stroke-surface);
`

function FlyoutSurface<C extends React.ElementType = 'div'>(props: FlyoutSurfaceProps<C>, ref: ForwardedRef<any>) {
    const { children, as = 'div', borderRadius = 5, ...restProps } = props

    return (
        <StyledFlyoutSurface ref={ref} role="presentation" borderRadius={borderRadius} {...restProps}>
            {children}
        </StyledFlyoutSurface>
    )
}

function CardSurface<C extends React.ElementType = 'div'>(props: CardSurfaceProps<C>, ref: ForwardedRef<C>) {
    const { children, as = 'div', variant = 'default', className, sx: s, ...restProps } = props
    const css = sx({ sx: s })

    return (
        <div
            ref={ref as any}
            style={css()}
            role="presentation"
            {...restProps}
            className={clsx(className, styles.CardSurface)}
            data-variant={variant}
        >
            {children}
        </div>
    )
}

export function SmokeSurface(props: any) {
    const { children, as, ...restProps } = props

    return (
        <SurfaceWrapper {...restProps}>
            <SmokeFill borderRadius={5} {...restProps} />
            <SurfaceContent as={as} {...restProps}>
                {children}
            </SurfaceContent>
        </SurfaceWrapper>
    )
}

export function SubtleSurface(props: any) {
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
}

export function ControlSurface(props: any) {
    const { children, as, ...restProps } = props
    const { state, handlers } = useControlState<HTMLDivElement>(props.disabled)

    return (
        <SurfaceWrapper {...handlers}>
            <ControlStrokeX data-state={state} borderRadius={6} />
            <ControlFillX data-state={state} borderRadius={6} />
            <SurfaceContent as={as} {...restProps}>
                {children}
            </SurfaceContent>
        </SurfaceWrapper>
    )
}

export function LayerSurface(props: LayerSurfaceProps) {
    const { children, as, ...restProps } = props

    return (
        <SurfaceWrapper {...restProps}>
            <LayerStroke borderRadius={5} {...restProps} />
            <LayerFill {...restProps} />
            <SurfaceContent as={as} {...restProps}>
                {children}
            </SurfaceContent>
        </SurfaceWrapper>
    )
}

const _FlyoutSurface = React.forwardRef(FlyoutSurface)
export { _FlyoutSurface as FlyoutSurface }

const _CardSurface = React.forwardRef(CardSurface)
export { _CardSurface as CardSurface }
