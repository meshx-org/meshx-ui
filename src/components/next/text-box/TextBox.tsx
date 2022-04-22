import React, { useState } from 'react'

import styles from './TextBox.module.css'
import { TextBoxProps } from './TextBox.types'
import { TextControlElevation } from '../elevation/Elevation'
import { TextControlFill } from '../control-fill/ControlFill'
import { useControlState } from '../../../util/useControlState'

export function TextBox(props: TextBoxProps) {
    const { placeholder, disabled = false } = props

    const { state, handlers, focused } = useControlState<HTMLInputElement>(disabled)

    return (
        <TextControlElevation state={state} focused={focused}>
            <TextControlFill state={state}>
                <input
                    data-state={state}
                    {...handlers}
                    type="text"
                    placeholder={placeholder}
                    className={styles.textBoxInput}
                />
            </TextControlFill>
        </TextControlElevation>
    )
}
