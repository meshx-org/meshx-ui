import React, { ChangeEventHandler, useCallback, useState, useEffect, useRef } from 'react'
import { useTheme, useControlState } from '@meshx-org/mxui-core'
import { Text } from '@meshx-org/mxui-text'
import type { SwitchProps } from './Switch.types'
import styled, { ThemeProvider } from 'styled-components'
import { ToggleState, useToggleState } from 'react-stately'
import { VisuallyHidden, useFocusRing, useSwitch, mergeProps, useHover } from 'react-aria'

const StyledSwitchWrapper = styled.label`
    height: 32px;
    align-items: center;
    column-gap: 10px;
    display: flex;

    user-select: none;

    line-height: 20px;

    &[data-theme='light'] {
        color: black;
    }

    &[data-theme='dark'] {
        color: white;
    }
`

const StyledSwitchStroke = styled.div`
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: 12px;
    transition: 0.2s ease;

    border: 1px solid ${(props) => (props.theme.name === 'dark' ? 'rgba(255, 255, 255, 0.54)' : 'rgba(0, 0, 0, 0.45)')};
    &[data-selected='true'] {
        border: 1px solid rgba(0, 0, 0, 0.06);
    }
`

const StyledThumb = styled.div`
    position: absolute;
    border-radius: 6px;
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    transition: 0.2s ease;

    background: ${({ theme }) => (theme.name === 'dark' ? 'rgba(255, 255, 255, 0.79)' : 'rgba(0, 0, 0, 0.61)')};

    &[data-selected='true'] {
        left: 24px;
    }

    &[data-selected='true'][data-pressed='true'] {
        left: 21px;
    }

    &[data-theme='light'][data-selected='true'] {
        background-color: white;
    }

    &[data-theme='dark'][data-selected='true'] {
        background-color: black;
    }

    &[data-hovered='true'] {
        transform: scale(1.125);
    }

    &[data-pressed='true'] {
        width: 15px !important;
    }
`

const StyledSlider = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    transition: 0.2s ease;
    box-shadow: 0 0 0 1px transparent;

    &[data-theme='light'] {
        background: rgba(0, 0, 0, 0.06);
    }

    &[data-theme='light'][data-selected='true'] {
        background: rgba(0, 0, 0, 0.02);
    }

    &[data-theme='dark'][data-selected='true'] {
        background: rgba(255, 255, 255, 0.04);
    }

    &[data-theme='dark'] {
        background: rgba(0, 0, 0, 0.1);
    }

    &[data-selected='true'] {
        background-color: var(--theme-accent-default) !important;
        box-shadow: 0 0 0 1px var(--theme-accent-default) !important;
    }
`

const StyledSwitch = styled.div`
    display: flex;
    position: relative;
    width: 40px;
    height: 20px;
    cursor: pointer;

    &[data-disabled='true'] {
        cursor: not-allowed !important;
    }
`

export function Switch(props: SwitchProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const state = useToggleState(props)
    const theme = useTheme()

    const { isFocused, isFocusVisible, focusProps } = useFocusRing()
    const { labelProps, inputProps, isSelected, isDisabled, isReadOnly, isPressed } = useSwitch(
        {
            ...props, // ...removeDataAttributes(props),
            // ReactNode type doesn't allow function children.
            children: typeof props.children === 'function' ? true : props.children
        },
        state,
        inputRef
    )

    const { hoverProps, isHovered } = useHover({
        ...props,
        isDisabled: props.isDisabled || props.isReadOnly
    })

    return (
        <StyledSwitchWrapper
            {...mergeProps(labelProps, hoverProps)}
            data-theme={theme}
            data-selected={isSelected || undefined}
            data-pressed={isPressed || undefined}
            data-hovered={isHovered || undefined}
            data-focused={isFocused || undefined}
            data-focus-visible={isFocusVisible || undefined}
            data-disabled={isDisabled || undefined}
            data-readonly={isReadOnly || undefined}
        >
            <StyledSwitch
                data-theme={theme}
                data-disabled={isDisabled || undefined}
                data-pressed={isPressed || undefined}
            >
                <VisuallyHidden elementType="span">
                    <input {...inputProps} {...focusProps} ref={inputRef} />
                </VisuallyHidden>

                <StyledSlider data-theme={theme} data-selected={isSelected || undefined} />
                <StyledSwitchStroke data-theme={theme} data-selected={isSelected || undefined} />
                <StyledThumb
                    data-disabled={isDisabled}
                    data-hovered={isHovered || undefined}
                    data-pressed={isPressed || undefined}
                    data-theme={theme}
                    data-selected={isSelected || undefined}
                />
            </StyledSwitch>
            <Text>{isSelected ? 'On' : 'Off'} </Text>
        </StyledSwitchWrapper>
    )
}
