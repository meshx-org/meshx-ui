import React from 'react'
import { useTheme, useControlState } from '@meshx-org/mxui-core'
import { ControlFill, ControlFillX, ControlStroke, ControlStrokeX } from '@meshx-org/mxui-primitives'
import { Text } from '@meshx-org/mxui-text'
import { ButtonProps } from './Button.types'
import styled from 'styled-components'

const StyledButton = styled.button`
    position: relative;
    margin: 0px;
    padding: 0;
    border: none;
    background: transparent;
    max-width: fit-content;
    align-items: flex-start;
    cursor: pointer;

    height: 32px;

    &[data-state='disabled'] {
        pointer-events: none;
        cursor: not-allowed !important;
    }

    &[data-state='pressed'] .buttonContent {
        opacity: 0.5;
    }
`

const ButtonContent = styled.div`
    z-index: 3;
    display: flex;
    align-items: center;

    justify-content: center;
    padding: 0px 12px;
    font-size: 14px;
    line-height: 20px;
    min-width: 80px;
    column-gap: 8px;
`

function Button(props: ButtonProps) {
    const { children, apparance = 'default', disabled = false, onPress, as, ...otherProps } = props

    const theme = useTheme()
    const { state, handlers } = useControlState<HTMLButtonElement>(disabled)

    const handleClick = (e: any) => {
        onPress && onPress(e)
    }

    let content = null
    if (typeof children === 'string') {
        content = (
            <Text
                variant="body"
                selectable={false}
                data-t={disabled ? 'text.disabled' : 'text.primary'}
                fontWeight={600}
                color={disabled ? 'text.disabled' : 'text.primary'}
                children={children}
            />
        )
    } else {
        content = children
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
            <ControlStrokeX borderRadius={5.5} state={state} />
            <ControlFillX data-state={state} borderRadius={5} />
            <ButtonContent>{content}</ButtonContent>
        </StyledButton>
    )
}

export { Button }
