import React from 'react'
import { ControlFillProps, AcrilicFillProps } from './Fill.types'
import { useTheme } from '@meshx-org/mxui-core'
import styled from 'styled-components'

const FillBase = styled.div`
    display: flex;
    flex: 1;
    margin: 1px;
    border-radius: 4px;
`

const TextControlFillBase = styled(FillBase)`
     
    &[data-theme='light'] {
        background: rgba(255, 255, 255, 0.7);
    }

    &[data-theme='light']:hover {
        background: rgba(249, 249, 249, 0.5);
    }

    &[data-theme='light']:active {
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

    &[data-theme='dark']:hover {
        background: rgba(255, 255, 255, 0.08);
    }

    &[data-theme='dark']:active {
        background: rgba(30, 30, 30, 0.7);
    }

    &[data-theme='dark']:focus-within {
        background: rgba(30, 30, 30, 0.7);
    }

    &[data-theme='dark'][data-state='disabled'] {
        background: green;
    }
`

const SubtleFillBase = styled(FillBase)`
    &[data-theme='light'] {
        background: rgba(0, 0, 0, 0.0);
    }

    &[data-theme='light']:hover {
        background: rgb(0, 0, 0, 0.0373);
    }

    &[data-theme='light']:active {
        background: rgb(0, 0, 0, 0.0241);
    }

    &[data-theme='light'][data-state='disabled'] {
        background: rgb(0, 0, 0, 0.0);
    }

    &[data-theme='dark'] {
        background: rgba(255, 255, 255, 0.0);
    }

    &[data-theme='dark']:hover {
        background: rgba(255, 255, 255, 0.0837);
    }

    &[data-theme='dark']:active {
        background: rgba(255, 255, 255, 0.0326);
    }

    &[data-theme='dark'][data-state='disabled'] {
        background: rgba(255, 255, 255, 0.04);
    }
`

const ControlFillBase = styled(FillBase)`
    &[data-theme='light'] {
        background: rgba(255, 255, 255, 0.7);
    }

    &[data-theme='light']:hover {
        background: rgb(249, 249, 249, 0.5);
    }

    &[data-theme='light']:active {
        background: rgb(249, 249, 249, 0.3);
    }

    &[data-theme='light'][data-state='disabled'] {
        background: rgb(249, 249, 249, 0.3);
    }

    &[data-theme='dark'] {
        background: rgba(255, 255, 255, 0.0605);
    }

    &[data-theme='dark']:hover {
        background: rgba(255, 255, 255, 0.0837);
    }

    &[data-theme='dark']:active {
        background: rgba(255, 255, 255, 0.0326);
    }

    &[data-theme='dark'][data-state='disabled'] {
        background: rgba(255, 255, 255, 0.04);
    }
`

const AcrylicFillBase = styled(FillBase)`
    &[data-theme='light'] {
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.7);
    }

    &[data-theme='dark'] {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.0605);
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

export function AcrilicFill({ children }: AcrilicFillProps) {
    const theme = useTheme()

    return <AcrylicFillBase data-theme={theme}>{children}</AcrylicFillBase>
}
