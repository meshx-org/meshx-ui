import React from 'react'
import styles from './Button.module.css'
import { useTheme } from '../../provider/ThemeProvider'
import { ControlFill } from '../fill/Fill'
import { ControlElevation } from '../elevation/Elevation'
import { ButtonProps } from './Button.types'
import { useControlState } from '../../hooks/useControlState'

function Button(props: ButtonProps) {
    const { apparance = 'default', disabled = false, onPress, children } = props

    const theme = useTheme()
    const { state, handlers } = useControlState<HTMLButtonElement>(disabled)

    return (
        <button
            onClick={onPress}
            type="button"
            data-theme={theme}
            data-state={state}
            className={styles.button}
            {...handlers}
        >
            <ControlElevation state={state}>
                <ControlFill state={state}>
                    <div className={styles.buttonContent}>{children}</div>
                </ControlFill>
            </ControlElevation>
        </button>
    )
}

export default Button
