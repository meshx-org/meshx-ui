import React from 'react'
import { useTheme, useControlState } from '@meshx-org/mxui-core'
import { ControlFill, ControlStroke } from '@meshx-org/mxui-primitives'
import { Text } from '@meshx-org/mxui-text'
import { ButtonProps } from './Button.types'
import styled from 'styled-components'

const StyledButton = styled.button`
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

    &[data-state='pressed'] .buttonContent {
        opacity: 0.5;
    }
`

const ButtonContent = styled.div`
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    min-width: 80px;
`

function Button(props: ButtonProps) {
    const { children, apparance = 'default', disabled = false, onPress, as, ...otherProps } = props

    const theme = useTheme()
    const { state, handlers } = useControlState<HTMLButtonElement>(disabled)

    const handleClick = (e: any) => {
        onPress && onPress(e)
    }

    return (
        <StyledButton
            as={as}
            type="button"
            {...otherProps}
            onClick={handleClick}
            data-theme={theme}
            data-state={state}
            {...handlers}
        >
            <ControlStroke state={state}>
                <ControlFill state={state}>
                    <ButtonContent>
                        <Text
                            variant="body"
                            selectable={false}
                            data-t={disabled ? 'text.disabled' : 'text.primary'}
                            color={disabled ? 'text.disabled' : 'text.primary'}
                            children={children}
                        />
                    </ButtonContent>
                </ControlFill>
            </ControlStroke>
        </StyledButton>
    )
}

export { Button }
