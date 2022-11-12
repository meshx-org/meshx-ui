import React from 'react'
import { useTheme, useControlState } from '@meshx-org/mxui-core'
import { ControlFill, ControlStroke } from '@meshx-org/mxui-primitives'
import { ButtonProps } from './Button.types'
import styled from 'styled-components'

const StyledButton = styled.button`
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    display: flex;
    align-items: flex-start;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
    cursor: pointer;

    &[data-state='disabled'] {
        pointer-events: none;
    }

    &[data-theme='dark'] {
        color: white;
    }

    &[data-state='disabled'][data-theme='dark'] {
        color: rgba(255, 255, 255, 0.36);
    }

    &[data-theme='dark'] {
        color: white;
    }

    &[data-state='disabled'][data-theme='light'] {
        color: rgba(0, 0, 0, 0.36);
    }

    &[data-state='pressed'] .buttonContent {
        opacity: 0.5;
    }
`

const StyledButtonContent = styled.div`
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 8px;
    font-size: 14px;
    line-height: 20px;
    min-width: 80px;
`

function Button(props: ButtonProps) {
    const { apparance = 'default', disabled = false, onPress, children } = props

    const theme = useTheme()
    const { state, handlers } = useControlState<HTMLButtonElement>(disabled)

    return (
        <StyledButton onClick={onPress} type="button" data-theme={theme} data-state={state} {...handlers}>
            <ControlStroke state={state}>
                <ControlFill state={state}>
                    <StyledButtonContent>{children}</StyledButtonContent>
                </ControlFill>
            </ControlStroke>
        </StyledButton>
    )
}

export { Button }
