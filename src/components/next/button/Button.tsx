import React, { useState } from 'react'
import { ControlState } from '../../../interfaces/control'
import { useTheme } from '../../../provider/ThemeProvider'
import ControlFill from '../control-fill/ControlFill'
import Elevation from '../elevation/Elevation'
import { ButtonProps } from './Button.types'
import styles from './Button.module.css'

function Button({ apparance, loading, disabled, children }: ButtonProps) {
    const theme = useTheme()
    const [pressed, setPressed] = useState(false)
    const [hovered, setHovered] = useState(false)

    let state: ControlState = ControlState.Rest
    if (hovered) state = ControlState.Hovered
    if (pressed && hovered) state = ControlState.Pressed
    if (disabled) state = ControlState.Disabled

    return (
        <button
            data-theme={theme}
            className={styles.button}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            type="button"
        >
            <Elevation state={state}>
                <ControlFill disabled={disabled} state={state}>
                    <div className={styles.buttonContent}>OK</div>
                </ControlFill>
            </Elevation>
        </button>
    )
}

export default Button
