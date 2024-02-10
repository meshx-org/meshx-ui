import React from 'react'
import { LinkButtonProps } from './Button.types'
import { ControlState, useControlState } from '@meshx-org/mxui-core'
import { Text } from '@meshx-org/mxui-text'
import { SubtleFillX } from '@meshx-org/mxui-primitives'
import styled from 'styled-components'

const StyledSubtleFillX = styled(SubtleFillX)`
    transition: all 0.15s ease-out;
`

const StyledButton = styled.div`
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    display: flex;
    align-items: flex-start;
    position: relative;
    cursor: pointer;

    &[data-state='disabled'] {
        cursor: not-allowed !important;
    }

    &[data-state='pressed'] ${StyledSubtleFillX}, &:active ${StyledSubtleFillX} {
        transform: scale(0.95) !important;
    }

    &[data-state='hovered'] ${StyledSubtleFillX}, &:hover ${StyledSubtleFillX} {
        transform: scale(1);
    }
`

const ButtonContent = styled.a`
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 12px;
    min-width: 32px;

    font-size: 14px;
    line-height: 20px;

    column-gap: 6px;
`

/** @depracated Use Button instead */
export function LinkButton<T>({ children, state: controlledState, ...otherProps }: LinkButtonProps<T>) {
    const { state, handlers } = useControlState<HTMLDivElement>(false)
    const disabled = controlledState === ControlState.Disabled

    return (
        <StyledButton data-state={controlledState ?? state} {...handlers}>
            <StyledSubtleFillX data-state={controlledState ?? state} borderRadius={5} />
            <ButtonContent {...otherProps}>
                <Text
                    as="span"
                    variant="body"
                    selectable={false}
                    data-t={disabled ? 'text.disabled' : 'text.primary'}
                    fontWeight={600}
                    color={disabled ? 'text.disabled' : 'text.primary'}
                    children={children}
                />
            </ButtonContent>
        </StyledButton>
    )
}
