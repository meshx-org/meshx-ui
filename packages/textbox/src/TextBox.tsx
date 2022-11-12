import React from 'react'

import { TextBoxProps } from './TextBox.types'
import { useControlState, useTheme, useFocus } from '@meshx-org/mxui-core'
import { TextControlStroke, TextControlFill } from '@meshx-org/mxui-primitives'
import styled from 'styled-components'

const StyledTextBox = styled.input`
    flex: 1;
    border: none;
    background: transparent;

    padding: 5px 8px;
    margin: 0;

    height: 32px;
    font-size: 14px;
    line-height: 20px;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;

    &[data-theme='light'] {
        color: rgba(0, 0, 0, 1);
    }

    &[data-theme='dark'] {
        color: rgba(255, 255, 255, 1);
    }

    &[data-theme='dark'] ::placeholder {
        color: rgba(255, 255, 255, 0.79);
    }

    &[data-theme='dark'][data-state='disabled'] ::placeholder {
        color: rgba(255, 255, 255, 0.36);
    }

    &[data-theme='light'] ::placeholder {
        color: rgba(0, 0, 0, 0.61);
    }

    &[data-theme='light'][data-state='disabled'] ::placeholder {
        color: rgba(0, 0, 0, 0.36);
    }
`

export function TextBox(props: TextBoxProps) {
    const { placeholder, disabled = false, value, onChange } = props

    const theme = useTheme()
    console.log(useFocus)
    const { focused, handlers: focusHandlers } = useFocus<HTMLInputElement>()
    const { state, handlers } = useControlState<HTMLInputElement>(disabled)

    return (
        <div style={{ width: 300 }}>
            <TextControlStroke state={state} focused={focused}>
                <TextControlFill state={state}>
                    <StyledTextBox
                        role="textbox"
                        data-state={state}
                        data-theme={theme}
                        placeholder={placeholder}
                        disabled={disabled}
                        value={value}
                        onChange={onChange && ((e) => onChange(e.target.value))}
                        {...handlers}
                        {...focusHandlers}
                    />
                </TextControlFill>
            </TextControlStroke>
        </div>
    )
}
