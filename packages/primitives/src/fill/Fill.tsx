import React from 'react'
import {
    ControlFillProps,
    SmokeFillProps,
    CardFillProps,
    LayerFillProps,
    AcrylicFillProps,
    TextControlFillProps,
    SubtleFillProps
} from './Fill.types'
import { ControlState, useTheme } from '@meshx-org/mxui-core'
import { borderRadius } from 'styled-system'
import styled, { css, DefaultTheme, InterpolationFunction } from 'styled-components'

const FillBase = styled.div`
    display: flex;
    flex: 1;
    margin: 1px;
`

const TextControlFillBase = styled(FillBase)`
    border-radius: 4px;

    &[data-theme='light'] {
        background: rgba(255, 255, 255, 0.7);
    }

    &[data-theme='dark'] {
        background: rgba(255, 255, 255, 0.06);
    }

    &[data-theme='light']:hover,
    &[data-theme='light'][data-state='hovered'] {
        background: rgba(249, 249, 249, 0.5);
    }

    &[data-theme='light']:active,
    &[data-theme='light'][data-state='pressed'] {
        background: rgba(255, 255, 255, 1);
    }

    &[data-theme='light']:focus-within {
        background: rgba(255, 255, 255, 1);
    }

    &[data-theme='light'][data-state='disabled'] {
        background: rgba(249, 249, 249, 0.3);
    }

    &[data-theme='dark']:hover,
    &[data-theme='dark'][data-state='hovered'] {
        background: rgba(255, 255, 255, 0.083);
    }

    &[data-theme='dark']:active,
    &[data-theme='dark'][data-state='pressed'] {
        background: rgba(30, 30, 30, 0.7);
    }

    &[data-theme='dark']:focus-within {
        background: rgba(30, 30, 30, 0.7);
    }

    &[data-theme='dark'][data-state='disabled'] {
        background: rgba(255, 255, 255, 0.042);
    }
`

export const SubtleFill = styled(FillBase)<SubtleFillProps>`
    border-radius: 4px;

    background: ${(props) => (props.theme.name == 'dark' ? ' rgba(255, 255, 255, 0)' : 'rgba(0, 0, 0, 0)')};

    &:hover,
    &[data-state='hovered'] {
        background: ${(props) =>
            props.theme.name == 'dark' ? 'rgba(255, 255, 255, 0.0837)' : 'rgb(0, 0, 0, 0.0373)'} !important;
    }

    &:active,
    &[data-state='pressed'] {
        background: ${(props) =>
            props.theme.name == 'dark' ? 'rgba(255, 255, 255, 0.0326)' : 'rgba(0, 0, 0, 0.0241)'} !important;
    }

    &[data-state='disabled'] {
        background: ${(props) =>
            props.theme.name == 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgb(0, 0, 0, 0)'} !important;
    }
`

export const ControlFill = styled(FillBase)<ControlFillProps>`
    ${borderRadius}

    background: ${(props) =>
        props.theme.name == 'dark' ? 'hsla(210, 10%, 100%, 0.061)' : 'hsla(210, 10%, 100%, 0.7)'};

    &:hover,
    &[data-state='hovered'] {
        background: ${(props) =>
            props.theme.name == 'dark' ? 'hsla(210, 10%, 100%, 0.084)' : 'rgba(249, 249, 249, 0.5)'} !important;
    }

    &:active,
    &[data-state='pressed'] {
        background: ${(props) =>
            props.theme.name == 'dark' ? 'hsla(210, 10%, 100%, 0.033)' : 'rgba(249, 249, 249, 0.3)'} !important;
    }

    &:disabled,
    [data-state='disabled'] {
        background: ${(props) =>
            props.theme.name == 'dark' ? 'rgba(249, 249, 249, 0.3)' : 'hsla(210, 10%, 100%, 0.04)'} !important;
    }
`

export function TextControlFill({ children, state }: TextControlFillProps) {
    const theme = useTheme()

    return (
        <TextControlFillBase data-state={state} data-theme={theme}>
            {children}
        </TextControlFillBase>
    )
}

function ariaHidden(props: any) {
    return { ...props, 'aria-hidden': true }
}

const fillBase = css`
    z-index: 3;
    position: absolute;
    top: 1px;
    bottom: 1px;
    right: 1px;
    left: 1px;
`

export const SmokeFill = styled.div.attrs(ariaHidden)<SmokeFillProps>`
    ${fillBase}
    ${borderRadius}
    background-color: ${({ theme }) => theme.colors.backgrounds.smoke.default};
`

export const LayerFill = styled.div.attrs((props) => ({ ...props, 'aria-hidden': true }))<LayerFillProps>`
    ${fillBase}
    ${borderRadius}
    background-color: ${({ theme }) => theme.colors.backgrounds.layer.default};
`

export const AcrylicFill = styled.div.attrs(ariaHidden)<AcrylicFillProps>`
    ${fillBase}
    ${borderRadius}
    backdrop-filter: ${({ theme }) => (theme.name === 'light' ? 'blur(20px) saturate(3)' : 'blur(20px) saturate(3.5)')};
    background-color: ${({ theme }) => theme.colors.backgrounds.acrylic.default};
`

function cardFillState(theme: DefaultTheme, state: ControlState) {
    switch (state) {
        case ControlState.Hovered:
            return theme.colors.backgrounds.card.tertiary
        case ControlState.Pressed:
            return theme.colors.backgrounds.card.tertiary
        default:
            return theme.colors.backgrounds.card.default
    }
}

export const CardFill = styled.div.attrs(ariaHidden)<CardFillProps>`
    ${fillBase}
    ${borderRadius}
    background-color: ${(props) => cardFillState(props.theme, props.state)};
`
