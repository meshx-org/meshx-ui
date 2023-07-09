import React from 'react'
import styled from 'styled-components'
import { layout, margin, padding, size, PaddingProps, MarginProps, LayoutProps } from 'styled-system'

import { PasswordBoxProps, TextBoxProps } from './TextBox.types'
import { useControlState, useFocus, useTheme } from '@meshx-org/mxui-core'
import { TextControlFillX, TextControlStrokeX } from '@meshx-org/mxui-primitives'

const TextBoxInput = styled.input<PaddingProps & { width?: any; height?: any; size?: any }>`
    ${padding}
    margin: 0;

    position: relative;
    z-index: 3;

    border: none;
    background: none;

    flex: 1;
    font-size: 14px;

    height: 32px;

    color: var(--theme-color-text-primary);
    font-family: var(--theme-font-default);

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

const Content = styled.div`
    width: 100%;

    position: relative;
    display: flex;
    align-items: center;

    span {
        display: flex;
        align-items: center;
        padding: 0 8px;
        font-size: 14px;
        line-height: 32px;
        color: var(--theme-color-text-secondary);
        background: var(--theme-background-control-disabled);
    }

    span.right {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;

        border-left: 1px solid var(--theme-color-stroke-divider);
    }

    span.left {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

        border-right: 1px solid var(--theme-color-stroke-divider);
    }
`

const TextBoxWrapper = styled.div<LayoutProps & MarginProps>`
    ${layout}
    ${margin}

    position: relative;
    width: fit-content;
    height: 32px;
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
        label,
        labelRight,
        readonly,
        ...otherProps
    } = props

    const { focused, handlers: focusHandlers } = useFocus<HTMLInputElement>(onFocus, onBlur)
    const { state, handlers } = useControlState<HTMLInputElement>(disabled)
    const theme = useTheme()

    return (
        <TextBoxWrapper {...otherProps}>
            <Content>
                {label && <span className="left">{label}</span>}
                <div style={{ position: 'relative' }}>
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
                    <TextControlFillX borderRadius={5} data-state={state} data-theme={theme} data-focused={focused} />
                </div>
                {labelRight && <span className="right">{labelRight}</span>}
            </Content>

            <TextControlStrokeX borderRadius={5} state={state} focused={focused} />
        </TextBoxWrapper>
    )
}

export function PasswordBox(props: PasswordBoxProps) {
    const { ...otherProps } = props

    return <TextBox role="textbox" type="password" {...otherProps} />
}
