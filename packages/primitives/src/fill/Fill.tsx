import React from 'react'
import { ControlFillProps, SmokeFillProps, CardFillProps, LayerFillProps, AcrylicFillProps } from './Fill.types'
import { useTheme } from '@meshx-org/mxui-core'
import { borderRadius } from "styled-system"
import styled, { css } from 'styled-components'

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

    &[data-theme='dark'] {
        background: rgba(255, 255, 255, 0.06);
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

const SubtleFillBase = styled(FillBase)`
    border-radius: 4px;
    
    &[data-theme='light'] {
        background: rgba(0, 0, 0, 0);
    }

    &[data-theme='light']:hover,
    &[data-theme='light'][data-state='hovered'] {
        background: rgb(0, 0, 0, 0.0373);
    }

    &[data-theme='light']:active,
    &[data-theme='light'][data-state='pressed'] {
        background: rgb(0, 0, 0, 0.0241);
    }

    &[data-theme='light'][data-state='disabled'] {
        background: rgb(0, 0, 0, 0);
    }

    &[data-theme='dark'] {
        background: rgba(255, 255, 255, 0);
    }

    &[data-theme='dark']:hover,
    &[data-theme='dark'][data-state='hovered'] {
        background: rgba(255, 255, 255, 0.0837);
    }

    &[data-theme='dark']:active,
    &[data-theme='dark'][data-state='pressed'] {
        background: rgba(255, 255, 255, 0.0326);
    }

    &[data-theme='dark'][data-state='disabled'] {
        background: rgba(255, 255, 255, 0.04);
    }
`

const ControlFillBase = styled(FillBase)`
    border-radius: 4px;

    &[data-theme='light'] {
        background: rgba(255, 255, 255, 0.7);
    }

    &[data-theme='light']:hover,
    &[data-theme='light'][data-state='hovered'] {
        background: rgb(249, 249, 249, 0.5);
    }

    &[data-theme='light']:active,
    &[data-theme='light'][data-state='pressed'] {
        background: rgb(249, 249, 249, 0.3);
    }

    &[data-theme='light'][data-state='disabled'] {
        background: rgb(249, 249, 249, 0.3);
    }

    &[data-theme='dark'] {
        background: rgba(255, 255, 255, 0.0605);
    }

    &[data-theme='dark']:hover,
    &[data-theme='dark'][data-state='hovered'] {
        background: rgba(255, 255, 255, 0.0837);
    }

    &[data-theme='dark']:active,
    &[data-theme='dark'][data-state='pressed'] {
        background: rgba(255, 255, 255, 0.0326);
    }

    &[data-theme='dark'][data-state='disabled'] {
        background: rgba(255, 255, 255, 0.04);
    }
`

export function TextControlFill({ children, state }: ControlFillProps) {
    const theme = useTheme()

    return (
        <TextControlFillBase data-state={state} data-theme={theme}>
            {children}
        </TextControlFillBase>
    )
}

export function ControlFill({ children, state }: ControlFillProps) {
    const theme = useTheme()

    return (
        <ControlFillBase data-state={state} data-theme={theme}>
            {children}
        </ControlFillBase>
    )
}

export function SubtleFill({ children, state }: ControlFillProps) {
    const theme = useTheme()

    return (
        <SubtleFillBase data-state={state} data-theme={theme}>
            {children}
        </SubtleFillBase>
    )
}

function ariaHidden(props: any) {
    return { ...props, "aria-hidden": true }
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

export const LayerFill = styled.div.attrs(props => ({ ...props, 'aria-hidden': true }))<LayerFillProps>`
    ${fillBase}
    ${borderRadius}
    background-color: ${({ theme }) => theme.colors.backgrounds.layer.default};
`

export const AcrylicFill = styled.div.attrs(ariaHidden)<AcrylicFillProps>`
    ${fillBase}
    ${borderRadius}
    backdrop-filter: ${({ theme }) => theme.name === "light" ? "blur(20px) saturate(3)" : "blur(20px) saturate(3.5)" };
    background-color: ${({ theme }) => theme.colors.backgrounds.acrylic.default};
`

export const CardFill = styled.div.attrs(ariaHidden)<CardFillProps>`
    ${fillBase}
    ${borderRadius}
    background-color: ${({ theme }) => theme.colors.backgrounds.card.default};
`