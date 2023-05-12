import React from 'react'
import { useTheme, useControlState } from '@meshx-org/mxui-core'
import { ControlFillX, ControlStrokeX } from '@meshx-org/mxui-primitives'
import { Text } from '@meshx-org/mxui-text'
import { ButtonProps } from './Button.types'
import styled from 'styled-components'

const StyledButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;

    border: none;
    background: transparent;

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
    column-gap: 6px;

    *[data-theme='light'] &[data-variant='accent'],
    *[data-theme='light'] &[data-variant='danger'],
    *[data-theme='light'] &[data-variant='warning'] {
        --theme-color-text-primary: white !important;
    }

    span {
        display: flex;
        color: var(--theme-color-text-primary);
    }

    *[data-theme='dark'] &[data-variant='accent'] {
        --theme-color-text-primary: rgb(142, 208, 255) !important;
    }

    *[data-theme='dark'] &[data-variant='danger'] {
        --theme-color-text-primary: rgb(238, 159, 159) !important;
    }

    *[data-theme='dark'] &[data-variant='warning'] {
        --theme-color-text-primary: rgb(237, 202, 146) !important;
    }
`

function Button(props: ButtonProps) {
    const {
        children,
        variant = 'default',
        disabled = false,
        fit = true,
        icon,
        iconRight,
        state: controlledState,
        onPress,
        as,
        ...otherProps
    } = props

    const theme = useTheme()
    const { state, handlers } = useControlState<HTMLButtonElement>(disabled)

    const hasStroke = variant === 'accent' || variant === 'default' || variant === 'danger' || variant === 'warning'

    const handleClick = (e: any) => {
        onPress && onPress(e)
    }

    return (
        <StyledButton
            as={as}
            style={{ maxWidth: fit ? 'fit-content' : undefined }}
            type="button"
            {...otherProps}
            onClick={handleClick}
            data-theme={theme}
            data-state={controlledState ?? state}
            {...handlers}
        >
            <ButtonContent data-variant={variant}>
                {icon && <span>{icon}</span>}
                <Text
                    as="span"
                    variant="body"
                    selectable={false}
                    color={disabled ? 'text.disabled' : 'text.primary'}
                    children={children}
                />
                {iconRight && <span>{iconRight}</span>}
            </ButtonContent>
            {hasStroke && <ControlStrokeX borderRadius={5.5} state={controlledState ?? state} />}
            <ControlFillX data-state={controlledState ?? state} variant={variant} borderRadius={6} />
        </StyledButton>
    )
}

export { Button }
