import React from 'react'
import styled from 'styled-components'
import { layout, margin, padding, MarginProps, PaddingProps } from 'styled-system'
import { LayerStroke, CardStroke, ControlStrokeX, SurfaceStroke } from '../stroke/Stroke'
import { AcrylicFill, LayerFill, SmokeFill, CardFill, ControlFillX, SubtleFillX } from '../fill/Fill'
import { CardShadow, FlyoutShadow } from '../shadow/Shadow'
import { FlyoutSurfaceProps, LayerSurfaceProps, CardSurfaceProps } from './Surface.types'
import { useControlState } from '@meshx-org/mxui-core'

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

export function FlyoutSurface(props: FlyoutSurfaceProps) {
    const { children, as, ...restProps } = props

    return (
        <SurfaceWrapper {...restProps}>
            <SurfaceStroke borderRadius={5} {...restProps} />
            <FlyoutShadow borderRadius={5} {...restProps} />
            <AcrylicFill borderRadius={5} {...restProps} />
            <SurfaceContent as={as} {...restProps}>
                {children}
            </SurfaceContent>
        </SurfaceWrapper>
    )
}

export function CardSurface(props: CardSurfaceProps) {
    const { children, as, ...restProps } = props
    const { state, handlers } = useControlState<HTMLDivElement>(false)

    return (
        <SurfaceWrapper {...handlers} {...restProps}>
            <CardStroke borderRadius={5} {...restProps} />
            <CardShadow borderRadius={5} {...restProps} state={state} />
            <CardFill borderRadius={5} {...restProps} data-state={state} />
            <SurfaceContent as={as} {...restProps}>
                {children}
            </SurfaceContent>
        </SurfaceWrapper>
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
            <ControlStrokeX state={state} borderRadius={6} />
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
