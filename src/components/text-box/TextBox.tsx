import React from 'react'

import { TextBoxProps } from './TextBox.types'
import { useControlState } from '../../hooks/useControlState'
import { useTheme } from '../../context/ThemeProvider'
import { TextControlStroke } from '../stroke/Stroke'
import { TextControlFill } from '../fill/Fill'
import { useFocus } from '../../hooks/useFocus'
import styled from 'styled-components'

const StyledTextBox = styled.div`
    
    &[data-state='disabled'] ::placeholder {
        color: var(--theme-color-text-disabled) !important;
    }
`

const StyledInput = styled.input`
    flex: 1;
    border: none;
    background: transparent;
    color: var(--theme-color-text-primary);
    padding: 0px 12px;
    margin: 0;

    height: 32px;
    font-size: 14px;
    line-height: 20px;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;

    &[data-state='disabled'] {
        cursor: not-allowed;
    }
`

export function TextBox(props: TextBoxProps) {
    const { placeholder, disabled = false, value, onChange } = props

    const { focused, handlers: focusHandlers } = useFocus<HTMLInputElement>()
    const { state, handlers } = useControlState<HTMLInputElement>(disabled)

    return (
        <StyledTextBox>
            <TextControlStroke state={state} focused={focused}>
                <TextControlFill state={state}>
                    <StyledInput
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
        </StyledTextBox>
    )
}
