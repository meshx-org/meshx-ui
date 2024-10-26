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
import { ControlState, useTheme } from '@meshx/mxui-core'
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
    z-index: 1;
    position: absolute;
    inset: 0px;
`

export const SubtleFillX = styled.div.attrs(ariaHidden)<SubtleFillProps>`
    ${fillBase}
    ${borderRadius}
  
    background: transparent;

    &:hover,
    &[data-state='hovered'] {
        background: var(--theme-subtle-secondary) !important;
    }

    &:active,
    &[data-state='pressed'] {
        background: var(--theme-subtle-default) !important;
    }

    &:disabled,
    &[data-state='disabled'] {
        background: var(--theme-subtle-disabled) !important;
    }
`

function restVariant(props: { variant: string }) {
    switch (props.variant) {
        case 'accent':
            return 'var(--theme-button-accent-default)'
        case 'link':
            return 'transparent'
        case 'outline':
            return 'var(--theme-button-outline-default)'
        case 'danger':
            return 'var(--theme-button-danger-default)'
        case 'warning':
            return 'var(--theme-button-warning-default)'
        default:
            return 'var(--theme-control-default)'
    }
}

function hoveredVariant(props: { variant: string }) {
    switch (props.variant) {
        case 'accent':
            return 'var(--theme-button-accent-secondary)'
        case 'link':
            return 'var(--theme-button-outline-secondary)'
        case 'outline':
            return 'var(--theme-button-outline-secondary)'
        case 'danger':
            return 'var(--theme-button-danger-secondary)'
        case 'warning':
            return 'var(--theme-button-warning-secondary)'
        default:
            return 'var(--theme-control-secondary)'
    }
}

function pressedVariant(props: { variant: string }) {
    switch (props.variant) {
        case 'accent':
            return 'var(--theme-button-accent-tertiary)'
        case 'link':
            return 'var(--theme-button-outline-tertiary)'
        case 'outline':
            return 'var(--theme-button-outline-tertiary)'
        case 'danger':
            return 'var(--theme-button-danger-tertiary)'
        case 'warning':
            return 'var(--theme-button-warning-tertiary)'
        default:
            return 'var(--theme-control-tertiary)'
    }
}

export const ControlFillX = styled.div.attrs(ariaHidden)`
    ${fillBase}
    ${borderRadius}

    background: ${restVariant};
    pointer-events: none;

    transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover,
    &[data-state='hovered'] {
        background: ${hoveredVariant} !important;
    }

    &:active,
    &[data-state='pressed'] {
        background: ${pressedVariant} !important;
    }

    &:disabled,
    [data-state='disabled'] {
        background: var(--theme-control-disabled) !important;
    }
`

export const TextControlFillX = styled.div.attrs(ariaHidden)`
    ${fillBase}
    ${borderRadius}

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

    &[data-theme='light'][data-focused='true'] {
        background: rgba(255, 255, 255, 1) !important;
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
        background: rgba(20, 20, 20, 0.6);
    }

    &[data-theme='dark'][data-focused='true'] {
        background: rgba(20, 20, 20, 0.6) !important;
    }

    &[data-theme='dark'][data-state='disabled'] {
        background: rgba(255, 255, 255, 0.042);
    }
`

export const AcrylicFill = styled.div.attrs(ariaHidden)<AcrylicFillProps>`
    ${fillBase}
    ${borderRadius}

    backdrop-filter: ${({ theme }) => (theme.name === 'light' ? 'blur(20px) saturate(3)' : 'blur(20px) saturate(3.5)')};
    background-color: var(--theme-acrylic-default);
`

export const CardFill = styled.div.attrs(ariaHidden)<CardFillProps>`
    ${fillBase}
    ${borderRadius}

    background: var(--theme-card-default);

    &:hover,
    &[data-state='hovered'] {
        background: var(--theme-card-tertiary) !important;
    }

    &:active,
    &[data-state='pressed'] {
        background: var(--theme-card-tertiary) !important;
    }
`
