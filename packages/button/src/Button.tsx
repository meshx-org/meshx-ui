import React, { PropsWithChildren } from 'react'
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
    align-items: flex-start;
    cursor: pointer;
    width: 100%;
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
    position: relative;
    z-index: 3;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 12px;
    min-width: 80px;
    column-gap: 6px;

    *[data-theme='light'] &[data-variant='accent'] {
        --theme-color-text-primary: white !important;
    }

    *[data-theme='dark'] &[data-variant='accent'] {
        --theme-color-text-primary: rgb(142, 208, 255) !important;
    }
`

function Button(props: PropsWithChildren<ButtonProps>) {
    const { children, variant = 'default', disabled = false, fit = true, onPress, as, ...otherProps } = props

    const theme = useTheme()
    const { state, handlers } = useControlState<HTMLButtonElement>(disabled)

    const handleClick = (e: any) => {
        onPress && onPress(e)
    }

    let content = null
    if (typeof children === 'string') {
        content = (
            <Text
                as="span"
                variant="body"
                selectable={false}
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
            style={{ maxWidth: fit ? 'fit-content' : undefined }}
            type="button"
            {...otherProps}
            onClick={handleClick}
            data-theme={theme}
            data-state={state}
            {...handlers}
        >
            <ButtonContent data-variant={variant}>{content}</ButtonContent>
            <ControlStrokeX borderRadius={5.5} state={state} />
            <ControlFillX data-state={state} variant={variant} borderRadius={6} />
        </StyledButton>
    )
}

export { Button }
