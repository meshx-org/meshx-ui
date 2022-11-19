import React from 'react'

import { TextBoxProps } from './TextBox.types'
import { useControlState, useFocus } from '@meshx-org/mxui-core'
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

    font-family: ${props => props.theme.fonts.default};
    color: ${props => props.theme.colors.text.primary};
   
    &[data-state='disabled'] {
        color: ${props => props.theme.colors.text.disabled};
    }

    &::-webkit-input-placeholder {
        color: ${props => props.theme.colors.text.secondary};
    }

    &::placeholder {
        color: ${props => props.theme.colors.text.secondary};
    }
    
    &:-ms-input-placeholder {
        color: ${props => props.theme.colors.text.secondary};
    }

    &::-moz-placeholder {
        color: ${props => props.theme.colors.text.secondary};
    }
`

export function TextBox(props: TextBoxProps) {
    const { placeholder, disabled = false, value, onChange } = props
 
    const { focused, handlers: focusHandlers } = useFocus<HTMLInputElement>()
    const { state, handlers } = useControlState<HTMLInputElement>(disabled)

    return (
        <div style={{ width: 300 }}>
            <TextControlStroke state={state} focused={focused}>
                <TextControlFill state={state}>
                    <StyledTextBox
                        role="textbox"
                        data-state={state}
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
