import React from 'react'

import styles from './TextBox.module.css'
import { TextBoxProps } from './TextBox.types'
import { useControlState } from '../../hooks/useControlState'
import { useTheme } from '../../context/ThemeProvider'
import { TextControlElevation } from '../elevation/Elevation'
import { TextControlFill } from '../fill/Fill'
import { useFocus } from '../../hooks/useFocus'

export function TextBox(props: TextBoxProps) {
    const { placeholder, disabled = false, value, onChange } = props

    const theme = useTheme()
    const { focused, handlers: focusHandlers } = useFocus<HTMLInputElement>()
    const { state, handlers } = useControlState<HTMLInputElement>(disabled)

    return (
        <div style={{ width: 300 }}>
            <TextControlElevation state={state} focused={focused}>
                <TextControlFill state={state}>
                    <input
                        role="textbox"
                        data-state={state}
                        data-theme={theme}
                        placeholder={placeholder}
                        disabled={disabled}
                        value={value}
                        onChange={onChange && ((e) => onChange(e.target.value))}
                        className={styles.textBoxInput}
                        {...handlers}
                        {...focusHandlers}
                    />
                </TextControlFill>
            </TextControlElevation>
        </div>
    )
}
