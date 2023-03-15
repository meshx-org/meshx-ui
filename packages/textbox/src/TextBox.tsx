import React from 'react'
import styled from 'styled-components'
import { layout, margin, padding, size, PaddingProps, MarginProps, LayoutProps } from 'styled-system'

import { PasswordBoxProps, TextBoxProps } from './TextBox.types'
import { useControlState, useFocus } from '@meshx-org/mxui-core'
import { TextControlStroke, TextControlFill } from '@meshx-org/mxui-primitives'

const TextBoxInput = styled.input<PaddingProps & { width?: any; height?: any; size?: any }>`
    flex: 1;
    border: none;
    background: transparent;

    ${padding}
    margin: 0;

    height: 32px;
    font-size: 14px;
    line-height: 20px;

    font-family: ${(props) => props.theme.fonts.default};
    color: var(--theme-color-text-primary);

    &[data-state='disabled'] {
        color: var(--theme-color-text-disabled);
    }

    &::-webkit-input-placeholder {
        color: var(--theme-color-text-secondary);
    }

    &::placeholder {
        color: var(--theme-color-text-secondary);
    }

    &:-ms-input-placeholder {
        color: var(--theme-color-text-secondary);
    }

    &::-moz-placeholder {
        color: var(--theme-color-text-secondary);
    }
`

const TextBoxWrapper = styled.div<LayoutProps & MarginProps>`
    ${layout}
    ${margin}
    position: relative;
`

export function TextBox(props: TextBoxProps) {
    const {
        placeholder,
        disabled = false,
        value,
        onChange,
        onFocus,
        onBlur,
        inputMode,
        keyHint,
        readonly,
        ...otherProps
    } = props

    const { focused, handlers: focusHandlers } = useFocus<HTMLInputElement>(onFocus, onBlur)
    const { state, handlers } = useControlState<HTMLInputElement>(disabled)

    return (
        <TextBoxWrapper {...otherProps}>
            <TextControlStroke borderRadius={5} state={state} focused={focused}>
                <TextControlFill state={state}>
                    <TextBoxInput
                        py="5px"
                        px="8px"
                        role="textbox"
                        type="text"
                        {...otherProps}
                        placeholder={placeholder}
                        disabled={disabled}
                        value={value}
                        data-state={state}
                        onChange={onChange && ((e) => onChange(e.target.value))}
                        {...handlers}
                        {...focusHandlers}
                    />
                </TextControlFill>
            </TextControlStroke>
        </TextBoxWrapper>
    )
}

export function PasswordBox(props: PasswordBoxProps) {
    const { ...otherProps } = props

    return <TextBox role="textbox" type="password" {...otherProps} />
}
