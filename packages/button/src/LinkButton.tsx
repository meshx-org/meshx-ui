import React from 'react'
import { LinkButtonProps } from './Button.types'
import { useTheme, useControlState } from '@meshx-org/mxui-core'
import { Text } from '@meshx-org/mxui-text'
import { SubtleFill } from '@meshx-org/mxui-primitives'
import styled from 'styled-components'

const StyledButton = styled.a`
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    display: flex;
    align-items: flex-start;
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
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
`

function LinkButton({ label, href, disabled = false, ...props }: LinkButtonProps) {
    const theme = useTheme()
    const { state, handlers } = useControlState<HTMLAnchorElement>(disabled)

    return (
        <StyledButton href={href} type="button" data-theme={theme} data-state={state} {...handlers}>
            <SubtleFill state={state}>
                <StyledButtonContent>
                    <Text variant="body" color="text.disabled" children={label} />
                </StyledButtonContent>
            </SubtleFill>
        </StyledButton>
    )
}

export { LinkButton }
