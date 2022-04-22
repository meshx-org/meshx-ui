import React from 'react'
import { useTheme } from '../../../provider/ThemeProvider'
import { ControlFillProps } from './ControlFill.types'
import styles from './ControlFill.module.css'

export function TextControlFill({ children, state }: ControlFillProps) {
    const theme = useTheme()

    return (
        <div data-state={state} data-theme={theme} className={`${styles.fill} ${styles.textControlFill}`}>
            {children}
        </div>
    )
}

export function ControlFill({ children, state }: ControlFillProps) {
    const theme = useTheme()

    return (
        <div data-state={state} data-theme={theme} className={`${styles.fill} ${styles.controlFill}`}>
            {children}
        </div>
    )
}
