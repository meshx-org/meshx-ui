import React from 'react'
import styled from 'styled-components'
import { layout, margin, padding, MarginProps, PaddingProps } from 'styled-system'
import { CardStroke, SurfaceStroke } from '../stroke/Stroke'
import { AcrylicFill, LayerFill, SmokeFill, CardFill } from '../fill/Fill'
import { CardShadow, FlyoutShadow } from '../shadow/Shadow'
import { FlyoutSurfaceProps, LayerSurfaceProps, CardSurfaceProps } from './Surface.types'
import { useControlState } from '@meshx-org/mxui-core'

const SurfaceWrapper = styled.div<MarginProps>`
    ${margin}
    ${layout}
    position: relative;
    display: flex;
`

const SurfaceContent = styled.div<PaddingProps>`
    ${padding}
    z-index: 3;
    flex: 1;
`

export function FlyoutSurface(props: FlyoutSurfaceProps) {
    const { children, ...restProps } = props

    return (
        <SurfaceWrapper {...restProps}>
            <SurfaceStroke borderRadius={4} {...restProps} />
            <FlyoutShadow borderRadius={4} {...restProps} />
            <AcrylicFill borderRadius={4} {...restProps} />
            <SurfaceContent {...restProps}>{children}</SurfaceContent>
        </SurfaceWrapper>
    )
}

export function CardSurface(props: CardSurfaceProps) {
    const { children, ...restProps } = props
    const { state, handlers } = useControlState<HTMLDivElement>(false)
    
    return (
        <SurfaceWrapper {...handlers} {...restProps}>
            <CardStroke borderRadius={4} {...restProps} />
            <CardShadow borderRadius={4} {...restProps} state={state}  />
            <CardFill borderRadius={4} {...restProps}  state={state} />
            <SurfaceContent {...restProps}>{children}</SurfaceContent>
        </SurfaceWrapper>
    )
}

export function SmokeSurface(props: any) {
    const { children, ...restProps } = props

    return (
        <SurfaceWrapper {...restProps}>
            <SmokeFill {...restProps} />
            <SurfaceContent {...restProps}>{children}</SurfaceContent>
        </SurfaceWrapper>
    )
}

export function LayerSurface(props: LayerSurfaceProps) {
    const { children, ...restProps } = props

    return (
        <SurfaceWrapper {...restProps}>
            <CardStroke borderRadius={4} {...restProps} />
            <LayerFill {...restProps} />
            <SurfaceContent {...restProps}>{children}</SurfaceContent>
        </SurfaceWrapper>
    )
}
