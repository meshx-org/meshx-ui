import React, { useMemo } from 'react'

import styles from './TextBox.module.css'
import { TextBoxProps } from './TextBox.types'
import { useControlState } from '../../../util/useControlState'
import { useTheme } from '../../../provider/ThemeProvider'
import { TextControlElevation } from '../elevation/Elevation'
import { TextControlFill } from '../fill/Fill'

export function TextBox(props: TextBoxProps) {
    const { placeholder, disabled = false, value, onChange } = props

    const theme = useTheme()
    const { state, handlers } = useControlState<HTMLInputElement>(disabled)

    const isEdge = useMemo(() => /Edg/.test(navigator.userAgent), [])

    return (
        <label className={styles.textBox}>
            <TextControlElevation state={state}>
                <TextControlFill state={state}>
                    <input
                        autoFocus
                        security="restricted"
                        role="textbox"
                        type="password"
                        data-state={state}
                        data-theme={theme}
                        placeholder={placeholder + String(isEdge)}
                        disabled={disabled}
                        value={value}
                        onChange={onChange && ((e) => onChange(e.target.value))}
                        className={styles.textBoxInput}
                        {...handlers}
                    />
                </TextControlFill>
            </TextControlElevation>
        </label>
    )
}
